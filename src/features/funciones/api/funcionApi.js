import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/funciones";

export const getFunciones = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getFuncionesPorPelicula = async (idPelicula) => {
  const res = await axios.get(`${API_URL}/pelicula/${idPelicula}`);
  return res.data;
};

export const createFuncion = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

export const deleteFuncion = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getEstadoAsientos = async (idFuncion) => {
  const res = await axios.get(`${API_URL}/${idFuncion}/asientos`);
  return res.data;
};
