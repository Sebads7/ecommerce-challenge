export async function FetchCart() {
  const response = await fetch("/api/cart");
  if (!response.ok) {
    throw new Error("An error occurred while fetching the cart items");
  }
  const data = await response.json();
  return data;
}
