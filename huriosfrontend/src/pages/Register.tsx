import { ButtonState } from "../components/ButtonState";
import { Input } from "../components/Input";
import { useState } from "react";
import React from "react";

//Función register/página
export function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [celular, setCelular] = useState("");
    const [clave, setClave] = useState("");
    const [repetirClave, setRepetirClave] = useState("");
    const [clicked, setClicked] = useState(false);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    const isPasswordMatch = clave.length >= 8 && clave === repetirClave;
    const isFormValid =
        nombre.trim() !== "" &&
        isEmailValid &&
        celular.trim() !== "" &&
        isPasswordMatch;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            setClicked(true);
        }
    }
        return (
            <main className="flex flex-col justify-center items-center h-screen">

                <div className="flex flex-col items-center border-[var(--Primary_5)] border-2 rounded-lg p-13 mx-3.5 py-13  sm:py-20 sm:px-17 ">
                    <img src="/public/assets/imgs/logo.webp" className="h-44 w-[182px]" alt="Logo Hurios Rally E.I.R.L." title="Logo Hurios Rally E.I.R.L.">
                    </img>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-70 sm:w-80">
                        <Input label="Nombre" type="text" onChange={(e) => setNombre(e.target.value)} />

                        <Input label="Correo" type="email" onChange={(e) => setCorreo(e.target.value)} placeholder="ejemplo@gmail.com" />

                        <Input label="Celular" type="tel" onChange={(e) => setCelular(e.target.value)} placeholder="987 654 321" />

                        <Input label="Clave" type="password" onChange={(e) => setClave(e.target.value)} placeholder="********" minLength={8} />
                        
                        <Input label="Repetir clave" type="password" onChange={(e) => setRepetirClave(e.target.value)} placeholder="********" minLength={8} />

                        <ButtonState
                            initialText="Registrar"
                            successText="Registro exitoso"
                            disabled={!isFormValid}
                            clicked={clicked}
                        />
                        <a href="#" className="underline w-fit hover:text-[var(--Primary_4)]">Iniciar sesión</a>
                    </form>
                </div>
            </main>
        );
    }
