// src/pages/VerifyEmail.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

/*
 Página para:
  - re-enviar código de verificación
  - ingresar el código recibido por email y validar
  - una vez verificado, redirigir al Login
*/

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const preEmail = searchParams.get("email") || ""; // si frontend recibió ?email=...
  const [email, setEmail] = useState(preEmail);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Reenviar código: POST /auth/send-verification-code
  const resend = async () => {
    setMsg(null);
    if (!email) { setMsg("Ingresa un correo primero"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth/send-verification-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || json.message || "Error al reenviar");
      setMsg("Código reenviado. Revisa tu correo (o consola si estás en dev).");
    } catch (err: any) {
      setMsg(err.message || "Error al reenviar código");
    } finally { setLoading(false); }
  };

  // Verificar código: POST /auth/verify-code
  const verify = async () => {
    setMsg(null);
    if (!email || !code) { setMsg("Completa email y código"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json.error || json.message || "Código inválido");
      }
      // éxito
      setMsg("Email verificado. Serás redirigido al login...");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err: any) {
      setMsg(err.message || "Error al verificar código");
    } finally { setLoading(false); }
  };

  // UI simple
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Verificar correo</h2>

        <label className="block text-sm mb-1">Correo</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)}
               className="w-full border p-2 rounded mb-3" placeholder="tu@mail.com" />

        <button onClick={resend} className="w-full bg-blue-600 text-white py-2 rounded mb-4" disabled={loading}>
          Reenviar código
        </button>

        <label className="block text-sm mb-1">Código (6 dígitos)</label>
        <input value={code} onChange={(e)=>setCode(e.target.value)}
               className="w-full border p-2 rounded mb-3" placeholder="123456" />

        <button onClick={verify} className="w-full bg-green-600 text-white py-2 rounded" disabled={loading}>
          Verificar código
        </button>

        {msg && <p className="mt-3 text-sm">{msg}</p>}

        <p className="mt-4 text-xs text-gray-500">Si no recibes el correo, revisa spam o usa "Reenviar código".</p>
      </div>
    </main>
  );
}

