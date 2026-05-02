import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSalas, createSala, deleteSala } from "../api/salaApi";

export const useSalas = () => {
  return useQuery({
    queryKey: ["salas"],
    queryFn: getSalas,
  });
};

export const useCreateSala = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSala,
    onSuccess: () => {
      queryClient.invalidateQueries(["salas"]);
    },
  });
};

export const useDeleteSala = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSala,
    onSuccess: () => {
      queryClient.invalidateQueries(["salas"]);
    },
  });
};