import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePelicula } from "../api/peliculasApi";

export const useUpdatePelicula = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updatePelicula(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["peliculas"]);
    },
  });
};