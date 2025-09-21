import React from "react";

//Propiedades de los inputs
type InputProps = {
    label: string;
    type: string;
    placeholder?: string;
    minLength?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
//Función input/componente
export function Input({ label, type, placeholder, minLength, onChange }: InputProps) {
    //Asignar el id del label al input
    const id = label.toLowerCase().replace(/\s+/g, '-');
    return (
        //Estructura del input
        <div className="flex flex-col">
            <label htmlFor={id} className="text-lg">{label}</label>
            <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            minLength={minLength} 
            onChange={onChange}
            required 
            className="border-black border-2 rounded-lg outline-none px-2.5 py-[3px]" ></input>
        </div>
    )
}