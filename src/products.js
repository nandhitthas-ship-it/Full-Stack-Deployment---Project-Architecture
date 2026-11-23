const image = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const products = [
  {
    id: "ridge-pack",
    name: "Ridge Daypack",
    category: "Bags",
    price: 88,
    compareAt: 110,
    rating: "4.9",
    reviews: 124,
    badge: "Bestseller",
    color: "Moss / 4 colors",
    image: image("photo-1553062407-98eeb64c6a62"),
    description:
      "A just-right, all-day pack with a considered place for everything. Made from recycled weather-resistant fabric and built to go wherever the day takes you.",
  },
  {
    id: "trail-bottle",
    name: "Trail Bottle",
    category: "Drinkware",
    price: 34,
    rating: "4.8",
    reviews: 86,
    badge: "New color",
    color: "Clay / 3 colors",
    image: image("photo-1602143407151-7111542de6e8"),
    description:
      "Cold stays cold, warm stays warm. This double-wall stainless bottle is easy to carry, easy to clean, and ready for the long way around.",
  },
  {
    id: "camp-mug",
    name: "Camp Mug Set",
    category: "Drinkware",
    price: 42,
    rating: "4.9",
    reviews: 58,
    badge: "",
    color: "Oat / Set of 2",
    image: image("photo-1514228742587-6b1558fcca3d"),
    description:
      "Your slow mornings, made a little better. A pair of lightweight enamel mugs with a durable finish and just the right amount of room for one more pour.",
  },
  {
    id: "weekender-tote",
    name: "Weekender Tote",
    category: "Bags",
    price: 64,
    rating: "4.7",
    reviews: 41,
    badge: "",
    color: "Natural / 2 colors",
    image: image("photo-1590874103328-eac38a683ce7"),
    description:
      "Room for the extras, without the extra fuss. A sturdy everyday carryall with an easy-to-reach pocket and comfortable, reinforced handles.",
  },
  {
    id: "sun-cap",
    name: "Everyday Sun Cap",
    category: "Apparel",
    price: 32,
    rating: "4.8",
    reviews: 73,
    badge: "",
    color: "Ochre / 4 colors",
    image: image("photo-1588850561407-ed78c282e89b"),
    description:
      "A little shade goes a long way. This soft, adjustable cap has a lived-in feel from day one and a low-key look that works just about anywhere.",
  },
  {
    id: "field-blanket",
    name: "Field Blanket",
    category: "Outdoor",
    price: 96,
    rating: "5.0",
    reviews: 32,
    badge: "Staff pick",
    color: "Dune / 2 colors",
    image: image("photo-1600210492486-724fe5c67fb0"),
    description:
      "Picnic, porch, or passenger seat: this generously sized blanket brings a little comfort wherever you land. Woven from soft recycled cotton.",
  },
  {
    id: "trail-sunglasses",
    name: "Trail Sunglasses",
    category: "Accessories",
    price: 58,
    rating: "4.6",
    reviews: 29,
    badge: "",
    color: "Tortoise / 3 colors",
    image: image("photo-1511499767150-a48a237f0083"),
    description:
      "Good-looking, hard-working shades with polarized lenses and 100% UV protection. Lightweight enough to forget you're wearing them.",
  },
  {
    id: "day-pouch",
    name: "Little Day Pouch",
    category: "Accessories",
    price: 28,
    rating: "4.9",
    reviews: 64,
    badge: "",
    color: "Forest / 3 colors",
    image: image("photo-1544816155-12df9643f363"),
    description:
      "The little things, all in one place. A zip-top pouch sized for your daily essentials, with a durable water-resistant lining.",
  },
];

export const categories = [
  "All",
  "Bags",
  "Drinkware",
  "Apparel",
  "Outdoor",
  "Accessories",
];

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
