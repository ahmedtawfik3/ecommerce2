const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export async function getBrands() {
  try {
    const res = await fetch(`${BASE_URL}/brands`);
    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export async function getBrandById(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/brands/${id}`);
    if (!res.ok) return null;

    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}
