import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/pelicula-genero`;

export const createPeliculaGenero = (data) => {
  return axios.post(API_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};