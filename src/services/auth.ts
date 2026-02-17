import { api } from "@/lib/api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgotPasswords", { email });
  return res.data;
};

export const verifyResetCode = async (resetCode: string) => {
  const res = await api.post("/auth/verifyResetCode", { resetCode });
  return res.data;
};

export const resetPassword = async (email: string, newPassword: string) => {
  const res = await api.put("/auth/resetPassword", {
    email,
    newPassword,
  });
  return res.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) => {
  const res = await api.put("/auth/changeMyPassword", data);
  return res.data;
};
