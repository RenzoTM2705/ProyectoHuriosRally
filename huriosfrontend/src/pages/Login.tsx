import { Input } from "../components/Input"
import { ButtonState } from "../components/ButtonState"
import { useState } from "react"

//Función login/página
export function Login() {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [clicked, setClicked] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            setClicked(true);
        }
    }


    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    const isPasswordMatch = clave.length >= 8;
    const isFormValid =
        isEmailValid &&
        isPasswordMatch
    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col items-center border-[var(--Primary_5)]  mx-3.5 border-2 rounded-lg py-13 px-10 sm:py-20 sm:px-17 ">
                <img src="/public/assets/imgs/logo.webp" className="h-44 w-[182px]"></img>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:w-80 ">
                    <Input label="Correo" type="email" placeholder="ejemplo@gmail.com" onChange={(e) => setCorreo(e.target.value)} />
                    <Input label="Clave" type="password" placeholder="********" onChange={(e)=>setClave(e.target.value)} />
                    <ButtonState
                        initialText="Ingresar"
                        successText="Ingreso exitoso"
                        disabled={!isFormValid}
                        clicked={clicked} />
                        <a href="#" className="underline w-fit hover:text-[var(--Primary_4)] ">¿Olvidó su contraseña?</a>
                </form>
            </div>
        </main>
    )
}