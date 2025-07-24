import { loadHeaderFooter, getParam } from "./utils.mjs";
import loadAlerts from "./alerts.mjs";
import artworkDetails from "./artwork-details.mjs";

loadHeaderFooter();
loadAlerts();

const artworkId = getParam("art");
artworkDetails(artworkId);

function setupModal() {
  let modal = document.querySelector("#artworkModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "artworkModal";
    Object.assign(modal.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.8)",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    });

    modal.innerHTML = `
      <div style="
        color: white;
        padding: 20px; 
        max-width: 90vw; 
        max-height: 90vh; 
        overflow-y: auto; 
        position: relative;
        border: 1px solid white;
        animation-name: zoom;
        animation-duration: 0.6s;
        background-color: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(3px);
      ">
        <button id="modalCloseBtn" style="
          color: white;
          font-size: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
        ">✕</button>
        <img id="modalImg" src="" alt="" style="max-width: 100%; height: auto; display: block; margin-bottom: 1em; border: 5px solid black;" />
        <h2 id="modalTitle" style="color: white;"></h2>
        <p id="modalDetails"></p>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal on button click
    modal.querySelector("#modalCloseBtn").addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside modal content
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
}

function openModal(artwork) {
  const modal = document.querySelector("#artworkModal");
  if (!modal) return;

  modal.querySelector("#modalImg").src = artwork.src;
  modal.querySelector("#modalImg").alt = artwork.name;
  modal.querySelector("#modalTitle").textContent = artwork.name;
  modal.querySelector("#modalDetails").innerHTML = `
    <strong>Date:</strong> ${artwork.date}<br>
    <strong>Medium:</strong> ${artwork.medium}<br>
    <strong>Size:</strong> ${artwork.size}<br>
    ${artwork.description ? `<strong>Description:</strong> ${artwork.description}` : ""}
  `;

  modal.style.display = "flex";
}

async function loadAllArtworks() {
  try {
    const response = await fetch("/json/artworks.json");
    if (!response.ok) throw new Error("Unable to load artworks data.");

    const artworks = await response.json();

    const container = document.querySelector(".home-grid");
    if (!container) {
      console.error("No container to display artworks");
      return;
    }

    container.innerHTML = "";

    artworks.forEach((art) => {
      const div = document.createElement("div");
      div.classList.add("myImages");

      div.innerHTML = `
        <img class="myImages" src="${art.src}" alt="${art.name}" />
        <h2>${art.name}</h2>
        <h3>
          ...<br><br>
          ${art.date}<br>
          ${art.medium}<br>
          ${art.size}
        </h3>
      `;

      div.addEventListener("click", () => {
        openModal(art);
      });

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading artworks:", err);
  }
}

// Initialize modal and load artworks if no "art" param
document.addEventListener("DOMContentLoaded", () => {
  setupModal();

  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("art")) {
    loadAllArtworks();
  }
});
