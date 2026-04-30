import { useMutation } from "@tanstack/react-query";
import { createPeliculaGenero } from "../api/peliculaGeneroApi";

export const useCreatePeliculaGenero = () => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await createPeliculaGenero(data);
      return res.data; // 🔥 IMPORTANTE
    },
  });

  return {
    ...mutation,
    crearRelacionAsync: mutation.mutateAsync,
  };
};