"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const BRAND_COLOR = "#ffe600";
const BRAND_HOVER = "#ffff33";

// Wrapper: solo pone la UI bajo Suspense (requerido por Next para useSearchParams)
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Cargando…</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}

// Contenido real que usa useSearchParams
function AdminLoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Forzar fondo claro en el body durante la carga de esta página
  useEffect(() => {
    document.body.classList.add("bg-white", "text-slate-900");
    document.body.classList.remove("bg-slate-950", "text-slate-100");
    return () => {
      document.body.classList.remove("bg-white", "text-slate-900");
      document.body.classList.add("bg-slate-950", "text-slate-100");
    };
  }, []);

  // Si ya hay sesión, entro directo al panel
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (data.session) router.replace(redirectTo);
    });
    return () => {
      mounted = false;
    };
  }, [redirectTo, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (error) {
      setErr(error.message || "No se pudo iniciar sesión.");
      return;
    }
    router.replace(redirectTo);
  }

  return (
    <>
      <Navbar />
      
      <main
        className="relative min-h-[calc(100vh-112px)] text-slate-900 flex items-center justify-center pt-28 pb-16 bg-white"
        aria-labelledby="login-title"
      >
        {/* Fondo con gradiente y malla sutil */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1200px 600px at 10% -10%, rgba(255,230,0,0.07), transparent 45%), radial-gradient(900px 500px at 100% 10%, rgba(255,230,0,0.05), transparent 40%), linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-10">
          <div className="grid w-full max-w-[1040px] grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            {/* Lado izquierdo */}
            <section className="relative hidden overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 p-10 shadow-lg backdrop-blur-sm lg:block">
              <div
                className="absolute -left-28 -top-28 h-72 w-72 rounded-full blur-3xl opacity-15"
                style={{ background: BRAND_COLOR }}
              />
              <div
                className="absolute -right-24 bottom-[-64px] h-72 w-72 rounded-full blur-3xl opacity-10"
                style={{ background: BRAND_COLOR }}
              />
              <header className="relative">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  title="Volver al sitio"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  Volver al sitio
                </Link>
                <h1 id="login-title" className="mt-5 text-4xl font-extrabold leading-tight text-slate-900">
                  Panel de Administración
                </h1>
                <span className="mt-4 block h-1 w-20 rounded-full" style={{ backgroundColor: BRAND_COLOR }} />
                <p className="mt-4 max-w-md text-slate-600">
                  Gestioná propiedades, fotos y publicaciones de forma simple y segura.
                </p>
              </header>

              <ul className="relative mt-10 space-y-3 text-[15px] text-slate-800">
                {[
                  "Acceso seguro para el equipo de El Dueño Vende.",
                  "Carga masiva de fotos con URLs públicas automáticas.",
                  "Publicar / ocultar con un click.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        d="M20 7 9 18l-5-5"
                        stroke="#b8a600"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <footer className="relative mt-10 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">
                <strong className="font-semibold text-slate-800">Tip:</strong> Si no recordás tu clave, pedí el
                restablecimiento al administrador.
              </footer>
            </section>

            {/* Lado derecho: formulario */}
            <section className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-full text-slate-950 font-black text-sm"
                    style={{ backgroundColor: BRAND_COLOR }}
                  >
                    ED
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-5 text-slate-900">El Dueño Vende</p>
                    <p className="text-xs leading-4 text-slate-500">Acceso interno</p>
                  </div>
                </div>

                <Link
                  href="/"
                  className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition-colors sm:block"
                >
                  Ir al sitio
                </Link>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900">Iniciar sesión</h2>
                <p className="mt-1 text-sm text-slate-500">Solo personal autorizado.</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <label className="block text-sm">
                  <span className="mb-2 block font-semibold text-slate-700">Email</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 opacity-60">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      autoComplete="username"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 text-slate-900 outline-none transition focus:border-[#ffe600] focus:ring-2 focus:ring-[#ffe600]/10"
                      placeholder="tu@email.com"
                    />
                  </div>
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block font-semibold text-slate-700">Contraseña</span>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 opacity-60">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <rect x="5" y="10" width="14" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </span>
                    <input
                      type={showPass ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-10 py-3 pr-11 text-slate-900 outline-none transition focus:border-[#ffe600] focus:ring-2 focus:ring-[#ffe600]/10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                      {showPass ? (
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" />
                          <path
                            d="M10.58 6.08A8.5 8.5 0 0 1 12 6c5 0 8.5 5 8.5 5s-.65.92-1.84 2.02M6.5 6.5C4.49 7.9 3 11 3 11s3.5 5 9 5c1.07 0 2.08-.2 3-.58"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      )}
                    </button>
                  </div>
                </label>

                {err && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full px-6 py-3 font-extrabold text-slate-950 transition-colors disabled:opacity-60 cursor-pointer shadow-md shadow-[#ffe600]/10 hover:shadow-[#ffe600]/25"
                  style={{ backgroundColor: BRAND_COLOR }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_HOVER)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR)}
                >
                  {loading ? "Ingresando…" : "Entrar"}
                </button>

                <p className="text-center text-xs text-slate-400">
                  ¿Olvidaste tu contraseña? Pedí el reseteo al administrador.
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>
      
      <Footer showCTA={false} />
    </>
  );
}
