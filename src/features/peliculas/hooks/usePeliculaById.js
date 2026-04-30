import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePeliculaById = (id) => {
  return useQuery({
    queryKey: ["pelicula", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8080/api/peliculas/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};