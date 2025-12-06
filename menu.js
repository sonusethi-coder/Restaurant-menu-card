let cart = {}; 
let total = 0;

// Show selected category
function showCategory(cat) {
  document.querySelectorAll('.category').forEach(c => c.style.display = "none");
  document.getElementById(cat).style.display = "block";
  document.getElementById("closeBtn").style.display = "block";
}

// Handle Check Out click
document.getElementById('check').addEventListener('click', function() {
   document.querySelector('.container').style.display = "none";
   document.getElementById('form').style.display = "block";
   document.getElementById('OrderSummary').style.display = "block";

const SummaryBody = document.getElementById('SummaryBody');
 SummaryBody.innerHTML ="";
    let finaltotal = 0;

Object.keys(cart).forEach(item => {
    const entry = cart[item];
    console.log(entry);
    const Subtotal = entry.price * entry.qty;
    finaltotal += Subtotal;


const row = document.createElement ('tr');
row.innerHTML = `
  
      <td>${item}</td>
      <td>${entry.qty}</td>
      <td>${entry.price}</td>
      <td>${Subtotal}</td>
`;
  SummaryBody.appendChild(row);
  });
  document.getElementById('SummaryToatal').textContent = finaltotal;
    });


function hideItems() {
  document.querySelectorAll('.category').forEach(c => c.style.display = "none");
  document.getElementById("closeBtn").style.display = "none";
}

// Add to Cart
function addToCart(name, price, imgSrc) { 
  if (!cart[name]) {
    cart[name] = { price: price, qty: 0, img: imgSrc }; 
    cart[name].qty++;
  }
  updateCart();
}

// Update Cart UI
function updateCart() {
  const list = document.getElementById('cart-items');
  list.innerHTML = "";
  total = 0;

  Object.keys(cart).forEach(item => {
    const entry = cart[item];
    const li = document.createElement('li');
    li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${entry.img}" style="width: 60px; height: 60px; border-radius: 5px; object-fit: cover;">
        <div style="display: flex; flex-direction: column;">
          <span>${item}</span>
          <div style="display: flex; align-items: center; gap: 25px;">
          <span>₹${entry.price}</span>
          <div>
          <button class="qty-btn" onclick="decreaseQty('${item}')">-</button>
          <span>${entry.qty}</span>
          <button class="qty-btn" onclick="increaseQty('${item}')">+</button>
            </div>
            </div>
        </div>
        </div>
    `;
    list.appendChild(li);
    total += entry.price * entry.qty;
  });

  document.getElementById("total").textContent = total;
}

// Increase
function increaseQty(item) {
  cart[item].qty++;
  updateCart();
}

// Decrease
function decreaseQty(item) {
  if (cart[item].qty > 1) {
    cart[item].qty--;
  } else {
    delete cart[item];
  }
  updateCart();
}

function thnx(e) {
  if(e) e.preventDefault();

  const form = document.getElementById('form');

  if (!form.checkValidity()) {
    alert("❌ Please fill all required details.");
    return;
  }

  alert("✅ Thank you! Your order is ready to be delivered.");
  
};
