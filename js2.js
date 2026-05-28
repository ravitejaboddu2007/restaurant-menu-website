alert("WELCOME TO OUR SPICE GARDEN WEB PAGE");
const menu = [
  { id: "paneer", name: "Paneer Butter Masala", price: 250 },
  { id: "mushroom", name: "Mushroom 65", price: 150 },
  { id: "vegmanchuria", name: "Veg Manchuria", price: 150 },
  { id: "kajukadai", name: "Kaju Kadai", price: 280 },
  { id: "chillipaneer", name: "Chilli Paneer", price: 180 },
  { id: "paneertikka", name: "Paneer Tikka", price: 150 },
  { id: "chickenbiryani", name: "Chicken Biryani", price: 250 },
  { id: "chicken65", name: "Chicken 65", price: 180 },
  { id: "muttonbiryani", name: "Mutton Biryani", price: 350 },
  { id: "eggfriedrice", name: "Egg Fried Rice", price: 150 },
  { id: "chickenkabab", name: "Chicken Kababs", price: 200 },
  { id: "chickenlollipop", name: "Chicken Lollipop", price: 350 },
];
const container = document.querySelector(".listitems");
menu.forEach((item) => {
  container.innerHTML += `
    <div class="menu-item">
      <p><input type="checkbox" id="${item.id}" value="${item.name}" data-price="${item.price}">
      ${item.name} - ${item.price}Rs</p>

      <p>
        Quantity:
        <input type="number" id="${item.id}Qty" value="1" min="1" style="width:50px;">
      </p>
    </div>
  `;
});
function showMsg1() {
  let name = document.getElementById("username").value;
  if (name === "") {
    alert("Please enter your name");
    return;
  }
  let num = document.getElementById("num").value;
  if (num === "" || num.length !== 10 || isNaN(num)) {
    alert("Please enter a valid 10-digit number");
    return;
  }
  let { orderedItems, totalcost } = getCartData();
  if (orderedItems.length === 0) {
    alert("Please select at least one item");
    return;
  }
  let addr = document.getElementById("add").value;
  if (addr === "") {
    alert("Enter the address!");
    return;
  }

  let summary = document.getElementById("summary");
  summary.innerHTML = `
    <h3>Order Summary</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Phone:</b> ${num}</p>
    <p><b>Address:</b> ${addr}</p>
    <p><b>Items:</b> ${orderedItems.join(", ")}</p>
    <p><b>Total Cost:</b> ₹${totalcost}</p>
    <div id="summary-button">
    <button onclick="showMsg3()" style="background-color:#7fb77e;">Confirm</button>
     <button onclick="editOrder()" style="background-color:#d97b66;">Back</button>
  </div>`;
  summary.classList.add("show");
}
function showMsg2() {
  let msg = document.getElementById("message");

  document.getElementById("username").value = "";
  document.getElementById("num").value = "";
  document.getElementById("add").value = "";

  let items = document.querySelectorAll('input[type="checkbox"]');

  items.forEach((item) => {
    item.checked = false;
    document.getElementById(item.id + "Qty").value = 1;
  });

  msg.innerHTML = `
  <button onclick="removemsg()" >x</button>
  <br>
  <p>All fields have been cleared successfully 👍</p>

<p>You can place a new order</p>`;
  msg.classList.add("show");
}

function showMsg3() {
  let summary = document.getElementById("summary");
  summary.classList.remove("show");
  let msg = document.getElementById("message");
  let name = document.getElementById("username").value;
  let num = document.getElementById("num").value;

  let addr = document.getElementById("add").value;
  let { orderedItems, totalcost } = getCartData();

  msg.innerHTML = `
  <button onclick="removemsg()" >x</button>
  <p>Thank You ${name}!</p>

  <p>Your order has been placed successfully 👍.</p>

  <p>We will contact you soon through your number: ${num}.</p>

  <p>Your order is ${orderedItems.join(", ")}</p>

  <p>The total cost is ${totalcost}</p>
`;
  msg.classList.add("show");
}
function editOrder() {
  let summary = document.getElementById("summary");

  summary.classList.remove("show");
}
function removemsg() {
  let msg = document.querySelector("#message");

  msg.classList.remove("show");
}
function opennav() {
  let side = document.getElementById("sidebar");
  let button = document.querySelector(".toggle");
  let overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
  button.classList.toggle("rotate");
  side.classList.toggle("active");
}

function closeSidebar() {
  let side = document.getElementById("sidebar");
  side.classList.remove("active");
  let overlay = document.getElementById("overlay");
  overlay.classList.toggle("active");
}
function showDetails() {
  let { orderedItems, totalcost } = getCartData();
  document.getElementById("ordered-items").innerHTML =
    orderedItems.join("<br>");

  document.getElementById("total").innerText = totalcost;
}
function getCartData() {
  let items = document.querySelectorAll('input[type="checkbox"]');

  let orderedItems = [];
  let totalcost = 0;

  items.forEach((item) => {
    if (item.checked) {
      let qty = Number(document.getElementById(item.id + "Qty").value);

      orderedItems.push(item.value + " × " + qty);

      totalcost = totalcost + Number(item.dataset.price) * qty;
    }
  });
  return { orderedItems, totalcost };
}
function toggleTheme() {
  let body = document.getElementById("top");
  let side = document.getElementById("sidebar");
  let overlay = document.getElementById("overlay");

  // toggle dark mode
  body.classList.toggle("dark");

  // close sidebar if open
  side.classList.remove("active");

  // close overlay if open
  overlay.classList.remove("active");
}
let overlay = document.getElementById("overlay");
let side = document.getElementById("sidebar");
let button = document.querySelector(".toggle");

overlay.addEventListener("click", () => {
  side.classList.remove("active");
  overlay.classList.remove("active");
  button.classList.remove("rotate");
});
