let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");

    const name = card.querySelector(".product-name").innerText;
    const price = card.querySelector(".current-price").innerText;
    const img = card.querySelector("img").src;

    const product = { name, price, img };

    addToCart(product);

    btn.innerText = "Đã thêm ✓";
    setTimeout(() => {
      btn.innerText = "Thêm vào giỏ";
    }, 1500);
  });
});

function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

//Tìm kiếm sản phẩm
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase();

  document.querySelectorAll(".product-card").forEach((card) => {
    const name = card.querySelector(".product-name").innerText.toLowerCase();

    if (name.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

//Hiện thị số lượng giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").innerText = total;
}

updateCartCount();

//Chuyển trang giỏ hàng chi tiết
function goToCart() {
  window.location.href = "cart.html";
}
