const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await res.json();
  return data.data;
}


export async function getCategoryById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${id}`);

    if (!res.ok) return null;

    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}
