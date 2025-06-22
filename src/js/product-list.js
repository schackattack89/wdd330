import productList from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const sort = document.querySelector("#sort-list")

sort.addEventListener("change", () => {
    console.log("changed");
    
    let value = sort.value;
    productList(".product-list", category, value);
})

productList(".product-list", category, sort.value);