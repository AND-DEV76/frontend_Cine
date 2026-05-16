import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/reservas";

export const reservarAsientos = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const liberarAsientos = async (data) => {
  const res = await axios.post(`${API_URL}/liberar`, data);
  return res.data;
};
