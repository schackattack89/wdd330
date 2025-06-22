const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProductByCategory(category) {
  const url = `${baseURL}products/search/${category}`;
  console.log('Fetching:', url); // This should go to port 3000!
  const response = await fetch(url);
  const text = await response.text();
  console.log(text);
  // const data = await convertToJson(response);
  // return data.Result;
  try {
    const data = JSON.parse(text);
    return data.Result
  } catch (e) {
    throw new Error("Response is not valid JSON");
  }
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = await convertToJson(response);
  return product.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}