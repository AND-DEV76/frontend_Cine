import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsuario } from "../api/usuarioApi";

export const useDeleteUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries(["usuarios"]);
    }
  });
};