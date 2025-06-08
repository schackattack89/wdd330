import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// render cart items to the page
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  console.log("Cart items loaded:", cartItems);
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveListeners(); // Attach event listeners to new buttons
}

// render the total price of items in the cart
function renderCartTotal() {
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalElem = document.querySelector('.cart-total');
  let cart = getLocalStorage('so-cart') || [];
  if (cart.length === 0) {
    cartFooter.classList.add('hide');
    return;
  }
  const total = cart.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    let price = item.FinalPrice;
    if (typeof price === "string") {
      price = parseFloat(price.replace(/[^0-9.]/g, ""));
    }
    // Apply discount if it exists
    if (item.discount && typeof item.discount === "number") {
      price = price - (price * (item.discount / 100));
    }
    if (isNaN(price)) {
      console.warn("Invalid price found in item:", item);
      return sum;
    }
    return sum + (price * quantity);
  }, 0);
  cartFooter.classList.remove('hide');
  cartTotalElem.textContent = `Total: $${total.toFixed(2)}`;
}

// call this after cart items are loaded on page
document.addEventListener('DOMContentLoaded', () => {
  renderCartTotal();
});

// generate HTML template for a single cart item
function cartItemTemplate(item) {
  let price = `<p class="cart-card__price">$${item.FinalPrice}</p>`;
  if (item.discount > 0) {
    const discountedPrice = (item.FinalPrice - (item.FinalPrice * (item.discount / 100))).toFixed(2);
    price = `<s>$${item.FinalPrice}</s> $${discountedPrice} <span class="discount-tag">${item.discount}% OFF</span>`;
  }
  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      ${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color"}
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">${price}</p>
      <button class="remove-button" data-id="${item.Id}">Remove</button>
    </li>
  `;
}

// remove item from cart
function removeFromCart(itemId) {
  let cartItems = getLocalStorage("so-cart") || [];
  console.log("Removing item with Id:", itemId, "from cart", cartItems);
  cartItems = cartItems.filter(item => item.Id != itemId);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents(); // refresh the cart UI
}

// add click listeners to all "Remove" buttons
function addRemoveListeners() {
  const buttons = document.querySelectorAll(".remove-button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const itemId = e.target.getAttribute("data-id");
      console.log("Remove button clicked for itemId:", itemId);
      removeFromCart(itemId);
    });
  });
}

loadHeaderFooter();
renderCartContents();

// clear the cart for testing
// localStorage.removeItem('so-cart');