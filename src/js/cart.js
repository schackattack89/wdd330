import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Update the cart count displayed on the cart icon
function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

// Render Cart Contents on Cart Page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");

  // Update cart icon on cart page as well (in case it's on the same page)
  updateCartCount();
}

// Cart item template for displaying on cart page
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

// Add Product to Cart (Store in LocalStorage)
function addProductToCart(product) {
  // Ensure this is adding a product correctly to localStorage
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cart)); // Updates cart in localStorage
}

// Event Handler for Adding Product to Cart
async function addToCartHandler(e) {
  e.preventDefault(); // Prevent default action to avoid page reload

  const product = await findProductById(e.target.dataset.id); // Get product details by ID
  if (product) {
    addProductToCart(product); // Add product to cart
    alert("Product added to cart!"); // Optional: Provide feedback to the user
  } else {
    console.error("Product not found!");
  }
}

// Adding Event Listener for Add to Cart Button on Product Page
function addAddToCartEventListener() {
  const addToCartButton = document.getElementById("addToCart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", addToCartHandler);
  }
}

// Fetch Product Data by ID (example function, you may already have this)
async function findProductById(productId) {
  // Replace with actual logic for finding product by ID
  // Example placeholder:
  return {
    Image: "path/to/image.jpg",
    Name: "Sample Product",
    Colors: [{ ColorName: "Red" }],
    FinalPrice: 99.99
  };
}

// Initialize Cart Page (Render Cart Contents)
function initCartPage() {
  renderCartContents();
}

// Call `initCartPage` to render cart when on the cart page
if (window.location.pathname.includes("cart")) {
  initCartPage();
} else {
  // Update cart count on home page (or other pages where cart icon appears)
  updateCartCount();
  addAddToCartEventListener(); // Add event listeners to Add to Cart buttons
}
