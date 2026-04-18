import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsuario } from "../api/usuarioApi";

export const useCreateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUsuario,
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries(["usuarios"]);
      context?.onSuccess?.();
    },
    onError: (err) => {
      console.error(err);
      alert("Error al crear usuario");
    }
  });
};