let cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatPrice(price) {
  return price.toLocaleString() + "đ";
}

function renderCart() {
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  let total = 0;

  // xử lý giỏ trống
  if (cart.length === 0) {
    container.innerHTML = "<p>Giỏ hàng trống</p>";
    document.getElementById("total-price").innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${item.img}" width="80">
      <p>${item.name}</p>
      <p>${item.price} x ${item.quantity}</p>

      <button onclick="increase(${index})">+</button>
      <button onclick="decrease(${index})">-</button>
      <button onclick="removeItem(${index})">Xóa</button>

      <hr>
    `;

    container.appendChild(div);

    // tính tổng
    const priceNumber = parseInt(item.price.replace(/\D/g, ""));
    total += priceNumber * item.quantity;
  });

  document.getElementById("total-price").innerText =
    "Tổng: " + formatPrice(total);
}

function increase(index) {
  cart[index].quantity++;
  save();
}

function decrease(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  }
  save();
}

function removeItem(index) {
  cart.splice(index, 1);
  save();
}

function save() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout() {
  alert("Đặt hàng thành công!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

renderCart();
