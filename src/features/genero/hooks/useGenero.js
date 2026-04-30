import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGeneros,
  createGenero,
  updateGenero,
  deleteGenero,
} from "../api/generoApi";

export const useGeneros = () => {
  return useQuery({
    queryKey: ["generos"],
    queryFn: getGeneros,
  });
};

export const useCreateGenero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createGenero,
    onSuccess: () => qc.invalidateQueries(["generos"]),
  });
};

export const useUpdateGenero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateGenero(id, data),
    onSuccess: () => qc.invalidateQueries(["generos"]),
  });
};

export const useDeleteGenero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteGenero,
    onSuccess: () => qc.invalidateQueries(["generos"]),
  });
};