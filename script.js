// Cart state
let cart = [];
let appliedCoupon = null;

// Coupon codes (in a real app, this would come from a backend)
const coupons = {
  BOLSA10: { discount: 10, type: "percent" },
  artesanal: { discount: 15, type: "percent" },
  promo20: { discount: 20, type: "percent" },
  fretegratis: { discount: 0, type: "shipping" },
};

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function showModal(productName) {
  document.getElementById("product-name").textContent = productName;
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

function submitForm(event) {
  event.preventDefault();
  alert("Obrigado pela sua mensagem! Em breve entraremos em contato.");
  event.target.reset();
}

// Close modal when clicking outside
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Cart Functions
function openCart() {
  document.getElementById("cart-modal").classList.add("active");
  renderCart();
}

function closeCart() {
  document.getElementById("cart-modal").classList.remove("active");
}

function addToCart(name, price) {
  const quantityInput = document.getElementById(`qty-${name}`);
  const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

  // Add the product with quantity
  for (let i = 0; i < quantity; i++) {
    cart.push({ name, price });
  }

  updateCartCount();
  renderCart();

  // Show confirmation
  document.getElementById("product-name").textContent = name;
  document.getElementById("modal").classList.add("active");

  setTimeout(() => {
    closeModal();
  }, 1500);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.querySelector(".cart-count").textContent = cart.length;
}

function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
    document.querySelector(".checkout-btn").disabled = true;
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">🗑️</button>
        </div>
      `
      )
      .join("");
    document.querySelector(".checkout-btn").disabled = false;
  }

  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  let discount = 0;
  let total = subtotal;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = (subtotal * appliedCoupon.discount) / 100;
      total = subtotal - discount;
    } else if (appliedCoupon.type === "shipping") {
      // Free shipping - show as discount
      discount = 0;
      total = subtotal;
    }
  }

  document.getElementById("cart-subtotal").textContent = formatPrice(subtotal);

  const discountRow = document.getElementById("discount-row");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("cart-discount").textContent =
      "-" + formatPrice(discount);
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("cart-total").textContent = formatPrice(total);
}

function applyCoupon() {
  const couponInput = document.getElementById("coupon-input");
  const couponMessage = document.getElementById("coupon-message");
  const code = couponInput.value.trim().toUpperCase();

  if (!code) {
    couponMessage.textContent = "Por favor, insira um código de cupom";
    couponMessage.className = "coupon-message error";
    return;
  }

  if (coupons[code]) {
    appliedCoupon = coupons[code];
    couponMessage.textContent = `Cupom aplicado: ${appliedCoupon.discount}% de desconto!`;
    couponMessage.className = "coupon-message success";
    couponInput.value = "";
    updateCartSummary();
  } else {
    appliedCoupon = null;
    couponMessage.textContent = "Cupom inválido ou expirado";
    couponMessage.className = "coupon-message error";
    updateCartSummary();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const total = document.getElementById("cart-total").textContent;
  alert(
    `Obrigado pela compra!\n\nTotal: ${total}\n\nEntraremos em contato para finalizar o pedido.`
  );

  // Clear cart
  cart = [];
  appliedCoupon = null;
  updateCartCount();
  renderCart();
  closeCart();
}

// Close cart modal when clicking outside
document.getElementById("cart-modal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeCart();
  }
});

// Update product buttons to add to cart
document.addEventListener("DOMContentLoaded", function () {
  // Update onclick handlers for product buttons
  const productButtons = document.querySelectorAll(".product-button");
  const products = [
    { name: "Bolsa Clássica Terracota", price: 289 },
    { name: "Bolsa Vintage Marrom", price: 349 },
    { name: "Bolsa Boho Natural", price: 259 },
    { name: "Bolsa Premium Couro", price: 459 },
    { name: "Bolsa Cores do Arco-Íris", price: 319 },
    { name: "Bolsa Tote Artesanal", price: 379 },
  ];

  productButtons.forEach((btn, index) => {
    btn.onclick = function () {
      addToCart(products[index].name, products[index].price);
    };
  });
});

function formatPrice(price) {
  return "R$ " + price.toFixed(2).replace(".", ",");
}
