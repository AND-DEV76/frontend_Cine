import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/compras";

export const procesarCompra = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const getMisBoletos = async (idUsuario) => {
  const res = await axios.get(`${API_URL}/usuario/${idUsuario}`);
  return res.data;
};

export const getMetodosPago = async () => {
  const res = await axios.get(import.meta.env.VITE_API_URL + "/metodos-pago");
  return res.data;
};
