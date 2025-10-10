import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabase/client";
import type { Database } from "../supabase/supabase";

// 🔹 Usamos el mismo tipo que definiste
type ArrepentimientoForm = {
  id?: number;
  nombre: string;
  email: string;
  pedido: string;
  alias: string;
  motivo?: string;
  created_at?: string;
  estado?: string;
};

export default function BotonArrepentimiento() {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors}
  } = useForm<ArrepentimientoForm>();



  const [enviado, setEnviado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ArrepentimientoForm) => {
    setLoading(true);
    setErrorMsg("");

  const insertData: Database['public']['Tables']['arrepentimientos']['Insert'] = {
  nombre: data.nombre,
  email: data.email,
  pedido: data.pedido,
  alias: data.alias,
  motivo: data.motivo,
  created_at: data.created_at,
  // no ponemos estado porque no existe en la tabla
};

const { error } = await supabase
  .from("arrepentimientos")
  .insert([insertData]);

  if (error) {
    console.error(error);
    setErrorMsg(`Hubo un problema al enviar la solicitud: ${error.message}`);
  } else {
    setEnviado(true);
    reset();
  }

  setLoading(false);
  };


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Botón de Arrepentimiento
      </h1>

      <p className="text-gray-600 text-sm mb-4 text-center">
        Tenés derecho a revocar tu compra dentro de los 10 días corridos desde la entrega,
        según la Ley 24.240 de Defensa del Consumidor.
      </p>

      {!enviado ? (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
              {...register("nombre", { required: "El nombre es obligatorio" })}
              placeholder="Nombre completo"
              required
              className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.nombre ? 'border-red-600' : ''}`}
            />
            {errors.nombre && <p className="text-red-600 text-sm">{errors.nombre.message}</p>}

          <input
            {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            type="email"
            placeholder="Correo electrónico"
            required
            className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 ${errors.nombre ? 'border-red-600' : ''}`}
          />

          <input
            {...register("pedido")}
            placeholder="ID o número de pedido"
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            {...register("alias")}
            placeholder="Alias o cuenta desde la que se realizó la transferencia"
            required
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 "
          />

          <textarea
            {...register("motivo")}
            placeholder="Motivo (opcional)"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 transition disabled:opacity-50"
           >
            {loading ? "Enviando..." : "Enviar solicitud"}
           </button>
           
        </form>
      ) : (
        <p className="text-green-700 text-center font-medium">
          ✅ Recibimos tu solicitud. Te contactaremos pronto por correo electrónico.
        </p>
      )}

      {errorMsg && (
        <p className="text-red-600 text-center mt-3">{errorMsg}</p>
      )}
    </div>
  );
}
