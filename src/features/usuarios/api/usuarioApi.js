import axios from "axios";

const API = "http://localhost:8080/api/usuarios";

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