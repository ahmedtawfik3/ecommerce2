import { api } from "@/lib/api";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};
const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.data;
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/products?category=${categoryId}`
    );

    if (!res.ok) {
      console.error("Failed to fetch products");
      return [];
    }

    const data = await res.json();
    return data.data ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}




export async function getProductsByBrand(brandId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/products?brand=${brandId}`
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

