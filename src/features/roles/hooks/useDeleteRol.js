import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRol } from "../api/rolApi";

export const useDeleteRol = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteRol,
    onSuccess: () => qc.invalidateQueries(["roles"])
  });
};