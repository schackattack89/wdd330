import { setLocalStorage, getParam } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import productDetails from "./productDetails.mjs";

function addProductToCart(product) {
  // Ensure this is adding a product correctly to localStorage
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cart)); // Updates cart in localStorage
}

// Function to handle the "Add to Cart" button click
async function addToCartHandler(e) {
    e.preventDefault(); // Prevent the default action (like a page reload)

    // Fetch the product based on the data-id attribute
    const productId = e.target.dataset.id;
    const product = await findProductById(productId);  // Assuming this function exists

    if (product) {
        addProductToCart(product);  // Function to add the product to the cart
        alert("Product added to cart!");
    } else {
        console.error("Product not found!");
    }
}



// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

const productId = getParam("product");
console.log("Loaded productId:", productId);
productDetails(productId);

console.log(findProductById(productId));