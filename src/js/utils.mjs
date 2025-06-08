// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return Array.isArray(data) ? data : data ? [data] : [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, FileList, position="afterbegin", clear=true) {
  const htmlStrings = FileList.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  
  if (clear) {
    parentElement.innerHTML = "";
  }
  
  const htmlString = await templateFn(data)
  parentElement.insertAdjacentHTML(position, htmlString);
  
  if (callback) {
    callback(data);
  }
}

export function loadTemplate(path) {
  return async function() {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  }
}

export async function loadHeaderFooter() {
  let headerTempFn = loadTemplate("/partials/header.html");
  let footerTempFn = loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("header");
  const footerElement = document.querySelector("footer");
  renderWithTemplate(headerTempFn, headerElement);
  renderWithTemplate(footerTempFn, footerElement);
}