const baseURL = import.meta.env.VITE_SERVER_URL;

// async function convertToJson(res) {
//   if (res.ok) {
//     return res.json();
//   } else {
//     const errorBody = await res.text();
//     console.error("Server error response:", errorBody);
//     throw {
//       name: 'servicesError',
//       message: `Server responded with error: ${res.status} - ${errorBody}`
//     };
//   }
// }

// export async function getProductsByCategory(category) {
//   const response = await fetch(baseURL + `products/search/${category}`);
//   const data = await convertToJson(response);
//   return data.Result;
// }

// export async function findProductById(id) {
//   const response = await fetch(baseURL + `product/${id}`);
//   const product = await convertToJson(response);
//   return product.Result;
// }

// export async function checkout(payload) {
//   // Ensure cardNumber is a string
//   payload.cardNumber = String(payload.cardNumber);

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   };
//   return await fetch(baseURL + "checkout/", options).then(convertToJson);
// }

///// artworks

export async function findArtworkById(id) {
  const response = await fetch("/json/artGallery.json");
  const data = await response.json();
  return data.find(art => art.Id === id);
}