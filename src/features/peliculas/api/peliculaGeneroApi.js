import axios from "axios";

const API_URL = "http://localhost:8080/api/pelicula-genero";

export const createPeliculaGenero = (data) => {
  return axios.post(API_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};