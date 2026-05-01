import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/generos`;

export const getGeneros = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};