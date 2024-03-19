import { menuArray } from "./data.js";
const menuItemsHtml = menuArray
  .map((item) => {
    return `<div class="item">
    <p class="item-icon">${item.emoji}</p>
    <div class="item-details">
      <h3 class="item-name">${item.name}</h3>
      <p class="item-description">${item.ingredients.join(", ")}</p>
      <p class="item-price">$${item.price}</p>
    </div>
    <button id="add-btn" class="add-btn" data-add="${item.name}">+</button>
    </div>
    `;
  })
  .join("");

document.getElementById("items-container").innerHTML = menuItemsHtml;

document.addEventListener("click", (e) => {
  if (e.target.id === "add-btn") {
    const clickedBtn = e.target.dataset.add;
    const item = menuArray.find((item) => item.name === clickedBtn);
    console.log(item);
  }
});
