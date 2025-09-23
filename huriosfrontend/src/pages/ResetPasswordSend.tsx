import { ButtonNormal } from "../components/ButtonNormal";
import { Input } from "../components/Input";

export function ResetPasswordSend() {
    return (
        <main className="flex flex-col justify-center items-center h-screen mx-3.5">
            <div className="flex flex-col items-center border-[var(--Primary_5)] gap-5 border-2 rounded-lg p-13 mx-3.5 py-13  sm:py-20 sm:px-17 ">
                <h1 className="text-3xl text-center">Olvidó su contraseña</h1>
                <span className="text-center">Ingrese el correo con el que se registró previamente</span>
                <form className="flex flex-col justify-around gap-5 w-60 sm:w-80">
                    <Input label="Correo" type="email" />
                    <ButtonNormal defaultText="Enviar correo de verificación"></ButtonNormal>
                    <a href="#" className="underline w-fit hover:text-[var(--Primary_4)]">Volver</a>
                </form>
            </div>
        </main>
    )
}