"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DEFAULT_CRM_FORMS, type CrmFormType } from "@/lib/crmForms";
import { Link as LinkIcon, Save, RotateCcw, Check, ExternalLink } from "lucide-react";

interface CrmAdminTabProps {
  setToast: (toast: { type: "ok" | "err"; msg: string } | null) => void;
}

export default function CrmAdminTab({ setToast }: CrmAdminTabProps) {
  const [forms, setForms] = useState<{ [key in CrmFormType]: string }>(DEFAULT_CRM_FORMS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCrmSettings();
  }, []);

  const fetchCrmSettings = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("properties")
        .select("owner")
        .eq("id", "prop-site-settings")
        .maybeSingle();

      if (data?.owner?.crmForms) {
        setForms({
          venta: data.owner.crmForms.venta || DEFAULT_CRM_FORMS.venta,
          prestamos: data.owner.crmForms.prestamos || DEFAULT_CRM_FORMS.prestamos,
          arquitectura: data.owner.crmForms.arquitectura || DEFAULT_CRM_FORMS.arquitectura,
          contacto: data.owner.crmForms.contacto || DEFAULT_CRM_FORMS.contacto,
          propiedad: data.owner.crmForms.propiedad || DEFAULT_CRM_FORMS.propiedad,
        });
      }
    } catch (err) {
      console.error("Error fetching CRM settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. Fetch current owner object from prop-site-settings
      const { data: existingData } = await supabase
        .from("properties")
        .select("owner")
        .eq("id", "prop-site-settings")
        .maybeSingle();

      const currentOwner = existingData?.owner || {};
      const updatedOwner = typeof currentOwner === 'object' && currentOwner !== null
        ? { ...currentOwner, crmForms: forms }
        : { crmForms: forms };

      const payload = {
        id: "prop-site-settings",
        title: "Site Settings (DO NOT DELETE)",
        description: "System record, do not delete.",
        price: 0,
        location: "System",
        neighborhood: "System",
        type: "casa",
        image: "system",
        featured: false,
        owner: updatedOwner,
      };

      const { data: existing } = await supabase
        .from("properties")
        .select("id")
        .eq("id", "prop-site-settings")
        .maybeSingle();

      let error = null;
      if (!existing) {
        ({ error } = await supabase.from("properties").insert(payload));
      } else {
        ({ error } = await supabase.from("properties").update(payload).eq("id", "prop-site-settings"));
      }

      if (error) {
        setToast({ type: "err", msg: "Error al guardar enlaces del CRM: " + error.message });
      } else {
        setToast({ type: "ok", msg: "Enlaces de los formularios CRM actualizados con éxito." });
      }
    } catch (err: any) {
      setToast({ type: "err", msg: "Error: " + (err?.message || "Ocurrió un problema inesperado") });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("¿Seguro que deseas restablecer los enlaces de los formularios a sus valores por defecto?")) {
      setForms(DEFAULT_CRM_FORMS);
      setToast({ type: "ok", msg: "Enlaces restablecidos a los valores por defecto. Haz clic en 'Guardar Cambios' para aplicar." });
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Cargando configuración del CRM…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFFF33]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFF33] text-slate-950 font-bold text-xs rounded-full mb-3">
            <LinkIcon className="w-3.5 h-3.5" />
            Integración CRM
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            Gestión de Enlaces de Formularios CRM
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Acá podés actualizar fácilmente las URLs de los formularios del CRM que se muestran en el sitio web. Modificá el enlace del formulario que querás cambiar y guardá los cambios.
          </p>
        </div>
      </div>

      {/* Forms Editing Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">

        {/* Item 1: Venta / Alquiler */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Formulario Venta / Alquiler <span className="text-slate-400 font-normal">(/compra-y-venta)</span></span>
            <a href={forms.venta} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal">
              Probar enlace <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="url"
            value={forms.venta}
            onChange={(e) => setForms({ ...forms, venta: e.target.value })}
            placeholder="https://crm.elduenovende.com/widget/form/..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFFF33] focus:ring-2 focus:ring-[#FFFF33]/30 transition-all font-mono text-slate-800"
          />
        </div>

        {/* Item 2: Préstamos Hipotecarios */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Formulario Préstamos Hipotecarios <span className="text-slate-400 font-normal">(/prestamos)</span></span>
            <a href={forms.prestamos} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal">
              Probar enlace <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="url"
            value={forms.prestamos}
            onChange={(e) => setForms({ ...forms, prestamos: e.target.value })}
            placeholder="https://crm.elduenovende.com/widget/form/..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFFF33] focus:ring-2 focus:ring-[#FFFF33]/30 transition-all font-mono text-slate-800"
          />
        </div>

        {/* Item 3: Servicios de Arquitectura */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Formulario Servicios de Arquitectura <span className="text-slate-400 font-normal">(/arquitectura)</span></span>
            <a href={forms.arquitectura} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal">
              Probar enlace <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="url"
            value={forms.arquitectura}
            onChange={(e) => setForms({ ...forms, arquitectura: e.target.value })}
            placeholder="https://crm.elduenovende.com/widget/form/..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFFF33] focus:ring-2 focus:ring-[#FFFF33]/30 transition-all font-mono text-slate-800"
          />
        </div>

        {/* Item 4: Página de Contacto */}
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Formulario Página de Contacto <span className="text-slate-400 font-normal">(/contacto)</span></span>
            <a href={forms.contacto} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal">
              Probar enlace <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="url"
            value={forms.contacto}
            onChange={(e) => setForms({ ...forms, contacto: e.target.value })}
            placeholder="https://crm.elduenovende.com/widget/form/..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFFF33] focus:ring-2 focus:ring-[#FFFF33]/30 transition-all font-mono text-slate-800"
          />
        </div>

        {/* Item 5: Detalle de Propiedad */}
        <div className="space-y-2 pb-2">
          <label className="block text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>Formulario Detalle de Propiedad <span className="text-slate-400 font-normal">(/propiedades/[id])</span></span>
            <a href={forms.propiedad} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-normal">
              Probar enlace <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="url"
            value={forms.propiedad}
            onChange={(e) => setForms({ ...forms, propiedad: e.target.value })}
            placeholder="https://crm.elduenovende.com/widget/form/..."
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#FFFF33] focus:ring-2 focus:ring-[#FFFF33]/30 transition-all font-mono text-slate-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer enlaces por defecto
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-slate-950 text-[#FFFF33] font-bold text-sm hover:bg-slate-900 transition-colors shadow-lg shadow-slate-950/10 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Guardando cambios…" : "Guardar Cambios del CRM"}
          </button>
        </div>

      </div>
    </div>
  );
}
