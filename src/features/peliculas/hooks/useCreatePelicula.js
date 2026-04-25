import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPelicula } from "../api/peliculasApi";

export const useCreatePelicula = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPelicula,
    onSuccess: () => {
      queryClient.invalidateQueries(["peliculas"]);
    },
  });
};