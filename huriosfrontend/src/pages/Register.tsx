// src/pages/Register.tsx
import React, { useState } from "react";
import { ButtonState } from "../components/ButtonState";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

/*
  Register.tsx
  - formulario de registro (nombre, correo, celular, clave)
  - al registrar exitosamente: redirige a /verify-email?email=<email>
  - llama al endpoint POST /auth/register en el backend
  - usa import.meta.env.VITE_API_URL si está definido, sino http://localhost:8080
*/

export function Register() {
  const navigate = useNavigate(); // hook para navegar programáticamente

  // campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [clave, setClave] = useState("");
  const [repetirClave, setRepetirClave] = useState("");

  // estados UI
  const [clicked, setClicked] = useState(false); // para ButtonState (animación)
  const [loading, setLoading] = useState(false);  // para bloquear UI mientras se hace la llamada
  const [error, setError] = useState<string | null>(null); // mostrar errores al usuario

  // validaciones locales
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const isPasswordMatch = clave.length >= 8 && clave === repetirClave;
  const isFormValid =
    nombre.trim() !== "" &&
    isEmailValid &&
    celular.trim() !== "" &&
    isPasswordMatch;

  // URL base del backend (usa variable de entorno si la defines)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // manejador del submit: hace POST /auth/register y redirige a verify-email
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // si el formulario no es válido, no intentar
    if (!isFormValid) {
      setError("Completa correctamente todos los campos.");
      return;
    }

    setLoading(true);
    setClicked(true); // activar animación del botón (si tu componente lo usa)

    try {
      // Preparar payload. Ajusta si tu backend espera más campos.
      const payload = {
        nombre,    // opcional, backend puede ignorarlo si no lo espera
        email: correo, // tu servicio usa 'email'
        password: clave,
        celular   // opcional
      };

      // petición al backend
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        // backend devolvió error HTTP
        const msg = body.error || body.message || "Error al registrar";
        setError(msg);
        setLoading(false);
        setClicked(false);
        return;
      }

      // respuesta OK -> redirigir al formulario de verificación
      // pasamos el email por query para autocompletar el campo en VerifyEmail
      navigate(`/verify-email?email=${encodeURIComponent(correo)}`);

    } catch (err: any) {
      // error de red u otro
      setError(err.message || "Error de conexión al registrar");
      setClicked(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen mx-3.5">
      <div className="flex flex-col items-center border-[var(--Primary_5)] border-2 rounded-lg p-13 w-full md:w-auto">
        <img src="/assets/imgs/logo.webp" className="h-44 w-[182px]" alt="Logo Hurios Rally" title="Logo Hurios Rally" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full md:w-xl mt-6">
          {/* Input para nombre */}
          <Input label="Nombre" type="text" onChange={(e) => setNombre(e.target.value)} />

          {/* Input para correo */}
          <Input label="Correo" type="email" onChange={(e) => setCorreo(e.target.value)} placeholder="ejemplo@gmail.com" />

          {/* Input para celular */}
          <Input label="Celular" type="tel" onChange={(e) => setCelular(e.target.value)} placeholder="987 654 321" />

          {/* Input para clave */}
          <Input label="Clave" type="password" onChange={(e) => setClave(e.target.value)} placeholder="********" minLength={8} />

          {/* Input para repetir clave */}
          <Input label="Repetir clave" type="password" onChange={(e) => setRepetirClave(e.target.value)} placeholder="********" minLength={8} />

          {/* Mostrar error si existe */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Botón de envío: ButtonState maneja estados visuales */}
          <ButtonState
            initialText="Registrar"
            successText="Registro exitoso"
            disabled={!isFormValid || loading}
            clicked={clicked}
          />
        </form>
      </div>
    </main>
  );
}
