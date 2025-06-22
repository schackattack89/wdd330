import { setLocalStorage, getLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

function sanitizeCart(cart) {
  // remove any invalid or junk items like {isTrusted: true}
  return cart.filter(item => item && typeof item === "object" && "Id" in item);
}

function addProductToCart(product) {
  if (!product || typeof product !== "object" || !product.Id) {
    console.warn("Invalid product passed to addProductToCart:", product);
    return;
  }
  console.log("addProductToCart called with:", product);
  
  let cart = getLocalStorage("so-cart") || [];
  cart = sanitizeCart(cart);  // clean cart to remove bad items

  const existingItem = cart.find(item => item.Id === product.Id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  e.preventDefault(); // prevent default button behavior, just in case
  const productId = e.target.dataset.id;
  if (!productId) {
    console.error("Add to cart clicked but no product id found");
    return;
  }
  const product = await findProductById(productId);
  if (!product || !product.Id) {
    console.error("Invalid product fetched", product);
    return;
  }
  addProductToCart(product);
}

loadHeaderFooter();

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

// load and render the product details on page load
const productId = getParam("product");
productDetails(productId);

console.log(findProductById(productId));
