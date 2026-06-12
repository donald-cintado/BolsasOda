// ==========================================================================
// BolsasOda E-Commerce State Management & Product Database
// ==========================================================================
let cart = [];
let appliedCoupon = null;
let shippingCost = 0;
let shippingAddress = null;

// Product Catalog Details Database
const productDetailsDB = {
  "Bolsa Clássica Terracota": {
    price: 289,
    category: "Dia a Dia",
    badge: "Mais Vendida",
    rating: 5.0,
    reviews: 48,
    images: [
      "images/bolsa_terracota.png",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    description: "Um clássico indispensável do nosso ateliê. Trama firme e estruturada com fios premium de algodão reciclado, oferecendo praticidade e um design rústico sofisticado.",
    specs: {
      "Material": "Fio de Algodão 100% Orgânico Reciclado",
      "Medidas": "32cm (L) x 24cm (A) x 10cm (P)",
      "Alça": "Crochê macio e anatômico fixo (55cm)",
      "Fechamento": "Zíper reforçado e forro interno em linho",
      "Produção": "Feito à mão - Pronta entrega"
    }
  },
  "Bolsa Vintage Marrom": {
    price: 349,
    category: "Dia a Dia",
    badge: "Exclusiva",
    rating: 4.8,
    reviews: 32,
    images: [
      "images/bolsa_vintage_marrom.png",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600"
    ],
    description: "Inspirada na estética retrô, esta peça mescla a maleabilidade do crochê com a rigidez do couro nobre. Ideal para quem busca um acessório de personalidade e alta durabilidade.",
    specs: {
      "Material": "Cordão de Algodão Encerado e Couro Bovino Premium",
      "Medidas": "28cm (L) x 22cm (A) x 8cm (P)",
      "Alça": "Alça regulável e removível em couro legítimo (até 120cm)",
      "Fechamento": "Botão de madeira entalhado com passador em couro",
      "Produção": "Artesanal sob encomenda - 3 dias úteis para postagem"
    }
  },
  "Bolsa Boho Natural": {
    price: 259,
    category: "Verão/Praia",
    badge: "Tendência Verão",
    rating: 4.9,
    reviews: 54,
    images: [
      "images/bolsa_boho_natural.png",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    ],
    description: "Leve, descontraída e cheia de estilo. Trama aberta confeccionada em fibras naturais macias, finalizada com franjas charmosas que dão movimento ao visual de verão.",
    specs: {
      "Material": "Fibras de Juta Natural e Algodão Cru",
      "Medidas": "30cm (L) x 26cm (A) (sem franjas) x 6cm (P)",
      "Alça": "Tiras transpassadas de juta com reforço interno",
      "Fechamento": "Botão magnético embutido e forro interno macio",
      "Produção": "Feito à mão - Pronta entrega"
    }
  },
  "Bolsa Premium Couro": {
    price: 459,
    category: "Premium",
    badge: "Edição Limitada",
    rating: 5.0,
    reviews: 18,
    images: [
      "images/bolsa_premium_couro.png",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600"
    ],
    description: "Nossa peça mais luxuosa. A união perfeita entre a arte têxtil e a marroquinaria fina. Estrutura lateral e alças em couro de curtume certificado de baixo impacto ecológico.",
    specs: {
      "Material": "Fio Náutico Premium de Alta Resistência e Couro Bovino Natural",
      "Medidas": "26cm (L) x 20cm (A) x 12cm (P)",
      "Alça": "Alça de mão fixa e alça transversal removível em couro (115cm)",
      "Fechamento": "Tampo frontal de couro com fecho metálico rotativo",
      "Produção": "Edição limitada - Poucas unidades disponíveis"
    }
  },
  "Bolsa Cores do Arco-Íris": {
    price: 319,
    category: "Verão/Praia",
    badge: "Edição Especial",
    rating: 4.7,
    reviews: 23,
    images: [
      "images/bolsa_cores_arcoiris.png",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600"
    ],
    description: "Vibrante e alegre, esta bolsa listrada é tricotada à mão com fios de tonalidades exclusivas. Um acessório que transforma um visual básico em uma declaração de estilo autoral.",
    specs: {
      "Material": "Fios de Algodão Mercerizado com Brilho Sutil",
      "Medidas": "34cm (L) x 28cm (A) x 8cm (P)",
      "Alça": "Alça dupla reforçada em crochê ponto alto",
      "Fechamento": "Zíper invisível de nylon e bolso interno com zíper",
      "Produção": "Feito à mão - Pronta entrega"
    }
  },
  "Bolsa Tote Artesanal": {
    price: 379,
    category: "Dia a Dia",
    badge: "Clássico",
    rating: 4.9,
    reviews: 41,
    images: [
      "images/bolsa_tote_artesanal.png",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    description: "Desenvolvida para a mulher dinâmica que necessita de espaço sem perder o estilo. Trama super resistente, comporta notebooks de até 13 polegadas, livros e os seus itens diários.",
    specs: {
      "Material": "Fio Náutico de Alta Densidade e fundo estruturado",
      "Medidas": "38cm (L) x 32cm (A) x 12cm (P)",
      "Alça": "Alça de ombro ergonômica em couro (60cm)",
      "Fechamento": "Fecho de mosquetão metálico interno e bolsos organizadores",
      "Produção": "Artesanal sob encomenda - 4 dias úteis para postagem"
    }
  }
};

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
  // If product detail view is active, close it first
  const detailView = document.getElementById("product-detail-view");
  if (detailView && detailView.style.display !== "none") {
    closeProductDetailsWithoutScroll();
  }

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

  // Active section indicator (only if main storefront is visible)
  const storefront = document.getElementById("storefront-view");
  if (storefront && storefront.style.display !== "none") {
    updateActiveNavLink();
  }
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

// Close Cart and enable body scrolling
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
    
    // Reset Shipping when cart is emptied
    shippingCost = 0;
    shippingAddress = null;
    const cepInput = document.getElementById("cep-input");
    if (cepInput) cepInput.value = "";
    const feedback = document.getElementById("shipping-feedback");
    if (feedback) {
      feedback.textContent = "";
      feedback.className = "shipping-feedback-msg";
    }
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

  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = (subtotal * appliedCoupon.discount) / 100;
    }
  }

  // Recalculate shipping dynamically if an address is defined (e.g. if items or subtotal changes)
  if (shippingAddress) {
    shippingCost = getShippingRateByUF(shippingAddress.uf, subtotal);
    
    // Refresh visual feedback message in case it changed to Free
    const rateText = shippingCost === 0 ? "Grátis" : formatPrice(shippingCost);
    showShippingFeedback(`Entrega para: ${shippingAddress.city} - ${shippingAddress.uf} (${shippingAddress.neighborhood}) | Frete: ${rateText}`, "success");
  }

  let total = subtotal - discount + shippingCost;

  document.getElementById("summary-subtotal").textContent = formatPrice(subtotal);

  // Discount display
  const discountRow = document.getElementById("summary-discount-row");
  if (discount > 0) {
    discountRow.style.display = "flex";
    document.getElementById("summary-discount").textContent = "-" + formatPrice(discount);
  } else {
    discountRow.style.display = "none";
  }

  // Shipping display
  const shippingRow = document.getElementById("summary-shipping-row");
  const shippingValEl = document.getElementById("summary-shipping");
  if (shippingAddress) {
    shippingRow.style.display = "flex";
    shippingValEl.textContent = shippingCost === 0 ? "Grátis" : formatPrice(shippingCost);
  } else {
    shippingRow.style.display = "none";
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
// SHIPPING CALCULATOR (ViaCEP API)
// ==========================================================================
function maskCEP(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 5) {
    value = value.substring(0, 5) + "-" + value.substring(5, 8);
  }
  input.value = value;
}

function showShippingFeedback(text, className) {
  const el = document.getElementById("shipping-feedback");
  if (el) {
    el.textContent = text;
    el.className = `shipping-feedback-msg ${className}`;
  }
}

function calculateShipping() {
  const cepInput = document.getElementById("cep-input");
  const cep = cepInput.value.replace(/\D/g, "");

  if (cart.length === 0) {
    showShippingFeedback("Adicione produtos ao carrinho primeiro.", "error");
    return;
  }

  if (cep.length !== 8) {
    showShippingFeedback("Por favor, digite um CEP válido (8 dígitos).", "error");
    return;
  }

  showShippingFeedback("Consultando endereço de entrega...", "loading");

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (data.erro) {
        // Fallback locally if CEP is structured but not found in Correios database
        const fallback = getFallbackAddress(cep);
        applyShippingData(fallback.city, fallback.uf, fallback.neighborhood, cepInput.value);
        return;
      }
      applyShippingData(data.localidade, data.uf, data.bairro || "Centro", cepInput.value);
    })
    .catch((err) => {
      console.warn("API ViaCEP falhou ou foi bloqueada. Usando contingência local offline.", err);
      // Contingency lookup when fetch is blocked by CORS/file:/// security
      const fallback = getFallbackAddress(cep);
      applyShippingData(fallback.city, fallback.uf, fallback.neighborhood, cepInput.value);
    });
}

function getFallbackAddress(cep) {
  const firstDigit = cep.charAt(0);
  const mappings = {
    "0": { city: "São Paulo", uf: "SP", neighborhood: "Centro" },
    "1": { city: "Campinas", uf: "SP", neighborhood: "Centro" },
    "2": { city: "Rio de Janeiro", uf: "RJ", neighborhood: "Copacabana" },
    "3": { city: "Belo Horizonte", uf: "MG", neighborhood: "Centro" },
    "4": { city: "Salvador", uf: "BA", neighborhood: "Pelourinho" },
    "5": { city: "Recife", uf: "PE", neighborhood: "Boa Viagem" },
    "6": { city: "Fortaleza", uf: "CE", neighborhood: "Meireles" },
    "7": { city: "Brasília", uf: "DF", neighborhood: "Asa Sul" },
    "8": { city: "Curitiba", uf: "PR", neighborhood: "Batel" },
    "9": { city: "Porto Alegre", uf: "RS", neighborhood: "Moinhos de Vento" }
  };
  return mappings[firstDigit] || { city: "São Paulo", uf: "SP", neighborhood: "Centro" };
}

function applyShippingData(city, uf, neighborhood, formattedCep) {
  shippingAddress = {
    city: city,
    uf: uf,
    neighborhood: neighborhood,
    cep: formattedCep
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  shippingCost = getShippingRateByUF(uf, subtotal);

  const rateText = shippingCost === 0 ? "Grátis" : formatPrice(shippingCost);
  showShippingFeedback(`Entrega para: ${city} - ${uf} (${neighborhood}) | Frete: ${rateText}`, "success");
  
  updateCartSummary();
}

function getShippingRateByUF(uf, subtotal) {
  const southeast = ["SP", "RJ", "MG", "ES"];
  const south = ["PR", "SC", "RS"];
  const centralWest = ["DF", "GO", "MS", "MT"];
  const northeast = ["BA", "PE", "CE", "RN", "PB", "AL", "SE", "PI", "MA"];
  const north = ["AM", "PA", "RO", "AC", "RR", "AP", "TO"];

  // Southeast region
  if (southeast.includes(uf)) {
    return subtotal >= 300 ? 0 : 14.90;
  }
  // South region
  if (south.includes(uf)) {
    return subtotal >= 350 ? 0 : 19.90;
  }
  // Central-West region
  if (centralWest.includes(uf)) {
    return 24.90;
  }
  // Northeast region
  if (northeast.includes(uf)) {
    return 29.90;
  }
  // North region
  if (north.includes(uf)) {
    return 34.90;
  }
  // Default rate for fallback
  return 19.90;
}

// ==========================================================================
// CHECKOUT & REDIRECT TO WHATSAPP
// ==========================================================================
function checkout() {
  if (cart.length === 0) return;

  const phone = "5511999999999"; // Ateliê phone number
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;

  if (appliedCoupon && appliedCoupon.type === "percent") {
    discount = (subtotal * appliedCoupon.discount) / 100;
  }

  // Double check shipping rate
  if (shippingAddress) {
    shippingCost = getShippingRateByUF(shippingAddress.uf, subtotal);
  } else {
    shippingCost = 0;
  }

  let total = subtotal - discount + shippingCost;

  // Build text message for WhatsApp API
  let message = "Olá! Gostaria de fazer o pedido das seguintes bolsas de crochê:\n\n";
  
  cart.forEach((item) => {
    message += `• *${item.name}* (Qtd: ${item.quantity}) - Subtotal: ${formatPrice(item.price * item.quantity)}\n`;
  });
  
  message += `\n*Subtotal:* ${formatPrice(subtotal)}`;
  if (discount > 0) {
    message += `\n*Desconto:* -${formatPrice(discount)}`;
  }
  if (shippingAddress) {
    const rateText = shippingCost === 0 ? "Grátis" : formatPrice(shippingCost);
    message += `\n*Frete:* ${rateText} (${shippingAddress.city} - ${shippingAddress.uf}, CEP: ${shippingAddress.cep})`;
  }
  message += `\n*Total Geral:* ${formatPrice(total)}`;
  message += "\n\nFico no aguardo para combinarmos a entrega e o pagamento! ✨";

  // URL Encode
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;

  // Open confirmation details in modal
  const detailsWrapper = document.getElementById("confirmation-details");
  
  let detailsHtml = `
    <p><strong>Resumo do Pedido:</strong></p>
    <ul style="list-style: none; padding-left: 0; margin-top: 0.5rem; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.25rem;">
      ${cart.map(i => `<li>- ${i.name} (x${i.quantity})</li>`).join("")}
    </ul>
  `;
  
  if (shippingAddress) {
    const shippingText = shippingCost === 0 ? "Grátis" : formatPrice(shippingCost);
    detailsHtml += `
      <p style="margin-top: 0.5rem; font-size: 0.85rem; border-top: 1px dashed #ddd; padding-top: 0.5rem;">
        <strong>Entrega:</strong> ${shippingAddress.city} - ${shippingAddress.uf} (Frete: ${shippingText})
      </p>
    `;
  }
  
  detailsHtml += `
    <p style="margin-top: 0.75rem; border-top: 1px solid #ddd; padding-top: 0.5rem;"><strong>Total:</strong> <span style="color:#8d5b4c; font-weight:700;">${formatPrice(total)}</span></p>
  `;
  
  detailsWrapper.innerHTML = detailsHtml;

  // Show our elegant modal
  document.getElementById("confirmation-modal").classList.add("active");

  // Redirect to WhatsApp after 2.5 seconds
  setTimeout(() => {
    window.open(whatsappUrl, "_blank");
  }, 2500);

  // Clear Cart State
  cart = [];
  appliedCoupon = null;
  shippingCost = 0;
  shippingAddress = null;
  
  // Clear inputs
  const cepInput = document.getElementById("cep-input");
  if (cepInput) cepInput.value = "";
  const feedback = document.getElementById("shipping-feedback");
  if (feedback) {
    feedback.textContent = "";
    feedback.className = "shipping-feedback-msg";
  }

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

// ==========================================================================
// PRODUCT DETAIL DYNAMIC VIEW (SPA PATHWAYS)
// ==========================================================================
function openProductDetails(name) {
  const product = productDetailsDB[name];
  if (!product) return;

  const detailViewContainer = document.getElementById("product-detail-view");
  
  const htmlContent = `
    <div class="product-detail-view-container">
      <button class="back-to-catalog-btn" onclick="closeProductDetails()">
        ← Voltar para a Coleção
      </button>
      
      <div class="detail-layout-grid">
        <!-- Coluna Esquerda: Galeria -->
        <div class="detail-gallery-block">
          <div class="gallery-main-display">
            <img src="${product.images[0]}" id="main-detail-image" alt="${name} - Foto principal" />
          </div>
          <div class="gallery-thumbnails-strip">
            ${product.images.map((img, index) => `
              <div class="thumb-image-wrapper ${index === 0 ? 'active' : ''}" onclick="changeGalleryImage('${img}', this)">
                <img src="${img}" alt="Miniatura ${index + 1} de ${name}" />
              </div>
            `).join("")}
          </div>
        </div>
        
        <!-- Coluna Direita: Informações -->
        <div class="detail-info-block">
          <div class="detail-product-meta">
            <span class="detail-product-category">${product.category}</span>
            ${product.badge ? `<span class="detail-product-badge">${product.badge}</span>` : ''}
          </div>
          
          <h2 class="detail-product-title">${name}</h2>
          
          <div class="detail-product-rating">
            <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span class="rating-text">${product.rating.toFixed(1)} (${product.reviews} avaliações)</span>
          </div>
          
          <div class="detail-product-price">
            <span>${formatPrice(product.price)}</span>
            <span class="installment-note">ou 3x de ${formatPrice(product.price / 3)} sem juros no cartão</span>
          </div>
          
          <p class="detail-product-desc">${product.description}</p>
          
          <div class="detail-specs-table-wrapper">
            <h4>Características Detalhadas</h4>
            <table class="detail-specs-table">
              <tbody>
                ${Object.entries(product.specs).map(([label, value]) => `
                  <tr>
                    <td class="spec-label">${label}</td>
                    <td class="spec-value">${value}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          
          <div class="detail-buy-button-wrapper">
            <button class="cta-button detail-add-to-cart-btn" onclick="addToCart('${name}', ${product.price})">
              Adicionar à Sacola de Compras 👜
            </button>
          </div>
          
          <ul class="detail-trust-benefits">
            <li class="benefit-item">
              <span class="benefit-icon">🚚</span>
              <span>Frete grátis conforme sua região (consulte digitando o CEP)</span>
            </li>
            <li class="benefit-item">
              <span class="benefit-icon">🌿</span>
              <span>100% fios orgânicos e ecologicamente responsáveis</span>
            </li>
            <li class="benefit-item">
              <span class="benefit-icon">🔒</span>
              <span>Compra garantida & suporte direto pelo WhatsApp</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  detailViewContainer.innerHTML = htmlContent;

  // Toggle View Containers
  document.getElementById("storefront-view").style.display = "none";
  detailViewContainer.style.display = "block";
  
  // Reset scroll to top of page
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeProductDetailsWithoutScroll() {
  document.getElementById("product-detail-view").style.display = "none";
  document.getElementById("storefront-view").style.display = "block";
  document.body.style.overflow = ""; // Ensure scrolling is enabled
}

function closeProductDetails() {
  closeProductDetailsWithoutScroll();
  
  // Scroll to catalog section dynamically
  const section = document.getElementById("produtos");
  if (section) {
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

function changeGalleryImage(imgUrl, thumbEl) {
  const mainImage = document.getElementById("main-detail-image");
  if (!mainImage) return;

  // Add transition fade effect
  mainImage.style.opacity = "0.3";
  
  setTimeout(() => {
    mainImage.src = imgUrl;
    mainImage.style.opacity = "1";
  }, 150);

  // Toggle active class on thumbnails
  const thumbnails = document.querySelectorAll(".thumb-image-wrapper");
  thumbnails.forEach((t) => t.classList.remove("active"));
  thumbEl.classList.add("active");
}
