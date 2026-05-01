import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/clasificaciones`;

export const getClasificaciones = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};