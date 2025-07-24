import { loadHeaderFooter, removeAllAlerts } from "./utils.mjs";
//import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
removeAllAlerts();

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
