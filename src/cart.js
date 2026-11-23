const STORAGE_KEY = "fieldnotes-cart-v1";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

let items = readCart();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // The cart remains usable for this visit when storage is unavailable.
  }
}

export function getCart() {
  return [...items];
}

export function getCartCount() {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function addToCart(productId) {
  const existing = items.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else items.push({ id: productId, quantity: 1 });
  persist();
}

export function updateQuantity(productId, quantity) {
  if (!Number.isInteger(quantity) || quantity < 1) return;
  const item = items.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity = quantity;
  persist();
}

export function removeFromCart(productId) {
  items = items.filter((item) => item.id !== productId);
  persist();
}
