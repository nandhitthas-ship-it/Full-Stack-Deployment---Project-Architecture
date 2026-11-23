import { categories, formatPrice, getProduct, products } from "./products.js";
import {
  addToCart,
  getCart,
  getCartCount,
  removeFromCart,
  updateQuantity,
} from "./cart.js";

const app = document.querySelector("#app");
const cartCount = document.querySelector("#cart-count");
const toast = document.querySelector("#toast");
let activeCategory = "All";
let searchTerm = "";
let sortOrder = "featured";
let toastTimer;

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-image-link" href="#/product/${product.id}" aria-label="View ${product.name}">
        <div class="product-image-wrap">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <img
            src="${product.image}"
            alt="${product.name}"
            width="900"
            height="1080"
            loading="lazy"
            decoding="async"
          />
          <span class="image-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
      <div class="product-info">
        <div class="product-title-row">
          <a class="product-name" href="#/product/${product.id}">${product.name}</a>
          <span class="product-price">${formatPrice(product.price)}</span>
        </div>
        <div class="product-meta">
          <span>${product.color}</span>
          <span class="rating">★ ${product.rating} <span>(${product.reviews})</span></span>
        </div>
        <button class="quick-add" type="button" data-add="${product.id}">Add to bag <span>+</span></button>
      </div>
    </article>
  `;
}

function filteredProducts() {
  let visible = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const searchable = `${product.name} ${product.category} ${product.color}`.toLowerCase();
    return matchesCategory && searchable.includes(searchTerm.toLowerCase());
  });
  if (sortOrder === "price-low") visible = [...visible].sort((a, b) => a.price - b.price);
  if (sortOrder === "price-high") visible = [...visible].sort((a, b) => b.price - a.price);
  if (sortOrder === "rating") visible = [...visible].sort((a, b) => b.rating - a.rating);
  return visible;
}

function renderGrid() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const visible = filteredProducts();
  grid.innerHTML = visible.length
    ? visible.map(productCard).join("")
    : `<div class="empty-results"><span>Nothing on this trail yet.</span><p>Try a different search or category.</p></div>`;
  const resultCount = document.querySelector("#result-count");
  if (resultCount) resultCount.textContent = `${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`;
}

function renderHome() {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="eyebrow-dot"></span> A little more outside</span>
        <h1>Everyday,<br /><em>outside.</em></h1>
        <p>Thoughtful essentials for the big days, the small days, and all the good ones in between.</p>
        <a class="button button-dark" href="#/shop">Explore the collection <span>↗</span></a>
        <div class="hero-note"><span class="note-stars">★★★★★</span> <span>Loved by 2,000+ happy wanderers</span></div>
      </div>
      <div class="hero-visual">
        <img
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85"
          alt="A quiet mountain lake surrounded by pine trees"
          width="1400"
          height="1500"
          fetchpriority="high"
        />
        <div class="image-caption"><span>01 / 04</span><span>Take the scenic route</span></div>
        <div class="hero-sticker" aria-label="Made to roam">
          <span>MADE TO</span><span>ROAM</span><span class="sticker-star">✳</span>
        </div>
      </div>
      <a class="scroll-cue" href="#collection"><span></span> Scroll to wander</a>
    </section>

    <section class="collection section-shell" id="collection">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Good gear, good days</span>
          <h2>Find your <em>everyday.</em></h2>
        </div>
        <p>Useful things with a little more thought in them.<br />Made to go wherever you do.</p>
      </div>
      <div class="shop-toolbar">
        <div class="category-list" role="group" aria-label="Filter by category">
          ${categories
            .map(
              (category) =>
                `<button class="category-chip ${activeCategory === category ? "is-active" : ""}" type="button" data-category="${category}">${category}</button>`,
            )
            .join("")}
        </div>
        <div class="toolbar-controls">
          <label class="search-field">
            <span class="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input id="product-search" type="search" placeholder="Find your thing" value="${searchTerm.replaceAll('"', "&quot;")}" />
          </label>
          <label class="sort-field">
            <span class="sr-only">Sort products</span>
            <select id="sort-products" aria-label="Sort products">
              <option value="featured" ${sortOrder === "featured" ? "selected" : ""}>Featured</option>
              <option value="price-low" ${sortOrder === "price-low" ? "selected" : ""}>Price: low to high</option>
              <option value="price-high" ${sortOrder === "price-high" ? "selected" : ""}>Price: high to low</option>
              <option value="rating" ${sortOrder === "rating" ? "selected" : ""}>Top rated</option>
            </select>
          </label>
        </div>
      </div>
      <div class="result-line"><span id="result-count"></span><span>Made for the long way around</span></div>
      <div class="product-grid" id="product-grid"></div>
    </section>

    <section class="manifesto">
      <div class="manifesto-image">
        <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" alt="Golden light over a winding open road" width="1200" height="800" loading="lazy" />
      </div>
      <div class="manifesto-copy">
        <span class="eyebrow">A note from the trail</span>
        <h2>Less stuff.<br /><em>More stories.</em></h2>
        <p>We believe the best things aren't things at all. They're slow mornings, wrong turns, and the people you bring along. We just make the gear that gets you there.</p>
        <a class="text-link" href="#/about">A little more about us <span>↗</span></a>
        <span class="manifesto-doodle" aria-hidden="true">✳</span>
      </div>
    </section>

    <section class="newsletter section-shell">
      <span class="eyebrow">Postcards, not spam</span>
      <h2>A little fresh air<br />in your <em>inbox.</em></h2>
      <p>Field notes, new things, and the occasional good excuse to get outside.</p>
      <form class="newsletter-form" id="newsletter-form">
        <label class="sr-only" for="newsletter-email">Your email address</label>
        <input id="newsletter-email" type="email" placeholder="Your email address" required />
        <button type="submit" aria-label="Subscribe">Count me in <span>↗</span></button>
      </form>
      <span class="newsletter-footnote">The good stuff only. Unsubscribe whenever.</span>
    </section>
  `;
  renderGrid();
}

function renderShop() {
  activeCategory = "All";
  renderHome();
  setTimeout(() => document.querySelector("#collection")?.scrollIntoView(), 0);
}

function renderProduct(id) {
  const product = getProduct(id);
  if (!product) {
    renderNotFound();
    return;
  }
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);
  app.innerHTML = `
    <section class="product-detail section-shell">
      <div class="breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/shop">${product.category}</a><span>/</span><span>${product.name}</span></div>
      <div class="detail-layout">
        <div class="detail-image"><img src="${product.image.replace("w=900", "w=1200")}" alt="${product.name}" width="1200" height="1440" fetchpriority="high" /></div>
        <div class="detail-copy">
          <span class="eyebrow">${product.category} / Fieldnotes essentials</span>
          <h1>${product.name}</h1>
          <div class="detail-rating"><span>★ ${product.rating}</span> <span>${product.reviews} thoughtful reviews</span></div>
          <div class="detail-price">${formatPrice(product.price)} ${product.compareAt ? `<del>${formatPrice(product.compareAt)}</del>` : ""}</div>
          <p>${product.description}</p>
          <span class="detail-color-label">Color <strong>${product.color.split(" / ")[0]}</strong></span>
          <div class="swatches" aria-label="Available colors"><span class="swatch swatch-moss" title="Moss"></span><span class="swatch swatch-clay" title="Clay"></span><span class="swatch swatch-oat" title="Oat"></span></div>
          <button class="button button-dark detail-add" type="button" data-add="${product.id}">Add to bag — ${formatPrice(product.price)} <span>↗</span></button>
          <div class="shipping-note"><span>✳</span><span>Free shipping over $75<br /><small>Easy, no-fuss returns within 30 days.</small></span></div>
          <div class="detail-perks"><span>◷ Built to last</span><span>♧ Thoughtful materials</span></div>
        </div>
      </div>
    </section>
    <section class="related-products section-shell"><div class="section-heading"><div><span class="eyebrow">Keep wandering</span><h2>You might also <em>like.</em></h2></div><a class="text-link" href="#/shop">Shop everything <span>↗</span></a></div><div class="product-grid">${related.map(productCard).join("")}</div></section>
  `;
}

function renderCart() {
  const cartItems = getCart()
    .map((item) => ({ ...item, product: getProduct(item.id) }))
    .filter((item) => item.product);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  app.innerHTML = `
    <section class="cart-page section-shell">
      <div class="breadcrumb"><a href="#/">Home</a><span>/</span><span>Your bag</span></div>
      <div class="cart-heading"><div><span class="eyebrow">The good stuff</span><h1>Your <em>bag.</em></h1></div><span>${getCartCount()} ${getCartCount() === 1 ? "item" : "items"}</span></div>
      ${
        cartItems.length
          ? `<div class="cart-layout">
            <div class="cart-items">${cartItems
              .map(
                ({ product, quantity }) => `
                  <article class="cart-item">
                    <a href="#/product/${product.id}" class="cart-thumb"><img src="${product.image.replace("w=900", "w=360")}" alt="${product.name}" width="360" height="432" /></a>
                    <div class="cart-item-copy"><a class="product-name" href="#/product/${product.id}">${product.name}</a><span>${product.color}</span><div class="quantity-control"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button><span>${quantity}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Increase ${product.name} quantity">+</button></div></div>
                    <div class="cart-item-end"><strong>${formatPrice(product.price * quantity)}</strong><button class="remove-item" data-remove="${product.id}" type="button">Remove</button></div>
                  </article>`,
              )
              .join("")}</div>
            <aside class="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div><div><span>Shipping</span><span>${subtotal >= 75 ? "On us" : "Calculated at checkout"}</span></div><div class="summary-total"><span>Total</span><strong>${formatPrice(subtotal)}</strong></div><button class="button button-dark checkout-button" type="button" data-checkout>Continue to checkout <span>↗</span></button><p>Checkout is a demo for this capstone storefront.</p><a class="text-link" href="#/shop">Keep exploring <span>↗</span></a></aside>
          </div>`
          : `<div class="empty-cart"><span class="empty-cart-icon">✳</span><h2>It's a little quiet in here.</h2><p>Your next favorite thing is just around the bend.</p><a class="button button-dark" href="#/shop">Explore the collection <span>↗</span></a></div>`
      }
    </section>
  `;
}

function renderAbout() {
  app.innerHTML = `
    <section class="about-page section-shell">
      <span class="eyebrow">A note from the trail</span>
      <h1>Less stuff.<br /><em>More stories.</em></h1>
      <p class="about-lede">Fieldnotes started with a simple thought: what if the everyday things we carry helped us make more of the days we remember?</p>
      <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85" alt="A mountain lake at the edge of a forest" width="1600" height="900" />
      <div class="about-columns"><div><span class="eyebrow">Our point of view</span><h2>Go a little<br /><em>further.</em></h2></div><p>We make useful, considered essentials for the people who find their best ideas outside. Pieces that earn their place, last a long time, and make getting out the door feel easy.<br /><br />Small details matter. So does a lighter footprint. We choose durable materials, thoughtful partners, and timeless design over more-for-the-sake-of-more. Good gear should make room for a good day — and then get out of the way.</p></div>
      <a class="button button-dark" href="#/shop">Find your everyday <span>↗</span></a>
    </section>
  `;
}

function renderNotFound() {
  app.innerHTML = `<section class="not-found section-shell"><span class="eyebrow">Wrong turn?</span><h1>This trail ends <em>here.</em></h1><p>We couldn't find that page, but there's plenty more to explore.</p><a class="button button-dark" href="#/">Back to the shop <span>↗</span></a></section>`;
}

function updateCartBadge() {
  cartCount.textContent = getCartCount();
  cartCount.classList.toggle("has-items", getCartCount() > 0);
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function renderRoute() {
  const route = window.location.hash.slice(1) || "/";
  const productMatch = route.match(/^\/product\/([^/]+)$/);
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("is-current", route === "/" || route === "/shop" ? link.dataset.nav === "shop" : route === "/about" && link.dataset.nav === "story");
  });
  if (route === "/" || route === "/shop") renderHome();
  else if (productMatch) renderProduct(decodeURIComponent(productMatch[1]));
  else if (route === "/cart") renderCart();
  else if (route === "/about") renderAbout();
  else renderNotFound();
  updateCartBadge();
}

app.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    addToCart(addButton.dataset.add);
    updateCartBadge();
    notify(`${getProduct(addButton.dataset.add)?.name || "Item"} added to your bag`);
    return;
  }

  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category;
    document.querySelectorAll(".category-chip").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.category === activeCategory);
    });
    renderGrid();
    return;
  }

  const quantityButton = event.target.closest("[data-quantity]");
  if (quantityButton) {
    const item = getCart().find((entry) => entry.id === quantityButton.dataset.quantity);
    if (item) {
      const quantity = item.quantity + Number(quantityButton.dataset.change);
      if (quantity < 1) removeFromCart(item.id);
      else updateQuantity(item.id, quantity);
      renderCart();
      updateCartBadge();
    }
    return;
  }

  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.remove);
    renderCart();
    updateCartBadge();
    notify("Item removed from your bag");
    return;
  }

  if (event.target.closest("[data-checkout]")) {
    notify("Thanks for exploring — checkout is a demo.");
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "product-search") {
    searchTerm = event.target.value;
    renderGrid();
  }
});

app.addEventListener("change", (event) => {
  if (event.target.id === "sort-products") {
    sortOrder = event.target.value;
    renderGrid();
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.id === "newsletter-form") {
    event.preventDefault();
    notify("You're on the list. See you out there!");
    event.target.reset();
  }
});

window.addEventListener("hashchange", renderRoute);
renderRoute();
