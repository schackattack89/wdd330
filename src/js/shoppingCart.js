import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {
    const cartItems = getLocalStorage("so-cart");
    const outputElement = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputElement, cartItems);
    const total = calcListTotal(cartItems);
    displayCartTotal(total);
}

function cartItemTemplate(item) {
  console.log(item);
  
  let price = `<p class="cart-card__price">$${item.FinalPrice}</p>`;
  if (item.discount > 0) {
    const discountedPrice = (item.FinalPrice - (item.FinalPrice * (item.discount / 100))).toFixed(2);
    price = `<s>$${item.FinalPrice}</s> $${discountedPrice} <span class="discount-tag">${item.discount}% OFF</span>`;
  }
  return `
    <li class="cart-card divider" data-id="${item.Id}">
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      ${item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color"}
      <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
      <p class="cart-card__price">${price}</p>
      <button class="remove-button" data-id="${item.Id}">Remove</button>
    </li>
  `;
}

function displayCartTotal(total) {
    if (total > 0) {
        document.querySelector(".list-footer").classList.remove("hide");
        document.querySelector(".list-total").innerText += `$${total}`;
    } else {
        document.querySelector(".list-footer").classList.add("hide");
    }
}

function calcListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    const total = amounts.reduce((sum, item) => sum + item, 0)
    return total;
}