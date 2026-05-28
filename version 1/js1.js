alert("WELCOME TO OUR SPICE GARDEN WEB PAGE");
const menu = [
  { id: "paneer", name: "Paneer Butter Masala", price: 250 },
  { id: "mushroom", name: "Mushroom 65", price: 150 },
  { id: "vegmanchuria", name: "Veg Manchuria", price: 150 },
  { id: "chickenbiryani", name: "Chicken Biryani", price: 250 },
  { id: "chicken65", name: "Chicken 65", price: 180 },
  { id: "muttonbiryani", name: "Mutton Biryani", price: 350 },
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
  summary.style.display = "block";
}
function showMsg2() {
  let msg = document.getElementById("message");

  document.getElementById("username").value = "";
  document.getElementById("num").value = "";
  document.getElementById("add").value = "";

  let items = document.querySelectorAll('input[type="checkbox"]');

  items.forEach((item) => {
    item.checked = false;
  });

  msg.innerText = `All fields have been cleared successfully 👍
You can place a new order`;

  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

function showMsg3() {
  let summary = document.getElementById("summary");
  summary.style.display = "none";
  let msg = document.getElementById("message");
  let name = document.getElementById("username").value;
  let num = document.getElementById("num").value;
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
  let addr = document.getElementById("add").value;

  msg.innerHTML = `
  <button onclick="removemsg()" >x</button>
  <p>Thank You ${name}!</p>

  <p>Your order has been placed successfully 👍.</p>

  <p>We will contact you soon through your number: ${num}.</p>

  <p>Your order is ${orderedItems.join(", ")}</p>

  <p>The total cost is ${totalcost}</p>
`;

  msg.style.display = "block";
}
function editOrder() {
  let summary = document.getElementById("summary");
  summary.style.display = "none";
}
function removemsg() {
  let msg = document.querySelector("#message");
  msg.style.display = "none";
}
function opennav() {
  let side = document.getElementById("sidebar");
  if (side.style.display !== "block") {
    side.style.display = "block";
  } else {
    side.style.display = "none";
  }
}
function closeSidebar() {
  let side = document.getElementById("sidebar");
  side.style.display = "none";
}
