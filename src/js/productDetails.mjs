import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart(product) {
  let cart = getLocalStorage("so-cart");
  cart.push(product);
  setLocalStorage("so-cart", cart);
  alert("Product successfully added to cart!");
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
  product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  
  //TODO: switch to using template literals instead of changing the inner html
  if (product.discount > 0) {
    document.querySelector("#productFinalPrice").innerHTML = `<s>${product.FinalPrice}</s> ${product.FinalPrice - (product.FinalPrice * (product.discount / 100))} <span class="discount-tag">${product.discount}% OFF</span>`;

  } else {
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice
  }

  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}