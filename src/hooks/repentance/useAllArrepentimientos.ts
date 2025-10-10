import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase/client"; // si tenés un archivo types.ts, o podés copiar el tipo acá
import type { ArrepentimientoForm } from "../../interfaces";

export const useAllArrepentimientos = () => {
  return useQuery({
    queryKey: ["arrepentimientos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("arrepentimientos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as unknown as ArrepentimientoForm[];
    },
  });
};
