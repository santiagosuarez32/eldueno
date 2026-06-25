/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression";
import { revalidateProperties } from "@/app/actions/revalidate";
import {
  createBackupAction,
  listBackupsAction,
  restoreBackupAction,
  deleteBackupAction,
  type BackupItem
} from "@/app/actions/backup";
import { useLenis } from "lenis/react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BRAND_COLOR = "#ffe600";
const BRAND_HOVER = "#ffff33";
const STORAGE_BUCKET = "property-images";

/* ========================= Tipos ========================= */
type Property = {
  id: string;
  titulo: string;
  description: string | null;
  precio: number | string | null;
  ubicacion: string | null;
  neighborhood: string | null;
  tipo: string | null;
  dormitorios: number | null;
  banos: number | null;
  cochera: number | null;
  metros_cubiertos: number | string | null;
  metros_lote: number | string | null;
  plantas: number | null;
  cocina: string | null;
  oficina: string | null;
  pileta: string | null;
  imagen: string | null;
  fotos: string[] | null;
  moneda: string | null;
  owner_id?: string | null;
  published: boolean | null;
  vendido?: boolean | null;
  alquilado?: boolean | null;
  age?: number | null;
  created_at?: string | null;
};

type FormState = {
  id?: string;
  titulo: string;
  description: string;
  precio: number | string;
  ubicacion: string;
  neighborhood: string;
  tipo: string;
  dormitorios: number | null;
  banos: number | null;
  cochera: number | null;
  metros_cubiertos: number | string | null;
  metros_lote: number | string | null;
  plantas: number | null;
  cocina: string | null;
  oficina: string | null;
  pileta: string | null;
  imagen: string;
  fotos: string[];
  moneda: string;
  published: boolean;
  vendido: boolean;
  alquilado: boolean;
  age: number | null;
  created_at: string;
  storageFolder: string;
};

/* ===================== Helpers / UI ===================== */
function cx(...cn: Array<string | false | undefined>) {
  return cn.filter(Boolean).join(" ");
}
function toInt(v: unknown): number | null {
  if (v === "" || v === null || typeof v === "undefined") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
function toNumOrNull(v: unknown): number | null {
  if (v === "" || v === null || typeof v === "undefined") return null;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}
function slugName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "-");
}

function mapDbToAdminProperty(dbProp: any): Property {
  const gallery = dbProp.gallery || dbProp.fotos || [];
  const image = dbProp.image || dbProp.imagen || gallery[0] || "/placeholder-property.jpg";
  const owner = dbProp.owner || {};
  
  return {
    id: dbProp.id,
    titulo: dbProp.title || dbProp.titulo || "",
    description: dbProp.description || "",
    precio: Number(dbProp.price || dbProp.precio || 0),
    ubicacion: dbProp.location || dbProp.ubicacion || "",
    neighborhood: dbProp.neighborhood || "",
    tipo: dbProp.type || dbProp.tipo || "",
    dormitorios: dbProp.beds || dbProp.dormitorios || null,
    banos: dbProp.baths || dbProp.banos || null,
    cochera: dbProp.parkingSpaces || dbProp.cochera || null,
    metros_cubiertos: dbProp.area || dbProp.metros_cubiertos || null,
    metros_lote: dbProp.landArea || dbProp.metros_lote || null,
    plantas: dbProp.plantas || owner.plantas || null,
    cocina: dbProp.cocina || owner.cocina || null,
    oficina: dbProp.oficina || owner.oficina || null,
    pileta: dbProp.pileta || owner.pileta || null,
    imagen: image,
    fotos: gallery,
    moneda: (dbProp.moneda || owner.moneda || "USD").toUpperCase(),
    published: dbProp.featured !== undefined ? Boolean(dbProp.featured) : Boolean(dbProp.published),
    vendido: dbProp.vendido !== undefined ? Boolean(dbProp.vendido) : Boolean(owner.vendido),
    alquilado: dbProp.alquilado !== undefined ? Boolean(dbProp.alquilado) : Boolean(owner.alquilado),
    age: dbProp.age !== undefined && dbProp.age !== null ? toInt(dbProp.age) : null,
    created_at: dbProp.created_at || null
  };
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Cargando panel…</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}

/* ====================== Componente Contenido ====================== */
function AdminDashboardContent() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [published, setPublished] = useState(0);
  const draft = Math.max(total - published, 0);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<FormState | null>(null);
  const [confirmDel, setConfirmDel] = useState<Property | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmBulkDel, setConfirmBulkDel] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  // Backup system state
  const [tab, setTab] = useState<"properties" | "backups">("properties");
  const [backups, setBackups] = useState<BackupItem[]>([]);
  const [loadingBackups, setLoadingBackups] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState<BackupItem | null>(null);
  const [confirmBackupDel, setConfirmBackupDel] = useState<BackupItem | null>(null);
  const [manualBackupDesc, setManualBackupDesc] = useState("");
  const [showManualBackupPrompt, setShowManualBackupPrompt] = useState(false);
  const [creatingBackup, setCreatingBackup] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(false);

  const getAuthToken = async (): Promise<string | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const fetchBackups = async () => {
    setLoadingBackups(true);
    const token = await getAuthToken();
    if (!token) return;
    const res = await listBackupsAction(token);
    if (res.success && res.backups) {
      setBackups(res.backups);
    } else if (res.error) {
      setToast({ type: "err", msg: `Error al cargar backups: ${res.error}` });
    }
    setLoadingBackups(false);
  };

  const triggerAutoBackup = async (description: string) => {
    try {
      const token = await getAuthToken();
      if (token) {
        await createBackupAction(token, "auto", description);
      }
    } catch (err) {
      console.error("Auto backup error:", err);
    }
  };

  const handleCreateManualBackup = async () => {
    if (creatingBackup) return;
    setCreatingBackup(true);
    setShowManualBackupPrompt(false);
    const desc = manualBackupDesc.trim() || "Copia de seguridad manual";
    setManualBackupDesc("");
    setToast({ type: "ok", msg: "Creando copia de seguridad manual..." });
    
    const token = await getAuthToken();
    if (!token) {
      setToast({ type: "err", msg: "No autorizado." });
      setCreatingBackup(false);
      return;
    }
    
    const res = await createBackupAction(token, "manual", desc);
    if (res.success) {
      setToast({ type: "ok", msg: "Copia de seguridad creada correctamente." });
      await fetchBackups();
    } else {
      setToast({ type: "err", msg: `Error al crear copia: ${res.error}` });
    }
    setCreatingBackup(false);
  };

  const handleRestore = async (backup: BackupItem) => {
    setRestoringBackup(true);
    setConfirmRestore(null);
    setToast({ type: "ok", msg: "Restaurando copia de seguridad..." });
    
    const token = await getAuthToken();
    if (!token) {
      setToast({ type: "err", msg: "No autorizado." });
      setRestoringBackup(false);
      return;
    }

    // Auto-backup current state before restoring
    await createBackupAction(token, "auto", `Antes de restaurar "${backup.description}"`);

    const res = await restoreBackupAction(token, backup.name);
    if (res.success) {
      setToast({ type: "ok", msg: `Base de datos restaurada con éxito (${res.propertiesCount} propiedades).` });
      setTab("properties");
      await fetchData();
    } else {
      setToast({ type: "err", msg: `Error al restaurar: ${res.error}` });
    }
    setRestoringBackup(false);
  };

  const handleBackupDelete = async (backup: BackupItem) => {
    setConfirmBackupDel(null);
    const token = await getAuthToken();
    if (!token) return;
    const res = await deleteBackupAction(token, backup.name);
    if (res.success) {
      setToast({ type: "ok", msg: "Copia de seguridad eliminada." });
      await fetchBackups();
    } else {
      setToast({ type: "err", msg: `Error al eliminar: ${res.error}` });
    }
  };

  useEffect(() => {
    if (tab === "backups") {
      fetchBackups();
    }
  }, [tab]);

  // Guard: exigir sesión
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!mounted) return;
      if (error || !user) {
        // Limpiar sesión local si el token es inválido o el usuario fue eliminado
        await supabase.auth.signOut();
        router.replace("/admin/login?redirect=/admin");
      } else {
        setEmail(user.email ?? null);
        setChecking(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) router.replace("/admin/login?redirect=/admin");
      else setEmail(session.user?.email ?? null);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  // Forzar fondo claro del body para esta página
  useEffect(() => {
    document.body.classList.add("bg-white", "text-slate-900");
    document.body.classList.remove("bg-slate-955", "bg-slate-950", "text-slate-100");
    return () => {
      document.body.classList.remove("bg-white", "text-slate-900");
      document.body.classList.add("bg-slate-950", "text-slate-100");
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [countAllRes, countPubRes, list] = await Promise.all([
      supabase.from("properties").select("*", { count: "exact", head: true }),
      supabase.from("properties").select("*", { count: "exact", head: true }).eq("featured", true),
      supabase.from("properties").select("*").order("created_at", { ascending: false }).limit(200),
    ]);

    setTotal(countAllRes.count ?? 0);
    setPublished(countPubRes.count ?? 0);
    const mappedRows = (list.data ?? []).map(mapDbToAdminProperty);
    setRows(mappedRows);
    setLoading(false);
  };

  useEffect(() => {
    if (!checking) fetchData();
  }, [checking]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login?redirect=/admin");
  };

  const newItem = () => {
    const folder = crypto.randomUUID();
    setEditing({
      titulo: "",
      description: "",
      precio: 0,
      ubicacion: "",
      neighborhood: "",
      tipo: "",
      dormitorios: null,
      banos: null,
      cochera: null,
      metros_cubiertos: null,
      metros_lote: null,
      plantas: null,
      cocina: null,
      oficina: null,
      pileta: null,
      imagen: "",
      fotos: [],
      moneda: "USD",
      published: false,
      vendido: false,
      alquilado: false,
      age: null,
      created_at: new Date().toISOString().split("T")[0],
      storageFolder: folder,
    });
    setShowForm(true);
  };

  const editItem = (p: Property) => {
    setEditing({
      id: p.id,
      titulo: p.titulo,
      description: p.description ?? "",
      precio: p.precio ?? 0,
      ubicacion: p.ubicacion ?? "",
      neighborhood: p.neighborhood ?? "",
      tipo: p.tipo ?? "",
      dormitorios: p.dormitorios ?? null,
      banos: p.banos ?? null,
      cochera: p.cochera ?? null,
      metros_cubiertos: p.metros_cubiertos ?? null,
      metros_lote: p.metros_lote ?? null,
      plantas: p.plantas ?? null,
      cocina: p.cocina ?? null,
      oficina: p.oficina ?? null,
      pileta: p.pileta ?? null,
      imagen: p.imagen ?? "",
      fotos: p.fotos ?? [],
      moneda: (p.moneda ?? "USD").toUpperCase(),
      published: Boolean(p.published),
      vendido: Boolean(p.vendido),
      alquilado: Boolean(p.alquilado),
      age: p.age !== undefined && p.age !== null ? toInt(p.age) : null,
      created_at: p.created_at ? new Date(p.created_at).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      storageFolder: String(p.id || crypto.randomUUID()),
    });
    setShowForm(true);
  };

  const togglePublish = async (p: Property) => {
    await triggerAutoBackup(`Antes de cambiar visibilidad de "${p.titulo}"`);
    const next = !p.published;
    const { error } = await supabase.from("properties").update({ featured: next }).eq("id", p.id);
    if (error) {
      setToast({ type: "err", msg: "No se pudo actualizar la publicación." });
      return;
    }
    setToast({ type: "ok", msg: next ? "Publicada" : "Pasó a borrador" });
    await revalidateProperties();
    await fetchData();
  };

  const toggleVendido = async (p: Property) => {
    await triggerAutoBackup(`Antes de cambiar estado de venta de "${p.titulo}"`);
    const next = !p.vendido;
    try {
      const { data: existing } = await supabase.from("properties").select("owner").eq("id", p.id).single();
      const currentOwner = existing?.owner || {};
      const nextOwner = {
        name: "Maldonado Leonides",
        phone: "+506 8888-8888",
        whatsappUrl: "https://wa.me/50688888888",
        ...currentOwner,
        vendido: next
      };
      const { error } = await supabase.from("properties").update({ owner: nextOwner }).eq("id", p.id);
      if (error) throw error;
      setToast({ type: "ok", msg: next ? "Marcada como vendida" : "Marcada como disponible" });
      await revalidateProperties();
      await fetchData();
    } catch (err) {
      console.error(err);
      setToast({ type: "err", msg: "No se pudo actualizar el estado de venta." });
    }
  };

  const toggleAlquilado = async (p: Property) => {
    await triggerAutoBackup(`Antes de cambiar estado de alquiler de "${p.titulo}"`);
    const next = !p.alquilado;
    try {
      const { data: existing } = await supabase.from("properties").select("owner").eq("id", p.id).single();
      const currentOwner = existing?.owner || {};
      const nextOwner = {
        name: "Maldonado Leonides",
        phone: "+506 8888-8888",
        whatsappUrl: "https://wa.me/50688888888",
        ...currentOwner,
        alquilado: next
      };
      const { error } = await supabase.from("properties").update({ owner: nextOwner }).eq("id", p.id);
      if (error) throw error;
      setToast({ type: "ok", msg: next ? "Marcada como alquilada" : "Marcada como disponible" });
      await revalidateProperties();
      await fetchData();
    } catch (err) {
      console.error(err);
      setToast({ type: "err", msg: "No se pudo actualizar el estado de alquiler." });
    }
  };

  const removeItem = async (p: Property) => {
    await triggerAutoBackup(`Antes de eliminar la propiedad "${p.titulo}"`);
    const { error } = await supabase.from("properties").delete().eq("id", p.id);
    setConfirmDel(null);
    if (error) {
      setToast({ type: "err", msg: "No se pudo eliminar." });
      return;
    }
    setToast({ type: "ok", msg: "Eliminado correctamente." });
    await revalidateProperties();
    await fetchData();
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allFilteredIds = filtered.map((p) => p.id);
    const allSelected = allFilteredIds.length > 0 && allFilteredIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allFilteredIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allFilteredIds])));
    }
  };

  const bulkHide = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    await triggerAutoBackup(`Antes de ocultar en lote ${selectedIds.length} propiedades`);
    const { error } = await supabase
      .from("properties")
      .update({ featured: false })
      .in("id", selectedIds);
    if (error) {
      setToast({ type: "err", msg: "No se pudieron ocultar las propiedades." });
    } else {
      setToast({ type: "ok", msg: `${selectedIds.length} propiedades ocultadas.` });
      setSelectedIds([]);
      await revalidateProperties();
      await fetchData();
    }
    setLoading(false);
  };

  const bulkPublish = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    await triggerAutoBackup(`Antes de publicar en lote ${selectedIds.length} propiedades`);
    const { error } = await supabase
      .from("properties")
      .update({ featured: true })
      .in("id", selectedIds);
    if (error) {
      setToast({ type: "err", msg: "No se pudieron publicar las propiedades." });
    } else {
      setToast({ type: "ok", msg: `${selectedIds.length} propiedades publicadas.` });
      setSelectedIds([]);
      await revalidateProperties();
      await fetchData();
    }
    setLoading(false);
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    await triggerAutoBackup(`Antes de eliminar en lote ${selectedIds.length} propiedades`);
    const { error } = await supabase
      .from("properties")
      .delete()
      .in("id", selectedIds);
    setConfirmBulkDel(false);
    if (error) {
      setToast({ type: "err", msg: "No se pudieron eliminar las propiedades." });
    } else {
      setToast({ type: "ok", msg: `${selectedIds.length} propiedades de la base de datos eliminadas.` });
      setSelectedIds([]);
      await revalidateProperties();
      await fetchData();
    }
    setLoading(false);
  };

  const saveItem = async (f: FormState) => {
    const cleanTitle = (f.titulo || "").trim();
    const cleanLocation = (f.ubicacion || "").trim();
    const cleanNeighborhood = (f.neighborhood || "").trim();
    const cleanType = (f.tipo || "").trim().toLowerCase();

    if (!cleanTitle) return setToast({ type: "err", msg: "El título es obligatorio." });
    if (!cleanLocation) return setToast({ type: "err", msg: "La ubicación es obligatoria." });
    if (!cleanNeighborhood) return setToast({ type: "err", msg: "El barrio/vecindario es obligatorio." });
    if (!cleanType) return setToast({ type: "err", msg: "El tipo es obligatorio." });

    await triggerAutoBackup(f.id ? `Antes de editar "${cleanTitle}"` : `Antes de crear "${cleanTitle}"`);

    let currentOwner = {};
    if (f.id) {
      try {
        const { data: existing } = await supabase.from("properties").select("owner").eq("id", f.id).single();
        if (existing?.owner) {
          currentOwner = existing.owner;
        }
      } catch (err) {
        console.warn("Error fetching existing property owner:", err);
      }
    }

    const payload: any = {
      title: cleanTitle,
      description: (f.description || "").trim() || null,
      price: typeof f.precio === "string" ? Number(f.precio) : f.precio ?? 0,
      location: cleanLocation,
      neighborhood: cleanNeighborhood,
      type: cleanType,
      beds: toInt(f.dormitorios),
      baths: toInt(f.banos),
      parkingSpaces: toInt(f.cochera),
      area: toNumOrNull(f.metros_cubiertos),
      landArea: toNumOrNull(f.metros_lote),
      constructionArea: toNumOrNull(f.metros_cubiertos),
      image: (f.imagen || "").trim() || null,
      gallery: (f.fotos || []).filter(Boolean),
      featured: Boolean(f.published),
      age: f.age !== null ? toInt(f.age) : null,
      created_at: f.created_at ? new Date(f.created_at).toISOString() : new Date().toISOString(),
      owner: {
        name: "Maldonado Leonides",
        phone: "+506 8888-8888",
        whatsappUrl: "https://wa.me/50688888888",
        ...currentOwner,
        moneda: (f.moneda || "USD").toUpperCase(),
        vendido: Boolean(f.vendido),
        alquilado: Boolean(f.alquilado),
        plantas: toInt(f.plantas),
        cocina: f.cocina && f.cocina !== "" ? String(f.cocina) : null,
        oficina: f.oficina && f.oficina !== "" ? String(f.oficina) : null,
        pileta: f.pileta && f.pileta !== "" ? String(f.pileta) : null,
      }
    };

    if (!f.id) {
      const slug = slugName(cleanTitle).toLowerCase() + '-' + Math.floor(Math.random() * 10000);
      payload.id = 'prop-' + slug;
    }

    let error = null;
    if (f.id) {
      ({ error } = await supabase.from("properties").update(payload).eq("id", f.id));
    } else {
      ({ error } = await supabase.from("properties").insert(payload));
    }
    if (error) {
      console.error("Save error:", error);
      setToast({ type: "err", msg: "No se pudo guardar." });
      return;
    }

    setToast({ type: "ok", msg: "Guardado correctamente." });
    setShowForm(false);
    setEditing(null);
    await revalidateProperties();
    await fetchData();
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((p) => {
      const base = `${p.titulo ?? ""} ${p.tipo ?? ""} ${p.ubicacion ?? ""}`.toLowerCase();
      return base.includes(q);
    });
  }, [rows, search]);

  if (checking) {
    return (
      <main className="min-h-screen grid place-items-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-l-transparent" />
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-112px)] bg-neutral-50 pt-28 pb-16">
        {/* Header del Admin */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.ico"
                alt="El Dueño Vende"
                className="h-9 w-9 object-contain"
              />
              <div>
                <h1 className="text-base font-extrabold leading-5 text-slate-900">Panel de administración</h1>
                <p className="text-xs text-slate-500 leading-4 font-semibold">El Dueño Vende</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {email && <span className="hidden text-sm text-slate-600 font-semibold sm:block">{email}</span>}
              <Link href="/" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
                Ir al sitio
              </Link>
              <button
                onClick={logout}
                className="rounded-full px-4 py-2 text-xs font-bold text-slate-950 transition-colors cursor-pointer"
                style={{ backgroundColor: BRAND_COLOR }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_HOVER)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR)}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-12">
          {/* Sidebar simple */}
          <aside className="lg:col-span-3">
            <nav className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm space-y-1">
              <button
                type="button"
                onClick={() => setTab("properties")}
                className={cx(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer",
                  tab === "properties"
                    ? "text-neutral-900 bg-slate-100"
                    : "text-neutral-700 hover:bg-neutral-50"
                )}
              >
                Resumen <span className="text-xs text-neutral-400 font-semibold">Propiedades</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("backups")}
                className={cx(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition cursor-pointer",
                  tab === "backups"
                    ? "text-neutral-900 bg-slate-100"
                    : "text-neutral-750 hover:bg-neutral-50"
                )}
              >
                Copias de seguridad <span className="text-xs text-neutral-400 font-semibold">Backups</span>
              </button>
              <Link href="/propiedades" className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
                Ver propiedades <span className="text-xs text-neutral-400">Catálogo</span>
              </Link>
            </nav>
          </aside>

          {/* Main */}
          <section className="space-y-6 lg:col-span-9">
            {tab === "properties" ? (
              <>
                {/* Métricas */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <MetricCard title="Propiedades" value={total} />
                  <MetricCard title="Publicadas" value={published} accent />
                  <MetricCard title="Borradores" value={draft} />
                </div>

                {/* Acciones */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:w-80">
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por título, tipo o ubicación…"
                      className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#ffe600] focus:ring-1 focus:ring-[#ffe600]/10 text-slate-900 placeholder:text-black placeholder:opacity-100"
                    />
                    {search && (
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                        onClick={() => setSearch("")}
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  <button
                    onClick={newItem}
                    className="rounded-full px-5 py-2.5 font-bold text-slate-950 transition-colors cursor-pointer text-sm"
                    style={{ backgroundColor: BRAND_COLOR }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_HOVER)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR)}
                  >
                    + Nueva propiedad
                  </button>
                </div>

                {/* Lista */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <div className="flex items-center gap-3">
                      {!loading && filtered.length > 0 && (
                        <input
                          type="checkbox"
                          checked={filtered.length > 0 && filtered.every((p) => selectedIds.includes(p.id))}
                          onChange={handleSelectAll}
                          className="h-4 w-4 rounded border-slate-355 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-500"
                        />
                      )}
                      <h2 className="text-base font-extrabold text-slate-900">Propiedades</h2>
                    </div>
                    <span className="text-xs text-neutral-500 font-semibold">{filtered.length} resultados</span>
                  </div>

                  {loading ? (
                    <TableSkeleton />
                  ) : filtered.length === 0 ? (
                    <p className="px-5 py-8 text-sm text-neutral-500 font-semibold">No hay propiedades para mostrar.</p>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {filtered.map((p) => {
                        const thumb = p.imagen || p.fotos?.[0] || "/placeholder-property.jpg";
                        const badge = p.published ? (
                          <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">Publicada</span>
                        ) : (
                          <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">Borrador</span>
                        );

                        const priceNumber = typeof p.precio === "string" ? parseFloat(p.precio) : p.precio ?? 0;
                        const money = (() => {
                          const code = (p.moneda || "USD").toUpperCase();
                          try {
                            return new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: code,
                              maximumFractionDigits: 0,
                            }).format(priceNumber);
                          } catch {
                            return `${code} ${new Intl.NumberFormat("es-AR").format(priceNumber)}`;
                          }
                        })();

                        return (
                          <li
                            key={p.id}
                            className={cx(
                              "flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 transition-colors",
                              selectedIds.includes(p.id) ? "bg-amber-50/25 hover:bg-amber-50/35" : "hover:bg-neutral-50/50"
                            )}
                          >
                            <div className="flex items-center gap-4 grow min-w-0">
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(p.id)}
                                onChange={() => handleSelectRow(p.id)}
                                className="h-4 w-4 rounded border-slate-350 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0 accent-emerald-500"
                              />
                              <div className="relative h-14 w-20 overflow-hidden rounded-lg bg-neutral-100 flex-shrink-0 border border-slate-250">
                                <img
                                  src={thumb}
                                  alt={p.titulo}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    const t = e.currentTarget as HTMLImageElement;
                                    if (!t.src.includes("placeholder-property.jpg")) t.src = "/placeholder-property.jpg";
                                  }}
                                />
                                {p.vendido && !p.alquilado && (
                                  <span className="absolute left-0 top-0 rounded-br bg-black px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                                    Vendido
                                  </span>
                                )}
                                {p.alquilado && (
                                  <span className="absolute left-0 top-0 rounded-br bg-black px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow">
                                    Alquilado
                                  </span>
                                )}
                              </div>

                              <div className="min-w-0 grow">
                                <div className="flex flex-wrap items-center gap-2">
                                  <Link href={`/propiedades/${p.id}`} className="truncate font-bold text-slate-900 hover:underline text-sm sm:text-base" title={p.titulo}>
                                    {p.titulo}
                                  </Link>
                                  {badge}
                                  {p.vendido && !p.alquilado && (
                                    <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                      Vendido
                                    </span>
                                  )}
                                  {p.alquilado && (
                                    <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                      Alquilado
                                    </span>
                                  )}
                                </div>
                                <p className="truncate text-xs text-slate-500 font-semibold mt-0.5">
                                  {p.tipo ?? "—"} — {p.ubicacion ?? "—"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-slate-100 pt-2 sm:pt-0 sm:border-0 shrink-0">
                              <div className="text-left sm:text-right">
                                <div
                                  className="text-sm sm:text-base font-extrabold"
                                  style={{
                                    color: (p.vendido || p.alquilado) ? "#6b7280" : "#0f172a",
                                    textDecoration: (p.vendido || p.alquilado) ? "line-through" : "none",
                                  }}
                                >
                                  {money}
                                </div>
                                <div className="text-[10px] text-slate-400 font-semibold">
                                  {p.created_at ? new Date(p.created_at).toLocaleDateString("es-AR") : "—"}
                                </div>
                              </div>

                              <div className="flex flex-nowrap items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => togglePublish(p)}
                                  className={cx(
                                    "rounded-full px-2.5 py-1 text-xs font-bold border transition cursor-pointer",
                                    p.published
                                      ? "text-green-700 bg-green-50 border-green-200 hover:bg-green-100"
                                      : "text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
                                  )}
                                  title={p.published ? "Pasar a borrador" : "Publicar"}
                                >
                                  {p.published ? "Ocultar" : "Publicar"}
                                </button>

                                <button
                                  onClick={() => toggleVendido(p)}
                                  className={cx(
                                    "rounded-full px-2.5 py-1 text-xs font-bold border transition cursor-pointer",
                                    p.vendido
                                      ? "text-red-700 bg-red-50 border-red-200 hover:bg-red-100"
                                      : "text-slate-700 border-slate-200 hover:bg-slate-100"
                                  )}
                                  title={p.vendido ? "Quitar vendido" : "Marcar vendido"}
                                >
                                  {p.vendido ? "Vendido ✓" : "Vender"}
                                </button>

                                <button
                                  onClick={() => toggleAlquilado(p)}
                                  className={cx(
                                    "rounded-full px-2.5 py-1 text-xs font-bold border transition cursor-pointer",
                                    p.alquilado
                                      ? "text-slate-700 bg-slate-50 border-slate-300 hover:bg-slate-100"
                                      : "text-slate-700 border-slate-200 hover:bg-slate-100"
                                  )}
                                  title={p.alquilado ? "Quitar alquilado" : "Marcar alquilado"}
                                >
                                  {p.alquilado ? "Alquilado ✓" : "Alquilar"}
                                </button>

                                <button
                                  onClick={() => editItem(p)}
                                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                                >
                                  Editar
                                </button>

                                <button
                                  onClick={() => setConfirmDel(p)}
                                  className="rounded-full border border-red-200 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-50 cursor-pointer"
                                >
                                  Borrar
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {/* Backups Header */}
                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Copias de seguridad</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      Resguardá y restaurá el catálogo de propiedades. Se guardan en la nube de Supabase de forma segura.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowManualBackupPrompt(true)}
                    className="rounded-full px-5 py-2.5 font-bold text-slate-950 transition-colors cursor-pointer text-sm self-start sm:self-center"
                    style={{ backgroundColor: BRAND_COLOR }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_HOVER)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR)}
                  >
                    + Crear copia manual
                  </button>
                </div>

                {/* Backups List */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-base font-extrabold text-slate-900">Historial de backups</h2>
                    <span className="text-xs text-neutral-500 font-semibold">{backups.length} copias</span>
                  </div>

                  {loadingBackups ? (
                    <div className="p-12 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-l-transparent" />
                      <p className="mt-3 text-sm text-neutral-500 font-semibold">Cargando copias de seguridad…</p>
                    </div>
                  ) : backups.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <p className="mt-4 text-sm text-neutral-500 font-bold">No hay copias de seguridad creadas aún.</p>
                      <p className="text-xs text-neutral-400 mt-1 font-semibold">Se crearán automáticamente cuando realices cambios en las propiedades.</p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {backups.map((b) => {
                        const isAuto = b.type === "auto";
                        return (
                          <li key={b.name} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 hover:bg-neutral-50/50 transition-colors">
                            <div className="flex items-center gap-4 grow min-w-0">
                              <svg className="h-5 w-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <ellipse cx="12" cy="5" rx="9" ry="3" />
                                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>

                              <div className="min-w-0 grow">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                                    {b.description}
                                  </span>
                                  <span className={cx(
                                    "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                    isAuto ? "bg-slate-200 text-slate-800" : "bg-amber-100 text-amber-800"
                                  )}>
                                    {isAuto ? "Automática" : "Manual"}
                                  </span>
                                  <span className="rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                                    {b.propertiesCount} propiedades
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 font-semibold mt-1">
                                  Creado el {b.createdAt}
                                  {b.size ? ` • ${(b.size / 1024).toFixed(1)} KB` : ""}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2 sm:pt-0 sm:border-0 shrink-0">
                              <button
                                onClick={() => setConfirmRestore(b)}
                                className="rounded-full bg-slate-950 text-white hover:bg-slate-800 border border-slate-950 px-4 py-1.5 text-xs font-bold transition cursor-pointer"
                              >
                                Restaurar
                              </button>
                              <button
                                onClick={() => setConfirmBackupDel(b)}
                                className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-50 cursor-pointer transition"
                              >
                                Eliminar
                              </button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Formulario lateral (modal con uploads) */}
        {showForm && editing && (
          <SideForm
            data={editing}
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={saveItem}
          />
        )}

        {/* Confirmación de borrado */}
        {confirmDel && (
          <ConfirmDialog
            title="Eliminar propiedad"
            text={`¿Seguro que querés eliminar “${confirmDel.titulo}”? Esta acción no se puede deshacer.`}
            confirmLabel="Eliminar"
            onCancel={() => setConfirmDel(null)}
            onConfirm={() => removeItem(confirmDel)}
          />
        )}

        {confirmBulkDel && (
          <ConfirmDialog
            title="Eliminar propiedades seleccionadas"
            text={`¿Seguro que querés eliminar las ${selectedIds.length} propiedades seleccionadas? Esta acción no se puede deshacer y se borrarán permanentemente.`}
            confirmLabel="Eliminar todas"
            onCancel={() => setConfirmBulkDel(false)}
            onConfirm={bulkDelete}
          />
        )}

        {/* Barra flotante de acciones en lote */}
        {selectedIds.length > 0 && (
          <div className="fixed bottom-10 left-1/2 z-40 -translate-x-1/2 flex items-center gap-4 rounded-full border border-slate-800 bg-slate-900 px-6 py-3.5 text-white shadow-2xl">
            <span className="text-xs font-bold whitespace-nowrap">{selectedIds.length} seleccionadas</span>
            <div className="h-4 w-px bg-slate-700 shrink-0" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={bulkPublish}
                className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-neutral-100 transition cursor-pointer"
              >
                Publicar
              </button>
              <button
                type="button"
                onClick={bulkHide}
                className="rounded-full bg-slate-800 border border-slate-750 px-3.5 py-1.5 text-xs font-bold text-slate-200 hover:bg-slate-750 transition cursor-pointer"
              >
                Ocultar
              </button>
              <button
                type="button"
                onClick={() => setConfirmBulkDel(true)}
                className="rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition cursor-pointer"
                style={{ backgroundColor: "#ef4444" }}
              >
                Borrar
              </button>
            </div>
            <div className="h-4 w-px bg-slate-700 shrink-0" />
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
              title="Desmarcar todas"
            >
              Desmarcar
            </button>
          </div>
        )}

        {/* Toast simple */}
        {toast && (
          <div
            className={cx(
              "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-bold shadow",
              toast.type === "ok" ? "bg-slate-950 text-white" : "bg-red-600 text-white"
            )}
          >
            {toast.msg}
          </div>
        )}

        {/* Modal de backup manual */}
        {showManualBackupPrompt && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <h4 className="text-lg font-extrabold text-slate-900">Crear copia de seguridad</h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-semibold">
                Ingresá una descripción para identificar esta copia de seguridad en el historial.
              </p>
              
              <div className="mt-4">
                <input
                  type="text"
                  value={manualBackupDesc}
                  onChange={(e) => setManualBackupDesc(e.target.value)}
                  placeholder="Ej: Antes de cambiar precios masivamente"
                  className="w-full rounded-lg border border-slate-350 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] text-sm"
                  autoFocus
                />
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowManualBackupPrompt(false);
                    setManualBackupDesc("");
                  }}
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateManualBackup}
                  className="rounded-full px-5 py-2.5 text-xs font-bold text-slate-950 cursor-pointer"
                  style={{ backgroundColor: BRAND_COLOR }}
                  disabled={creatingBackup}
                >
                  {creatingBackup ? "Creando..." : "Crear copia"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmar restauración */}
        {confirmRestore && (
          <ConfirmDialog
            title="Restaurar copia de seguridad"
            text={`¿Seguro que querés restaurar la copia de seguridad "${confirmRestore.description}" del ${confirmRestore.createdAt}? Esto eliminará todas las propiedades actuales y las reemplazará por las ${confirmRestore.propertiesCount} propiedades guardadas. Se creará una copia automática de tu estado actual por seguridad.`}
            confirmLabel="Restaurar ahora"
            onCancel={() => setConfirmRestore(null)}
            onConfirm={() => handleRestore(confirmRestore)}
          />
        )}

        {/* Confirmar eliminación de backup */}
        {confirmBackupDel && (
          <ConfirmDialog
            title="Eliminar copia de seguridad"
            text={`¿Seguro que querés eliminar permanentemente la copia de seguridad "${confirmBackupDel.description}"? Esta acción no se puede deshacer y se borrará de Supabase.`}
            confirmLabel="Eliminar copia"
            onCancel={() => setConfirmBackupDel(null)}
            onConfirm={() => handleBackupDelete(confirmBackupDel)}
          />
        )}

        {/* Cargador de restauración en progreso */}
        {restoringBackup && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
            <div className="rounded-2xl bg-white p-6 shadow-2xl text-center flex flex-col items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-900 border-l-transparent" />
              <p className="mt-4 text-sm font-extrabold text-slate-900">Restaurando copia de seguridad...</p>
              <p className="text-xs text-slate-500 mt-1 font-semibold">Por favor, no cierres esta ventana.</p>
            </div>
          </div>
        )}
      </main>

      <Footer showCTA={false} />
    </>
  );
}

/* ---------- UI helpers ---------- */
function MetricCard({ title, value, accent = false }: { title: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">{value}</span>
        {accent && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: BRAND_COLOR }} />}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <ul className="divide-y divide-slate-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-14 w-20 animate-pulse rounded-lg bg-neutral-100 border border-slate-200" />
          <div className="min-w-0 grow space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="hidden w-32 sm:block">
            <div className="ml-auto h-4 w-20 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="h-8 w-16 animate-pulse rounded-full bg-neutral-200" />
        </li>
      ))}
    </ul>
  );
}

/* ================ SideForm (crear/editar) + Uploads ================ */
function SideForm({
  data,
  onClose,
  onSave,
}: {
  data: FormState;
  onClose: () => void;
  onSave: (d: FormState) => void;
}) {
  const [form, setForm] = useState<FormState>(data);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGal, setUploadingGal] = useState(false);

  useEffect(() => setForm(data), [data]);

  const lenis = useLenis();

  // Bloquear scroll principal al montar el modal
  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [lenis]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const fotosText = (form.fotos || []).join("\n");
  const disableSave = uploadingMain || uploadingGal;

  const currentFolder = form.id ? String(form.id) : form.storageFolder;

  async function uploadToStorage(file: File, folder: string) {
    const cleanName = slugName(file.name.replace(/\.[^/.]+$/, "")) + ".webp";
    let fileToUpload: File | Blob = file;

    // Compresión y conversión a WebP
    if (file.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 0.8, // 800KB máximo (antes 150KB) para no perder calidad
          maxWidthOrHeight: 1920, // 1920px (antes 1280px) para mantener resolución
          useWebWorker: true,
          fileType: "image/webp",
          initialQuality: 0.85, // Excelente calidad visual (85%)
        };
        const compressedBlob = await imageCompression(file, options);
        // Crear un nuevo objeto File con el tipo y nombre correctos para que no falle al subir
        fileToUpload = new File([compressedBlob], cleanName, { type: "image/webp" });
      } catch (err) {
        console.error("Error al comprimir:", err);
      }
    }

    const path = `${folder}/${Date.now()}-${cleanName}`;
    const { data: uploadData, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, fileToUpload, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/webp"
      });
    if (error) throw error;
    const { data: pub } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(uploadData?.path || path);
    return pub.publicUrl as string;
  }

  async function onPickMain(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploadingMain(true);
    try {
      const url = await uploadToStorage(f, currentFolder);
      set("imagen", url);
      if (!form.fotos?.length) set("fotos", [url]);
    } catch {
      alert("No se pudo subir la imagen principal.");
    } finally {
      setUploadingMain(false);
      e.target.value = "";
    }
  }

  async function onPickGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingGal(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadToStorage(file, currentFolder);
        urls.push(url);
      }
      set("fotos", [...(form.fotos || []), ...urls]);
      if (!form.imagen && urls.length) set("imagen", urls[0]);
    } catch {
      alert("No se pudieron subir algunas fotos.");
    } finally {
      setUploadingGal(false);
      e.target.value = "";
    }
  }

  const removeGalleryItem = (idx: number) => {
    const next = [...(form.fotos || [])];
    const [removed] = next.splice(idx, 1);
    set("fotos", next);
    if (removed && form.imagen === removed) {
      set("imagen", next[0] || "");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div 
        className="relative flex h-full max-h-[95vh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" 
        data-lenis-prevent="true"
      >
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          <h3 className="text-lg font-extrabold text-slate-900">{form.id ? "Editar propiedad" : "Nueva propiedad"}</h3>
          <button onClick={onClose} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-neutral-50 cursor-pointer">
            Cerrar
          </button>
        </div>

        <div className="space-y-5">
          {/* Básicos */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Título" value={form.titulo} onChange={(v) => set("titulo", v)} required />
            <Input label="Tipo" value={form.tipo} onChange={(v) => set("tipo", v)} placeholder="Casa, Departamento, Terreno..." required />
            <Input label="Ubicación (Provincia / Cantón)" value={form.ubicacion} onChange={(v) => set("ubicacion", v)} placeholder="Ej: San José, Moravia" required />
            <Input label="Barrio / Vecindario" value={form.neighborhood} onChange={(v) => set("neighborhood", v)} placeholder="Ej: San Vicente" required />

            <label className="block text-sm">
              <span className="mb-1 block font-bold text-slate-750">Moneda</span>
              <select
                value={(form.moneda || "USD").toUpperCase()}
                onChange={(e) => set("moneda", e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] cursor-pointer text-sm"
              >
                <option value="USD">USD (Dólares)</option>
                <option value="CRC">CRC (Colones)</option>
              </select>
            </label>
          </div>

          <TextArea
            label="Descripción"
            value={form.description}
            onChange={(v) => set("description", v)}
            rows={5}
          />

          {/* Precio + switches */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input type="number" label="Precio" value={String(form.precio ?? 0)} onChange={(v) => set("precio", v)} min="0" />
            <Toggle label="Publicado" checked={Boolean(form.published)} onChange={(v) => set("published", v)} />
            <Toggle label="Vendido" checked={Boolean(form.vendido)} onChange={(v) => set("vendido", v)} />
            <Toggle label="Alquilado" checked={Boolean(form.alquilado)} onChange={(v) => set("alquilado", v)} />
          </div>

          {/* Antigüedad y Fecha de Publicación */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              type="number"
              label="Antigüedad (Años)"
              value={form.age !== null ? String(form.age) : ""}
              onChange={(v) => set("age", v !== "" ? toInt(v) : null)}
              min="0"
              placeholder="Ej. 0 (A estrenar)"
            />
            <div className="block text-sm">
              <span className="mb-1 block font-bold text-slate-700">Fecha de Publicación</span>
              <DatePicker
                selected={form.created_at ? new Date(form.created_at + "T00:00:00") : null}
                onChange={(date: Date | null) => {
                  if (date) {
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    set("created_at", `${yyyy}-${mm}-${dd}`);
                  } else {
                    set("created_at", "");
                  }
                }}
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-lg border border-slate-350 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] text-sm"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          {/* Imagen principal (subida) */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-750">Imagen principal</label>
            {form.imagen ? (
              <div className="relative h-40 w-full overflow-hidden rounded-lg border border-slate-200 bg-neutral-100">
                <img src={form.imagen} alt="Principal" className="h-full w-full object-cover" />
                <div className="absolute inset-x-2 bottom-2 flex gap-2">
                  <label className="rounded-full bg-white/90 border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 shadow cursor-pointer hover:bg-white transition">
                    Subir otra
                    <input type="file" accept="image/*" className="hidden" onChange={onPickMain} disabled={uploadingMain} />
                  </label>
                  <button
                    type="button"
                    className="rounded-full bg-white/90 border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 shadow hover:bg-white cursor-pointer transition"
                    onClick={() => set("imagen", "")}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex h-32 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition duration-200">
                <input type="file" accept="image/*" className="hidden" onChange={onPickMain} disabled={uploadingMain} />
                {uploadingMain ? "Subiendo…" : "Subir desde tu computadora"}
              </label>
            )}
          </div>

          {/* Galería (subida múltiple) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-750">Galería</span>
              <label className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-neutral-50 cursor-pointer transition duration-200">
                {uploadingGal ? "Subiendo…" : "Agregar fotos"}
                <input type="file" accept="image/*" multiple className="hidden" onChange={onPickGallery} disabled={uploadingGal} />
              </label>
            </div>

            {form.fotos && form.fotos.length > 0 ? (
              <ul className="grid grid-cols-3 gap-3">
                {form.fotos.map((url, i) => (
                  <li key={url + i} className="relative h-24 overflow-hidden rounded-lg border border-slate-200 bg-neutral-100">
                    <img src={url} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded bg-black/50 px-2 py-0.5 text-xs font-bold text-white cursor-pointer hover:bg-black/75 transition"
                      onClick={() => removeGalleryItem(i)}
                    >
                      Quitar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-neutral-500 font-semibold">Aún no agregaste fotos.</p>
            )}

            {/* Campo alternativo (pegar URLs si querés) */}
            <details className="rounded-lg border border-slate-200 bg-neutral-50 p-3 text-xs text-neutral-700">
              <summary className="cursor-pointer select-none text-sm font-bold">Pegar URLs (opcional)</summary>
              <div className="mt-2">
                <TextArea
                  label="Una URL por línea"
                  value={fotosText}
                  onChange={(v) => set("fotos", v.split("\n").map((s) => s.trim()).filter(Boolean))}
                  rows={4}
                />
              </div>
            </details>
          </div>

          {/* Detalles */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Input type="number" label="Dormitorios" value={form.dormitorios ?? ""} onChange={(v) => set("dormitorios", toInt(v))} min="0" />
            <Input type="number" label="Baños" value={form.banos ?? ""} onChange={(v) => set("banos", toInt(v))} min="0" />
            <Input type="number" label="Cochera" value={form.cochera ?? ""} onChange={(v) => set("cochera", toInt(v))} min="0" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Input type="number" label="m² Cubiertos" value={form.metros_cubiertos ?? ""} onChange={(v) => set("metros_cubiertos", v)} min="0" />
            <Input type="number" label="m² Lote" value={form.metros_lote ?? ""} onChange={(v) => set("metros_lote", v)} min="0" />
            <Input type="number" label="Plantas" value={form.plantas ?? ""} onChange={(v) => set("plantas", toInt(v))} min="0" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <SelectTextQuant label="Cocina" value={form.cocina} onChange={(v) => set("cocina", v)} />
            <SelectTextQuant label="Oficina" value={form.oficina} onChange={(v) => set("oficina", v)} />
            <SelectTextQuant label="Pileta" value={form.pileta} onChange={(v) => set("pileta", v)} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-neutral-50 cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={() => onSave(form)}
              className="rounded-full px-5 py-2.5 text-xs font-bold text-slate-950 disabled:opacity-60 cursor-pointer transition shadow-md hover:shadow-lg"
              disabled={disableSave}
              style={{ backgroundColor: BRAND_COLOR }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR)}
              title={disableSave ? "Esperá a que terminen las subidas" : undefined}
            >
              {form.id ? "Guardar cambios" : "Crear propiedad"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Inputs básicos */
function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  min,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  placeholder?: string;
  min?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-bold text-slate-700">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        required={required}
        className="w-full rounded-lg border border-slate-350 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] text-sm"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-bold text-slate-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-slate-350 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] text-sm"
      />
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm">
      <span className="font-bold text-slate-900">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cx("relative h-6 w-11 rounded-full transition-colors cursor-pointer", checked ? "bg-green-500" : "bg-slate-300")}
        aria-pressed={checked}
      >
        <span
          className={cx(
            "absolute left-0 top-0 h-6 w-6 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </label>
  );
}

/** Select para TEXT con valores: "", "true", "false", "1"…"4" */
function SelectTextQuant({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const v = value ?? "";
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-bold text-slate-700">{label}</span>
      <select
        value={v}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:ring-1 focus:ring-[#ffe600]/20 focus:border-[#ffe600] cursor-pointer text-sm"
      >
        <option value="">—</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
        <option value="1">1 (cantidad)</option>
        <option value="2">2 (cantidad)</option>
        <option value="3">3 (cantidad)</option>
        <option value="4">4 (cantidad)</option>
      </select>
    </label>
  );
}

/* ================ Confirm Dialog ================ */
function ConfirmDialog({
  title,
  text,
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm,
}: {
  title: string;
  text: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl text-center">
        <h4 className="text-lg font-extrabold text-slate-900">{title}</h4>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed font-semibold">{text}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-neutral-50 cursor-pointer">
            Cancelar
          </button>
          <button onClick={onConfirm} className="rounded-full px-5 py-2.5 text-xs font-bold text-white hover:bg-red-700 cursor-pointer shadow" style={{ backgroundColor: "#ef4444" }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
