// src/pages/Login.tsx
import { Input } from "../components/Input";
import { ButtonState } from "../components/ButtonState";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { saveToken } from "../utils/token";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isFormValid) return;
    setClicked(true);
    try {
      const res = await loginUser({ email: correo, password: clave });
      // res: { token, email }
      saveToken(res.token);
      // redirigir a home
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setClicked(false);
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const isPasswordMatch = clave.length >= 8;
  const isFormValid = isEmailValid && isPasswordMatch;

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center border-[var(--Primary_5)]  mx-3.5 border-2 rounded-lg py-13 px-10 sm:py-20 sm:px-17 ">
        <img src="/assets/imgs/logo.webp" className="h-44 w-[182px]" alt="Logo" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:w-80 ">
          <Input label="Correo" type="email" placeholder="ejemplo@gmail.com" onChange={(e) => setCorreo(e.target.value)} />
          <Input label="Clave" type="password" placeholder="********" onChange={(e)=>setClave(e.target.value)} />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <ButtonState initialText="Ingresar" successText="Ingreso exitoso" disabled={!isFormValid} clicked={clicked} />
          <a href="/register" className="mt-2 w-full text-center bg-[var(--Primary_4)] text-white py-2 rounded hover:bg-[var(--Primary_5)] transition">Registrarse</a>
          <a href="/reset-password" className="underline w-fit mt-2 hover:text-[var(--Primary_4)]">¿Olvidó su contraseña?</a>
        </form>
      </div>
    </main>
  );
}
