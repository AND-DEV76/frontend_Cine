import { useQuery } from "@tanstack/react-query";
import { getGeneros } from "../api/generoApi";

export const useGeneros = () => {
  return useQuery({
    queryKey: ["generos"],
    queryFn: getGeneros,
  });
};