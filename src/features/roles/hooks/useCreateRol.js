import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRol } from "../api/rolApi";

export const useCreateRol = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRol,
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
    }
  });
};