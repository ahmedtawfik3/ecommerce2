import { api } from "@/lib/api";

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover?: string;
  images?: string[];
  ratingsAverage?: number;
};

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data.data as Product[];
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data as Product;
};

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.data as Product[];
}

export async function getProductsByCategory(categoryId: string) {
  const res = await fetch(`${BASE_URL}/products?category=${categoryId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data ?? []) as Product[];
}

export async function getProductsByBrand(brandId: string) {
  const res = await fetch(`${BASE_URL}/products?brand=${brandId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.data ?? []) as Product[];
}
