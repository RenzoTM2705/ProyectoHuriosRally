import { ButtonNormal } from "../components/ButtonNormal";
import { Input } from "../components/Input";

export function ResetPasswordChange() {
    return (
        <main className="flex flex-col justify-center items-center h-screen mx-3.5">
            <div className="flex flex-col items-center border-[var(--Primary_5)] gap-5 border-2 rounded-lg p-13 mx-3.5 py-13  sm:py-20 sm:px-17 ">
                <h1 className="text-3xl text-center">Cambiar contraseña</h1>
                <span className="text-center">Ingrese su nueva contraseña</span>
                <form className="flex flex-col justify-around gap-10 w-60 sm:w-80">
                    <Input label="Nueva contraseña" type="password" placeholder="********" minLength={8} />
                    <Input label="Repetir nueva contraseña" type="password" placeholder="********" minLength={8} />
                    <ButtonNormal defaultText="Cambiar contraseña"></ButtonNormal>
                </form>
            </div>
        </main>

    );
}