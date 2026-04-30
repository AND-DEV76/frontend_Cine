import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClasificaciones,
  createClasificacion,
  updateClasificacion,
  deleteClasificacion,
} from "../api/clasificacionApi";

export const useClasificaciones = () => {
  return useQuery({
    queryKey: ["clasificaciones"],
    queryFn: getClasificaciones,
  });
};

export const useCreateClasificacion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createClasificacion,
    onSuccess: () => qc.invalidateQueries(["clasificaciones"]),
  });
};

export const useUpdateClasificacion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateClasificacion(id, data),
    onSuccess: () => qc.invalidateQueries(["clasificaciones"]),
  });
};

export const useDeleteClasificacion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteClasificacion,
    onSuccess: () => qc.invalidateQueries(["clasificaciones"]),
  });
};