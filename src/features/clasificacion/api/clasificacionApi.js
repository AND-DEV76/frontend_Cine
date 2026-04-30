import axios from "axios";

const URL = "http://localhost:8080/api/clasificaciones";

export const getClasificaciones = async () => {
  const res = await axios.get(URL);
  return res.data;
};

export const createClasificacion = async (data) => {
  const res = await axios.post(URL, data);
  return res.data;
};

export const updateClasificacion = async (id, data) => {
  const res = await axios.put(`${URL}/${id}`, data);
  return res.data;
};

export const deleteClasificacion = async (id) => {
  return await axios.delete(`${URL}/${id}`);
};