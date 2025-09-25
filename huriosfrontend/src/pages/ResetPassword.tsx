import React from "react";

/*
 ResetPassword.tsx
 - Página para resetear la contraseña
*/

export const ResetPassword: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>
      <form className="w-80 space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Enviar enlace
        </button>
      </form>
    </div>
  );
};