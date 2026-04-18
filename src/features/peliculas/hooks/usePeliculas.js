import { useQuery } from "@tanstack/react-query";
import { getPeliculas } from "../api/peliculasApi";

export const usePeliculas = () => {
  return useQuery({
    queryKey: ["peliculas"],
    queryFn: getPeliculas,
  });
};