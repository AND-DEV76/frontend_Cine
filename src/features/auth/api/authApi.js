import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const loginRequest = async (data) => {
  const res = await axios.post(`${API_URL}/usuarios/login`, data);
  return res.data;
};

export const registerRequest = async (data) => {
  const res = await axios.post(`${API_URL}/usuarios`, data);
  return res.data;
};