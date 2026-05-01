import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/roles`;

export const getRoles = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createRol = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateRol = async ({ id, data }) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteRol = async (id) => {
  await axios.delete(`${API}/${id}`);
};