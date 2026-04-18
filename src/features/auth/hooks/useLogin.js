import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/authApi";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
    }
  });
};