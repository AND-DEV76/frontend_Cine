import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/usuarios`;

export const getUsuarios = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createUsuario = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateUsuario = async ({ id, data }) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteUsuario = async (id) => {
  await axios.delete(`${API}/${id}`);
};