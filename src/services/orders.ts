import { api } from "@/lib/api";

export const getOrders = async () => {
  const res = await api.get("/api/v1/orders");
  return res.data;
};

export const getUserOrders = async (userId: string) => {
  const res = await api.get(`/api/v1/orders/user/${userId}`);
  return res.data;
};

export const checkoutCashOrder = async (
  cartId: string,
  shippingAddress: any
) => {
  const res = await api.post(`/api/v2/orders/${cartId}`, { shippingAddress });
  return res.data;
};

export const checkoutOnline = async (
  cartId: string,
  shippingAddress: any,
  redirectUrl: string
) => {
  const res = await api.post(
    `/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`,
    { shippingAddress }
  );
  return res.data;
};
