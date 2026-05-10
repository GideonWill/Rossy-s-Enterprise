import { products as staticProducts } from "../data";

export const API_BASE_URL = "/api";

export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error("API returned " + res.status);
    const data = await res.json();
    // If the database is empty, fall back to static catalog
    if (!Array.isArray(data) || data.length === 0) return staticProducts;
    return data;
  } catch {
    // API unavailable — use the built-in static product catalog
    console.warn("API unavailable, using static product catalog");
    return staticProducts;
  }
}

export async function createOrder(orderData: any, token?: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error("Failed to create order");
  return res.json();
}
