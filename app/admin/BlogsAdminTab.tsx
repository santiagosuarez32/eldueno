"use client";

import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { BlogPost, mapDbToBlogPost } from "@/app/data/blog";

function cx(...cn: Array<string | false | undefined>) {
  return cn.filter(Boolean).join(" ");
}

function slugName(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w.-]+/g, "-");
}

export default function BlogsAdminTab({ setToast, triggerAutoBackup, userRole }: { setToast: any, triggerAutoBackup: any, userRole?: string }) {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (error) {
      setToast({ type: "err", msg: "Error al cargar los blogs." });
    } else if (data) {
      setRows(data.map(mapDbToBlogPost));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((p) => {
      const base = `${p.title} ${p.category}`.toLowerCase();
      return base.includes(q);
    });
  }, [rows, search]);

  const newItem = () => {
    setEditing({
      title: "",
      slug: "",
      category: "General",
      date: new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      readTime: "5 min",
      author: "Dueño Directo",
      excerpt: "",
      image: "",
      content: "",
      published: false
    });
    setShowForm(true);
  };

  const editItem = (p: BlogPost) => {
    setEditing(p);
    setShowForm(true);
  };

  const togglePublish = async (p: BlogPost) => {
    await triggerAutoBackup(`Antes de cambiar visibilidad del blog "${p.title}"`);
    const next = !p.published;
    const { error } = await supabase.from("blogs").update({ published: next }).eq("id", p.id);
    if (error) {
      setToast({ type: "err", msg: "No se pudo actualizar la publicación." });
      return;
    }
    setToast({ type: "ok", msg: next ? "Blog publicado" : "Blog pasado a borrador" });
    await fetchData();
  };

  const removeItem = async (p: BlogPost) => {
    if (!confirm(`¿Seguro que deseas eliminar el blog "${p.title}"?`)) return;
    await triggerAutoBackup(`Antes de eliminar el blog "${p.title}"`);
    const { error } = await supabase.from("blogs").delete().eq("id", p.id);
    if (error) {
      setToast({ type: "err", msg: "No se pudo eliminar el blog." });
      return;
    }
    setToast({ type: "ok", msg: "Blog eliminado correctamente." });
    await fetchData();
  };

  const saveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const cleanTitle = (editing.title || "").trim();
    if (!cleanTitle) return setToast({ type: "err", msg: "El título es obligatorio." });

    await triggerAutoBackup(editing.id ? `Antes de editar blog "${cleanTitle}"` : `Antes de crear blog "${cleanTitle}"`);

    const payload = {
      title: cleanTitle,
      slug: editing.slug || slugName(cleanTitle).toLowerCase(),
      category: editing.category || "General",
      date: editing.date || new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
      read_time: editing.readTime || "5 min",
      author: editing.author || "Dueño Directo",
      excerpt: editing.excerpt || "",
      image: editing.image || "",
      content: editing.content || "",
      published: Boolean(editing.published)
    };

    let error = null;
    if (editing.id) {
      ({ error } = await supabase.from("blogs").update(payload).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("blogs").insert([payload]));
    }

    if (error) {
      console.error("Save error:", error);
      setToast({ type: "err", msg: "No se pudo guardar el blog." });
      return;
    }

    setToast({ type: "ok", msg: "Blog guardado correctamente." });
    setShowForm(false);
    setEditing(null);
    await fetchData();
  };

  if (showForm && editing) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">{editing.id ? "Editar Blog" : "Nuevo Blog"}</h2>
          <button onClick={() => setShowForm(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Volver</button>
        </div>
        <form onSubmit={saveItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Título</label>
              <input required value={editing.title || ""} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Slug (opcional)</label>
              <input value={editing.slug || ""} onChange={e => setEditing({...editing, slug: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Categoría</label>
              <input required value={editing.category || ""} onChange={e => setEditing({...editing, category: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Autor</label>
              <input required value={editing.author || ""} onChange={e => setEditing({...editing, author: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">URL Imagen</label>
              <input required value={editing.image || ""} onChange={e => setEditing({...editing, image: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tiempo de lectura</label>
              <input required value={editing.readTime || ""} onChange={e => setEditing({...editing, readTime: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Extracto (Resumen)</label>
            <textarea required value={editing.excerpt || ""} onChange={e => setEditing({...editing, excerpt: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" rows={2} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contenido (Markdown soportado)</label>
            <textarea required value={editing.content || ""} onChange={e => setEditing({...editing, content: e.target.value})} className="w-full rounded-lg border border-slate-300 p-2 text-sm" rows={10} />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" checked={editing.published} onChange={e => setEditing({...editing, published: e.target.checked})} />
            <label htmlFor="published" className="text-sm font-semibold text-slate-700">Publicado</label>
          </div>
          <button type="submit" className="w-full rounded-lg bg-[#ffe600] py-3 text-sm font-bold text-slate-900 transition hover:bg-[#ffff33]">Guardar Blog</button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar blogs..."
          className="w-full sm:w-80 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={newItem}
          className="rounded-full bg-[#ffe600] px-5 py-2 font-bold text-slate-950 transition hover:bg-[#ffff33] text-sm"
        >
          + Nuevo Blog
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-neutral-500 font-semibold">Cargando blogs...</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500 font-semibold">No hay blogs para mostrar.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map(p => (
              <li key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition">
                <div>
                  <h3 className="font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-500">{p.category} • {p.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePublish(p)} className={cx("px-3 py-1 rounded text-xs font-bold", p.published ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                    {p.published ? "Publicado" : "Borrador"}
                  </button>
                  <button onClick={() => editItem(p)} className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200">Editar</button>
                  {userRole !== "editor" && (
                    <button onClick={() => removeItem(p)} className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200">Eliminar</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
