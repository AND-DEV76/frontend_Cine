import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePelicula } from "../api/peliculasApi";

export const useDeletePelicula = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePelicula,
    onSuccess: () => {
      queryClient.invalidateQueries(["peliculas"]);
    },
  });
};