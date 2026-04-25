import axios from "axios";

const API_URL = "http://localhost:8080/api/peliculas";

export const getPeliculas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPelicula = (data) =>
  axios.post(API_URL, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updatePelicula = (id, data) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deletePelicula = (id) =>
  axios.delete(`${API_URL}/${id}`);