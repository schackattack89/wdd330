import { renderListWithTemplate } from "./utils.mjs";
import { getData } from "./productData.mjs";

function productCardTemplate(product) {
    // <p class="product-card__price-discounted">$50.0<span class="discount-tag">75% OFF</span></p>
    return `
    <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img
            src="${product.Image}"
            alt="${product.NameWithoutBrand}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>       
            <p class="product-card__price">${product.FinalPrice}</p>
        </a>
    </li>`
}

export async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products 
    const data = await getData(category);
    console.log(data);
    
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, el, data);
}