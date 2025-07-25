import { loadHeaderFooter, removeAllAlerts } from "./utils.mjs";
import { initLoginModal } from './login.js';
//import checkoutProcess from "./checkoutProcess.mjs";

window.addEventListener('DOMContentLoaded', async () => {
  await loadHeaderFooter();
  removeAllAlerts();
  initLoginModal();
});


document.addEventListener("DOMContentLoaded", () => {
  const artwork = JSON.parse(localStorage.getItem("checkoutArtwork"));

  if (!artwork) {
    document.querySelector(".checkout-form").innerHTML = `
      <h2>No artwork selected</h2>
      <p>Please go back and select a print or original before checking out.</p>
    `;
    return;
  }

  // Display order summary
    const formatCurrency = (num) => `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    // document.getElementById("num-items").textContent = "1";
    // Get original price
    const originalPrice = parseFloat(artwork.selectedPrint.price.replace(/[^0-9.]/g, ""));
    // 20% weekend discount
    const discountRate = 0.20;
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    let discountAmount = 0;
    let discountedPrice = originalPrice;
    if (isWeekend) {
    discountAmount = originalPrice * discountRate;
    discountedPrice = originalPrice - discountAmount;
    document.getElementById("discount").textContent = `- ${formatCurrency(discountAmount)}`;
    } else {
    document.getElementById("discount").textContent = "- $0.00";
    }
    // Update cart total with discounted price
    document.getElementById("cartTotal").textContent = formatCurrency(discountedPrice);
    // Shipping is fixed
    document.getElementById("shipping").textContent = "$5.00";
    // Calculate tax on discounted price
    const tax = discountedPrice * 0.07;
    document.getElementById("tax").textContent = formatCurrency(tax);
    // Final total
    const total = discountedPrice + 5 + tax;
    document.getElementById("orderTotal").textContent = formatCurrency(total);

  // Display artwork
  const summarySection = document.querySelector(".checkout-summary");
  const artDiv = document.createElement("div");
  artDiv.innerHTML = `
    <div style="margin-bottom: 1em; text-align: center;">
      <img src="${artwork.image}" alt="${artwork.name}" style="margin-top: 20px; max-width: 400px; border: 4px solid black;" />
      <p><strong>${artwork.name}</strong><br>
      ${artwork.medium}, ${artwork.date}<br>
      Size: ${artwork.selectedPrint.size} - ${artwork.selectedPrint.price}</p>
    </div>
  `;
  summarySection.parentNode.insertBefore(artDiv, summarySection);
});

document.querySelector("form[name='checkout']").addEventListener("submit", function (e) {
  console.log("Checkout submitted. Redirecting to success page...");
  window.location.href = "/checkout/success.html";
});


// const artworkId = getParam("art");
// artworkDetails(artworkId);

// checkoutProcess.init("so-cart", ".checkout-summary");

// document
//   .querySelector("#zip")
//   .addEventListener(
//     "blur",
//     checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
//   );

// document.forms["checkout"].addEventListener("submit", (e) => {
//   e.preventDefault();
//   checkoutProcess.checkout(e.target);
// });

// const checkoutContainer = document.getElementById("checkout");
//     if (!artwork) {
//     checkoutContainer.innerHTML = "<p>No selection found. Please go back and choose a print.</p>";
//     return;
//     }
//     console.log(json);
//     try {
//       console.log("Final payload to server:", JSON.stringify(json, null, 2));
//       const res = await checkout(json);
//       console.log(res);
//       setLocalStorage("so-cart", []);
//       location.assign("/checkout/success.html");
//     } catch (err) {
//       // get rid of any preexisting alerts.
//       removeAllAlerts();
//       for (let message in err.message) {
//         alertMessage(err.message[message]);
//       }

//       console.log(err);
//     }
