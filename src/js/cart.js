import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  let price = `<p class="cart-card__price">$${item.FinalPrice}</p>`
  if (item.discount > 0)
  {
    price = `<s>${item.FinalPrice}</s> ${(item.FinalPrice - (item.FinalPrice * (item.discount / 100))).toFixed(2)} <span class="discount-tag">${item.discount}% OFF</span>`
  }

  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">${price}</p>
</li>`;

  return newItem;
}

renderCartContents();
