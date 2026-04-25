import { useQuery } from "@tanstack/react-query";
import { getClasificaciones } from "../api/clasificacionApi";

export const useClasificaciones = () => {
  return useQuery({
    queryKey: ["clasificaciones"],
    queryFn: getClasificaciones,
  });
};