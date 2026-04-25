import { useMutation } from "@tanstack/react-query";
import { createPeliculaGenero } from "../api/peliculaGeneroApi";

export const useCreatePeliculaGenero = () => {
  return useMutation({
    mutationFn: createPeliculaGenero,
  });
};