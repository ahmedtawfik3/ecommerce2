import { api } from "@/lib/api";

export const getAddresses = async () => {
  const res = await api.get("/api/v1/addresses");
  return res.data;
};

export const addAddress = async (data: any) => {
  const res = await api.post("/api/v1/addresses", data);
  return res.data;
};

export const deleteAddress = async (id: string) => {
  const res = await api.delete(`/api/v1/addresses/${id}`);
  return res.data;
};
