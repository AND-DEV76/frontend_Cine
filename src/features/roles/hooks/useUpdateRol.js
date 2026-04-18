import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRol } from "../api/rolApi";

export const useUpdateRol = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateRol,
    onSuccess: () => qc.invalidateQueries(["roles"])
  });
};