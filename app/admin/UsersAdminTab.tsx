"use client";

import React, { useState, useEffect } from "react";
import { listUsersAction, createUserAction, updateUserRoleAction, deleteUserAction, UserRole } from "@/app/actions/users";

function cx(...cn: Array<string | false | undefined>) {
  return cn.filter(Boolean).join(" ");
}

export default function UsersAdminTab({ setToast }: { setToast: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("editor");
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await listUsersAction();
    if (res.success && res.users) {
      setUsers(res.users);
    } else {
      setToast({ type: "err", msg: res.error || "No se pudieron cargar los usuarios." });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setToast({ type: "err", msg: "Email y contraseña requeridos." });
    if (password.length < 6) return setToast({ type: "err", msg: "La contraseña debe tener al menos 6 caracteres." });

    setSaving(true);
    const res = await createUserAction(email, password, role);
    if (res.success) {
      setToast({ type: "ok", msg: "Usuario creado correctamente." });
      setShowForm(false);
      setEmail("");
      setPassword("");
      setRole("editor");
      await fetchUsers();
    } else {
      setToast({ type: "err", msg: res.error });
    }
    setSaving(false);
  };

  const handleToggleRole = async (user: any) => {
    const nextRole: UserRole = user.role === "admin" ? "editor" : "admin";
    if (!confirm(`¿Estás seguro de cambiar el rol de ${user.email} a ${nextRole === "admin" ? "Administrador Total" : "Editor"}?`)) return;
    
    const res = await updateUserRoleAction(user.id, nextRole);
    if (res.success) {
      setToast({ type: "ok", msg: "Rol actualizado." });
      await fetchUsers();
    } else {
      setToast({ type: "err", msg: res.error });
    }
  };

  const handleDelete = async (user: any) => {
    if (!confirm(`¿Estás SEGURO de eliminar definitivamente al usuario ${user.email}? Esto no se puede deshacer.`)) return;
    
    const res = await deleteUserAction(user.id);
    if (res.success) {
      setToast({ type: "ok", msg: "Usuario eliminado." });
      await fetchUsers();
    } else {
      setToast({ type: "err", msg: res.error });
    }
  };

  if (showForm) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Nuevo Usuario</h2>
          <button onClick={() => setShowForm(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Volver</button>
        </div>
        <form onSubmit={handleCreate} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Contraseña Inicial</label>
            <input required type="text" minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Rol</label>
            <select value={role} onChange={e => setRole(e.target.value as UserRole)} className="w-full rounded-lg border border-slate-300 p-2 text-sm">
              <option value="editor">Editor (Puede crear y editar contenido)</option>
              <option value="admin">Administrador Total (Acceso completo)</option>
            </select>
          </div>
          <button type="submit" disabled={saving} className="w-full rounded-lg bg-[#ffe600] py-3 text-sm font-bold text-slate-900 transition hover:bg-[#ffff33] disabled:opacity-50 mt-4">
            {saving ? "Creando..." : "Crear Usuario"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-slate-900">Gestión de Usuarios</h2>
        <button
          onClick={() => setShowForm(true)}
          className="rounded-full bg-[#ffe600] px-5 py-2 font-bold text-slate-950 transition hover:bg-[#ffff33] text-sm"
        >
          + Nuevo Usuario
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-neutral-500 font-semibold">Cargando usuarios...</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500 font-semibold">No hay usuarios registrados.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {users.map(u => (
              <li key={u.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{u.email}</h3>
                  <p className="text-xs text-slate-500">Registrado el {new Date(u.created_at).toLocaleDateString('es-AR')}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cx("px-3 py-1 rounded-full text-xs font-bold", u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")}>
                    {u.role === "admin" ? "Admin Total" : "Editor"}
                  </span>
                  {u.email !== "elduenovende@mail.com" && (
                    <>
                      <button onClick={() => handleToggleRole(u)} className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200">
                        Cambiar rol
                      </button>
                      <button onClick={() => handleDelete(u)} className="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200">
                        Eliminar
                      </button>
                    </>
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
