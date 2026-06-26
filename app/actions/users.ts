"use server";

import { createClient } from "@supabase/supabase-js";

// Usamos el Service Role Key para poder gestionar usuarios a nivel administrativo
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export type UserRole = "admin" | "editor";

export async function listUsersAction() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;
    
    return {
      success: true,
      users: data.users.map(u => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        role: (u.user_metadata?.role as UserRole) || "admin" // asume admin por defecto para los usuarios previos
      }))
    };
  } catch (err: any) {
    return { success: false, error: err.message || "No se pudieron listar los usuarios" };
  }
}

export async function createUserAction(email: string, password: string, role: UserRole) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password,
      email_confirm: true, // No enviar correo de confirmación
      user_metadata: { role }
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || "Error al crear usuario" };
  }
}

export async function updateUserRoleAction(userId: string, role: UserRole) {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { role }
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || "Error al actualizar rol" };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Error al eliminar usuario" };
  }
}
