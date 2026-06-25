"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidateProperties } from "./revalidate";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Supabase URL or Service Role Key is missing in environment variables.");
}

// Admin client with service role key to bypass RLS and perform storage/database admin tasks
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// Helper to authenticate user on server via token
async function verifyAdmin(token: string) {
  if (!token) throw new Error("Acceso denegado: Token ausente.");
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    throw new Error("Acceso denegado: Sesión inválida.");
  }
  return user;
}

export type BackupItem = {
  name: string;
  timestamp: number;
  type: "auto" | "manual";
  propertiesCount: number;
  description: string;
  createdAt: string;
  size?: number;
};

/**
 * Creates a backup of the 'properties' table and uploads it to the 'backups' storage bucket.
 */
export async function createBackupAction(token: string, type: "auto" | "manual", description: string) {
  try {
    await verifyAdmin(token);

    // 1. Fetch all properties
    const { data: properties, error: dbErr } = await supabaseAdmin
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (dbErr) {
      throw new Error(`Error al obtener propiedades: ${dbErr.message}`);
    }

    const count = properties?.length || 0;
    const timestamp = Date.now();

    // 2. Prepare backup content
    const backupContent = {
      timestamp,
      type,
      description,
      propertiesCount: count,
      properties: properties || [],
    };

    // Encode description in base64url to safely put it in the filename
    const safeDesc = Buffer.from(description).toString("base64url");
    const filename = `backup_${timestamp}_${type}_${count}_${safeDesc}.json`;

    // 3. Upload to 'backups' bucket
    const { error: uploadErr } = await supabaseAdmin.storage
      .from("backups")
      .upload(filename, JSON.stringify(backupContent), {
        contentType: "application/json",
        upsert: true,
      });

    if (uploadErr) {
      throw new Error(`Error de almacenamiento: ${uploadErr.message}`);
    }

    return { success: true, filename, propertiesCount: count };
  } catch (err: any) {
    console.error("createBackupAction error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Lists all backups stored in the 'backups' bucket.
 * Parses metadata directly from the filenames for optimal speed.
 */
export async function listBackupsAction(token: string): Promise<{ success: boolean; backups?: BackupItem[]; error?: string }> {
  try {
    await verifyAdmin(token);

    const { data: files, error: listErr } = await supabaseAdmin.storage.from("backups").list("", {
      limit: 100,
      sortBy: { column: "name", order: "desc" },
    });

    if (listErr) {
      throw new Error(`Error al listar backups: ${listErr.message}`);
    }

    const backups: BackupItem[] = [];

    for (const file of files || []) {
      if (file.name === ".emptyFolderPlaceholder" || file.name === "test.json") {
        continue;
      }

      // Filename format: backup_${timestamp}_${type}_${propertiesCount}_${base64urlDescription}.json
      const parts = file.name.replace(/\.json$/, "").split("_");
      if (parts[0] === "backup" && parts.length >= 5) {
        const timestamp = parseInt(parts[1], 10);
        const type = parts[2] as "auto" | "manual";
        const propertiesCount = parseInt(parts[3], 10);
        const base64Desc = parts[4];

        let description = "";
        try {
          description = Buffer.from(base64Desc, "base64url").toString("utf-8");
        } catch {
          description = "Sin descripción";
        }

        backups.push({
          name: file.name,
          timestamp,
          type,
          propertiesCount,
          description,
          createdAt: new Date(timestamp).toLocaleString("es-CR"),
          size: file.metadata?.size,
        });
      }
    }

    return { success: true, backups };
  } catch (err: any) {
    console.error("listBackupsAction error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Restores a backup file by emptying the properties table and bulk inserting backup properties.
 */
export async function restoreBackupAction(token: string, filename: string) {
  try {
    await verifyAdmin(token);

    // 1. Download backup file
    const { data: fileData, error: downloadErr } = await supabaseAdmin.storage
      .from("backups")
      .download(filename);

    if (downloadErr || !fileData) {
      throw new Error(`Error al descargar el backup: ${downloadErr?.message || "Archivo vacío"}`);
    }

    const text = await fileData.text();
    const backup = JSON.parse(text);

    if (!backup || !Array.isArray(backup.properties)) {
      throw new Error("El archivo de copia de seguridad no contiene propiedades válidas.");
    }

    // 2. Delete all current properties
    const { error: deleteErr } = await supabaseAdmin
      .from("properties")
      .delete()
      .neq("id", "_none_"); // Safe filter to target all rows

    if (deleteErr) {
      throw new Error(`Error al vaciar la tabla de propiedades: ${deleteErr.message}`);
    }

    // 3. Insert backup properties
    if (backup.properties.length > 0) {
      // Remove any fields that could conflict or just insert raw objects
      // The properties are stored with their original columns.
      const { error: insertErr } = await supabaseAdmin
        .from("properties")
        .insert(backup.properties);

      if (insertErr) {
        throw new Error(`Error al restaurar propiedades en base de datos: ${insertErr.message}`);
      }
    }

    // 4. Revalidate cache
    await revalidateProperties();

    return { success: true, propertiesCount: backup.properties.length };
  } catch (err: any) {
    console.error("restoreBackupAction error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Deletes a backup file from the storage bucket.
 */
export async function deleteBackupAction(token: string, filename: string) {
  try {
    await verifyAdmin(token);

    const { error: delErr } = await supabaseAdmin.storage
      .from("backups")
      .remove([filename]);

    if (delErr) {
      throw new Error(`Error al eliminar backup de storage: ${delErr.message}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteBackupAction error:", err);
    return { success: false, error: err.message };
  }
}
