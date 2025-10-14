import { useState } from "react";
import { supabase } from "../supabase/client";

interface SubirComprobanteProps {
  orderId: number;
  userId: string;
  comprobantePath: string | null;
  status: string;
}

export const SubirComprobante = ({
  orderId,
  userId,
  comprobantePath,
  status,
}: SubirComprobanteProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Seleccioná un archivo");

    setUploading(true);

    try {
      const path = `user-${userId}/order-${orderId}/${Date.now()}-${file.name}`;

      // Subir archivo al bucket privado
      const { error: uploadError } = await supabase
        .storage.from("comprobantes")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Guardar la ruta en la tabla orders
      const { error: dbError } = await supabase
        .from("orders")
        .update({ comprobante_path: path })
        .eq("id", orderId);

      if (dbError) throw dbError;

      alert("Comprobante subido correctamente ✅");
      window.location.reload(); // recargar para mostrar el comprobante
    } catch (err) {
      console.error(err);
      alert("Error al subir el comprobante");
    } finally {
      setUploading(false);
    }
  };

  

  const handleVerComprobante = async () => {
    if (!comprobantePath) return;

    const { data, error } = await supabase.storage
      .from("comprobantes")
      .createSignedUrl(comprobantePath, 300); // URL válida 5 minutos

    if (error) {
      console.error(error);
      alert("No se pudo generar la URL del comprobante");
    } else {
      window.open(data.signedUrl, "_blank");
    }
  };

  // Si el pedido no está pendiente
  if (status !== "Pending") {
    return comprobantePath ? (
      <button
        onClick={handleVerComprobante}
        className="text-blue-500 underline text-sm mt-3"
      >
        Ver comprobante
      </button>
    ) : (
      <p className="mt-3 text-green-600 font-medium text-sm">Pago confirmado ✅</p>
    );
  }

  // Pedido pendiente: formulario compacto
  return (
    <div className="border border-stone-300 rounded-lg p-4 flex flex-col md:flex-row items-center gap-3 w-full max-w-md mt-5">
      {comprobantePath && (
        <button
          onClick={handleVerComprobante}
          className="text-blue-500 underline text-sm"
        >
          Ver comprobante
        </button>
      )}

      <label className="cursor-pointer bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition text-sm">
        Seleccionar
        <input
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </label>

      {file && <p className="text-xs text-gray-600 truncate max-w-[100px]">{file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
      >
        {uploading ? "Subiendo..." : "Subir"}
      </button>
    </div>
  );
};
