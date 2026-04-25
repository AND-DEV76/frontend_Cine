import axios from "axios";

const API_URL = "http://localhost:8080/api/clasificaciones";

export const getClasificaciones = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};