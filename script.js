// ==========================================================================
// BolsasOda E-Commerce State Management
// ==========================================================================
let cart = [];
let appliedCoupon = null;

// Valid Coupons
const coupons = {
  BOLSA10: { discount: 10, type: "percent" },
  ARTESANAL: { discount: 15, type: "percent" },
  PROMO20: { discount: 20, type: "percent" }
};

// Map product names to their local image files
function getProductImage(name) {
  const mapping = {
    "Bolsa Clássica Terracota": "images/bolsa_terracota.png",
    "Bolsa Vintage Marrom": "images/bolsa_vintage_marrom.png",
    "Bolsa Boho Natural": "images/bolsa_boho_natural.png",
    "Bolsa Premium Couro": "images/bolsa_premium_couro.png",
    "Bolsa Cores do Arco-Íris": "images/bolsa_cores_arcoiris.png",
    "Bolsa Tote Artesanal": "images/bolsa_tote_artesanal.png"
  };
  return mapping[name] || "logo.svg";
}

// Formatting price in BRL
function formatPrice(value) {
  return "R$ " + parseFloat(value).toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

// Scroll to specific section smoothly
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    // Close mobile menu if active
    closeMobileMenu();
    
    // Adjust scroll padding dynamically
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = section.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// ==========================================================================
// SCROLL EFFECTS & ACTIVE NAV LINKS
// ==========================================================================
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  
  // Header scrolled state
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Active section indicator
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  
  let currentActiveId = "";
  const scrollPosition = window.scrollY + 120; // offset

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPosition >= top && scrollPosition < top + height) {
      currentActiveId = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentActiveId}`) {
      link.classList.add("active");
    }
  });
}

// ==========================================================================
// MOBILE NAVIGATION MENU
// ==========================================================================
function toggleMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle-btn");
  const navLinks = document.getElementById("nav-links-menu");
  
  menuToggle.classList.toggle("open");
  navLinks.classList.toggle("active");
}

function closeMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle-btn");
  const navLinks = document.getElementById("nav-links-menu");
  
  if (menuToggle && navLinks) {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("active");
  }
}

// Close mobile menu when clicking outside of it
document.addEventListener("click", (e) => {
  const menuToggle = document.getElementById("menu-toggle-btn");
  const navLinks = document.getElementById("nav-links-menu");
  
  if (navLinks && navLinks.classList.contains("active")) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// ==========================================================================
// CATALOG CATEGORY FILTERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from other buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      // Add active to current
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      productCards.forEach((card) => {
        // Simple animations with opacity / scales
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
  
  // Render cart count on load
  updateCartCount();
});

// ==========================================================================
// SHOPPING CART DRAWER ACTIONS
// ==========================================================================
function openCart() {
  document.getElementById("cart-drawer-container").classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
  renderCart();
}

function closeCart() {
  document.getElementById("cart-drawer-container").classList.remove("active");
  document.body.style.overflow = ""; // Enable background scroll
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.price * existingItem.quantity;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      totalPrice: price,
      image: getProductImage(name)
    });
  }

  updateCartCount();
  
  // Open the slide-over drawer cart directly for visual confirmation
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

function changeQty(index, delta) {
  const item = cart[index];
  if (!item) return;

  item.quantity = Math.max(1, item.quantity + delta);
  item.totalPrice = item.price * item.quantity;
  
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector(".cart-count");
  if (cartBadge) {
    cartBadge.textContent = totalCount;
    // Add simple scale bounce effect on count update
    cartBadge.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartBadge.style.transform = "scale(1)";
    }, 200);
  }
}

function renderCart() {
  const cartWrapper = document.getElementById("cart-items-wrapper");
  const checkoutBtn = document.getElementById("checkout-trigger-btn");
  
  if (cart.length === 0) {
    cartWrapper.innerHTML = `<p class="cart-empty-msg">Seu carrinho está vazio 👜</p>`;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    cartWrapper.innerHTML = cart
      .map((item, index) => `
        <div class="cart-drawer-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-preview-img" />
          <div class="cart-item-info-col">
            <h4>${item.name}</h4>
            <span class="cart-item-row-price">${formatPrice(item.price)}</span>
            <div class="cart-item-qty-selector">
              <button onclick="changeQty(${index}, -1)" aria-label="Diminuir quantidade">-</button>
              <span>${item.quantity}</span>
              <button onclick="changeQty(${index}, 1)" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <button class="cart-item-remove-trigger" onclick="removeFromCart(${index})" title="Remover produto da sacola">✕</button>
        </div>
      `)
      .join("");
      
    if (checkoutBtn) checkoutBtn.disabled = false;
  }

  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  let total = subtotal;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = (subtotal * appliedCoupon.discount) / 100;
      total = subtotal - discount;
    }
  }

  document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);

  const discountRow = document.getElementById("summary-discount-row");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("summary-discount").textContent = "-" + formatPrice(discount);
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("summary-total").textContent = formatPrice(total);
}

// Apply Coupon Discounts
function applyCoupon() {
  const couponField = document.getElementById("coupon-field");
  const feedbackMsg = document.getElementById("coupon-feedback");
  const code = couponField.value.trim().toUpperCase();

  if (!code) {
    feedbackMsg.textContent = "Por favor, insira o código.";
    feedbackMsg.className = "coupon-feedback-msg error";
    return;
  }

  if (coupons[code]) {
    appliedCoupon = coupons[code];
    feedbackMsg.textContent = `Desconto de ${appliedCoupon.discount}% aplicado!`;
    feedbackMsg.className = "coupon-feedback-msg success";
    couponField.value = "";
    renderCart();
  } else {
    appliedCoupon = null;
    feedbackMsg.textContent = "Cupom inválido ou expirado.";
    feedbackMsg.className = "coupon-feedback-msg error";
    renderCart();
  }
}

// ==========================================================================
// CHECKOUT & REDIRECT TO WHATSAPP
// ==========================================================================
function checkout() {
  if (cart.length === 0) return;

  const phone = "5511999999999"; // Ateliê phone number
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  let total = subtotal;

  if (appliedCoupon && appliedCoupon.type === "percent") {
    discount = (subtotal * appliedCoupon.discount) / 100;
    total = subtotal - discount;
  }

  // Build text message for WhatsApp API
  let message = "Olá! Gostaria de fazer o pedido das seguintes bolsas de crochê:\n\n";
  
  cart.forEach((item) => {
    message += `• *${item.name}* (Qtd: ${item.quantity}) - Subtotal: ${formatPrice(item.price * item.quantity)}\n`;
  });
  
  message += `\n*Subtotal:* ${formatPrice(subtotal)}`;
  if (discount > 0) {
    message += `\n*Desconto:* -${formatPrice(discount)}`;
  }
  message += `\n*Total Geral:* ${formatPrice(total)}`;
  message += "\n\nFico no aguardo para combinarmos a entrega e o pagamento! ✨";

  // URL Encode
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  // Open confirmation details in modal
  const detailsWrapper = document.getElementById("confirmation-details");
  detailsWrapper.innerHTML = `
    <p><strong>Resumo do Pedido:</strong></p>
    <ul style="list-style: none; padding-left: 0; margin-top: 0.5rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.25rem;">
      ${cart.map(i => `<li>- ${i.name} (x${i.quantity})</li>`).join("")}
    </ul>
    <p style="margin-top: 0.75rem; border-top: 1px solid #ddd; padding-top: 0.5rem;"><strong>Total:</strong> <span style="color:#8d5b4c; font-weight:700;">${formatPrice(total)}</span></p>
  `;

  // Show our elegant modal
  document.getElementById("confirmation-modal").classList.add("active");

  // Redirect to WhatsApp after 2.5 seconds
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 2500);

  // Clear Cart State
  cart = [];
  appliedCoupon = null;
  updateCartCount();
  closeCart();
}

function closeConfirmationModal() {
  document.getElementById("confirmation-modal").classList.remove("active");
}

// ==========================================================================
// CONTACT FORM SUBMISSION
// ==========================================================================
function submitForm(event) {
  event.preventDefault();
  
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  
  alert(`Obrigado pelo seu contato, ${name}! Recebemos a sua mensagem e responderemos no e-mail: ${email} em até 24 horas.`);
  event.target.reset();
}
