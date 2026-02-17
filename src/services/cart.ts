import { api } from "@/lib/api";

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data.data;
};

export const addToCart = async (productId: string) => {
  const res = await api.post("/cart", { productId });
  return res.data;
};

export const updateCartItem = async (productId: string, count: number) => {
  const res = await api.put(`/cart/${productId}`, { count });
  return res.data;
};

export const removeCartItem = async (productId: string) => {
  const res = await api.delete(`/cart/${productId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await api.delete("/cart");
  return res.data;
};
