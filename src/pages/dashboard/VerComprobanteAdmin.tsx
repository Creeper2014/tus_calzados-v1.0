import { useState } from "react";
import { supabase } from "../../supabase/client";


interface VerComprobanteAdminProps {
  comprobantePath: string | null;
  /** Duración de la signed URL en segundos (opcional) */
  expiresIn?: number;
}

export const VerComprobanteAdmin = ({
  comprobantePath,
  expiresIn = 3600,
}: VerComprobanteAdminProps) => {
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewIsImage, setPreviewIsImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = async () => {
    if (!comprobantePath) {
      setError("No hay comprobante para este pedido.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.storage
        .from("comprobantes")
        .createSignedUrl(comprobantePath, expiresIn);

      if (error || !data) {
        console.error(error);
        setError("No se pudo generar el link del comprobante.");
        setLoading(false);
        return;
      }

      const url = data.signedUrl;

      // Intentamos deducir por la extensión si es imagen
      const extension = comprobantePath.split(".").pop()?.toLowerCase() ?? "";
      const isImage = ["png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(
        extension
      );

      if (isImage) {
        // abrir modal con preview
        setPreviewUrl(url);
        setPreviewIsImage(true);
      } else {
        // abrir en nueva pestaña (PDF u otro)
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al intentar ver el comprobante.");
    } finally {
      setLoading(false);
    }
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewIsImage(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={handleOpen}
          disabled={loading || !comprobantePath}
          className={`text-sm px-3 py-1 rounded ${
            comprobantePath
              ? "text-blue-600 hover:text-blue-800 underline"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Cargando..." : comprobantePath ? "Ver comprobante" : "Sin comprobante"}
        </button>
        {error && <p className="text-xs text-red-500 ml-2">{error}</p>}
      </div>

      {/* Modal simple para preview de imagen */}
      {previewUrl && previewIsImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-md p-4 max-w-[90%] max-h-[90%] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={closePreview}
                className="text-sm px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>

            <img
              src={previewUrl}
              alt="Comprobante"
              className="max-w-full max-h-[70vh] object-contain rounded-md border"
            />

            <div className="mt-3 flex gap-2">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Abrir en pestaña
              </a>
              <a
                href={previewUrl}
                download
                className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Descargar
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerComprobanteAdmin;
