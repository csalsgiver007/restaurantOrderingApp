import { menuArray } from "./data.js";
let cart = [];
let cartIDnum = 0;
const menuItemsHtml = menuArray
  .map((item) => {
    return `<div class="item">
    <p class="item-icon">${item.emoji}</p>
    <div class="item-details">
      <h3 class="item-name">${item.name}</h3>
      <p class="item-description">${item.ingredients.join(", ")}</p>
      <p class="item-price">$${item.price}</p>
    </div>
    <button id="add-btn" class="add-btn" data-add="${item.id}">+</button>
    </div>
    `;
  })
  .join("");

document.getElementById("items-container").innerHTML = menuItemsHtml;

document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    const clickedBtn = e.target.dataset.add;
    const itemObj = menuArray.find((item) => item.id === Number(clickedBtn));
    addItemToCart(itemObj);
  } else if (e.target.dataset.remove) {
    const clickedRemoveBtn = e.target.dataset.remove;
    const item = cart.find((item) => item.cartID === Number(clickedRemoveBtn));
    removeItemFromCart(item);
  } else if (e.target.id === "btn-order") {
    console.log("Order button clicked");
    renderPaymentModal();
  } else if (e.target.id === "btn-pay") {
    e.preventDefault();
    console.log("Pay button clicked");
    const custName = document.getElementById("your-name").value;
    const cardNum = document.getElementById("your-card").value;
    const cvv = document.getElementById("cvv").value;
    renderOrderCompleteModal(custName, cardNum, cvv);
  }
});

function addItemToCart(item) {
  let addedItem = Object.assign({}, item);
  addedItem.cartID = cartIDnum;
  cart.push(addedItem);
  cartIDnum++;
  if (calculateTotal(cart)) {
    const total = calculateTotal(cart);
    renderCartSection(cart);
    renderTotalSection(total);
  }
}
function renderCartSection(cart) {
  document.getElementById("checkout-section").style.display = "block";
  const cartSection = document.getElementById("cart-section");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartSection.innerHTML = cart
    .map((item) => {
      return `<div class="item-order"><p class="cart-item-name">${item.name}</p>
    <button id="remove-btn" class="remove-btn" data-remove="${item.cartID}">Remove</button>
    <p class="cart-item-price">${item.price}</p></div>`;
    })
    .join("");
}
function removeItemFromCart(item) {
  const index = cart.indexOf(item);
  cart.splice(index, 1);
  renderCartSection(cart);
}

function calculateTotal(cart) {
  const total = cart.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  console.log(total);
  return total;
}
function renderTotalSection(total) {
  const btnOrderElement = document.getElementById("btn-order");
  const totalSection = document.getElementById("total-section");
  totalSection.innerHTML = `<p class="total-price">Totalprice:</p> <p class="total-dollars">$${total}</p>`;
}
function renderPaymentModal() {
  document.getElementById("payment-modal").style.display = "flex";
}
function renderOrderCompleteModal(custName, cardNum, cvv) {
  document.getElementById("checkout-section").style.display = "none";
  document.getElementById("total-section").style.display = "none";
  document.getElementById("payment-modal").style.display = "none";
  document.getElementById("order-complete").style.display = "block";
  document.getElementById(
    "order-complete"
  ).innerHTML = `<h2>Thanks, ${custName}! Your order is on its way!</h2>`;
}
