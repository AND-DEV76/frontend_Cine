import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUsuario } from "../api/usuarioApi";

export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUsuario,
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries(["usuarios"]);
      context?.onSuccess?.();
    },
    onError: (err) => {
      console.error(err);
      alert("Error al actualizar usuario");
    }
  });
};