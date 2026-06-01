const siteSettings = {
  email: "onixstudiohelp@gmail.com",
  contactSubject: "Onix Studios enquiry"
};

let lastMediaTrigger = null;

function updateContactLinks() {
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${siteSettings.email}`;
  });

  document.querySelectorAll("[data-email-text]").forEach((item) => {
    item.textContent = siteSettings.email;
  });
}

function initNavigation() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  const links = document.querySelectorAll(".nav-menu a, .nav-cta");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach((link) => {
    const linkPage = new URL(link.getAttribute("href"), window.location.href).pathname.split("/").pop() || "index.html";
    if (linkPage === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

function initRevealAnimations() {
  const revealItems = document.querySelectorAll("[data-animate]");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function productById(productId) {
  return Array.isArray(window.products) ? window.products.find((product) => product.id === productId) : null;
}

function hasCheckoutUrl(product) {
  return Boolean(product.checkoutUrl && !String(product.checkoutUrl).includes("example.com"));
}

function checkoutActionTemplate(product, modifierClass) {
  if (!hasCheckoutUrl(product)) {
    return `<button class="button ${modifierClass}" type="button" disabled>Coming soon</button>`;
  }

  return `<a class="button ${modifierClass}" href="${escapeHtml(product.checkoutUrl)}" target="_blank" rel="noopener noreferrer">Buy now</a>`;
}

function renderProducts() {
  const grids = document.querySelectorAll("[data-product-grid]");
  if (!grids.length || !Array.isArray(window.products)) return;

  grids.forEach((grid) => {
    const limit = Number(grid.dataset.limit || 0);
    const featuredOnly = grid.dataset.featured === "true";
    let items = window.products;

    if (featuredOnly) {
      items = items.filter((item) => item.featured);
    }

    if (limit > 0) {
      items = items.slice(0, limit);
    }

    grid.innerHTML = items.map((product) => productCardTemplate(product)).join("");
  });
}

function productCardTemplate(product) {
  const includes = Array.isArray(product.includes) ? product.includes.slice(0, 3) : [];

  return `
    <article class="product-card glass-card product-card--${escapeHtml(product.theme)}" data-product-card data-product-id="${escapeHtml(product.id)}" data-animate tabindex="0" role="button" aria-label="View details for ${escapeHtml(product.name)}">
      ${productVisualTemplate(product, "card")}
      <div class="product-card__body">
        <div class="product-card__topline">
          <span>${escapeHtml(product.category)}</span>
          <strong>${escapeHtml(product.price)}</strong>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.shortDescription)}</p>
        <ul>
          ${includes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <div class="product-card__actions">
          <button class="button button--primary" type="button" data-open-product="${escapeHtml(product.id)}">View details</button>
          ${checkoutActionTemplate(product, "button--secondary")}
        </div>
      </div>
    </article>
  `;
}

function productVisualTemplate(product, context = "card") {
  return `
    <div class="product-visual product-visual--${escapeHtml(product.theme)} product-visual--${escapeHtml(context)}" aria-hidden="true">
      <img class="product-visual__preview-image" src="images/website-preview.png" alt="" loading="lazy">
      <div class="product-visual__chrome">
        <span></span><span></span><span></span>
      </div>
      <div class="product-visual__vortex"></div>
      <div class="product-visual__grid"></div>
      <div class="product-visual__panel product-visual__panel--one"></div>
      <div class="product-visual__panel product-visual__panel--two"></div>
      <div class="product-visual__meter"></div>
      <div class="product-visual__status">${escapeHtml(product.status || product.category)}</div>
      <span class="product-visual__brand-spin"></span>
    </div>
  `;
}

function mediaPreviewTemplate(item, theme, index) {
  const isVideo = item.type === "video";
  return `
    <button class="media-card glass-card media-card--${escapeHtml(theme)} ${isVideo ? "media-card--video" : "media-card--image"}" type="button" data-open-media data-media-type="${escapeHtml(item.type)}" data-media-title="${escapeHtml(item.title)}" data-media-detail="${escapeHtml(item.detail)}" data-media-theme="${escapeHtml(theme)}" data-media-index="${escapeHtml(index)}" aria-label="Open larger ${isVideo ? "video" : "picture"} preview: ${escapeHtml(item.title)}">
      <div class="media-card__preview" aria-hidden="true">
        <div class="media-card__scan"></div>
        <div class="media-card__grid"></div>
        ${isVideo ? `<span class="play-icon"></span>` : `<span class="image-icon"></span>`}
      </div>
      <div>
        <span>${isVideo ? "Video" : `Picture ${index}`}</span>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.detail)}</p>
      </div>
    </button>
  `;
}

function renderGallery() {
  const galleries = document.querySelectorAll("[data-gallery]");
  if (!galleries.length || !Array.isArray(window.galleryImages)) return;

  galleries.forEach((gallery) => {
    const limit = Number(gallery.dataset.galleryLimit || 0);
    const featuredOnly = gallery.dataset.galleryFeatured === "true";
    let items = window.galleryImages;

    if (featuredOnly) {
      items = items.filter((item) => item.featured);
    }

    if (limit > 0) {
      items = items.slice(0, limit);
    }

    gallery.innerHTML = items
      .map((item) => {
        const product = productById(item.productId) || { id: item.productId, name: item.title, theme: item.theme, status: item.category };
        return `
          <button class="gallery-card glass-card gallery-card--${escapeHtml(item.theme)}" type="button" data-gallery-product="${escapeHtml(item.productId)}" data-animate aria-label="Open ${escapeHtml(item.title)} details">
            ${productVisualTemplate(product, item.type === "video" ? "video" : "image")}
            <span class="gallery-card__meta">
              <span>${escapeHtml(item.category)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <em>${escapeHtml(item.detail)}</em>
            </span>
          </button>
        `;
      })
      .join("");
  });
}

function initProductInteractions() {
  document.addEventListener("click", (event) => {
    const mediaButton = event.target.closest("[data-open-media]");
    if (mediaButton) {
      openMediaViewer(mediaButton);
      return;
    }

    const openButton = event.target.closest("[data-open-product]");
    if (openButton) {
      openProductDetail(openButton.dataset.openProduct);
      return;
    }

    const galleryButton = event.target.closest("[data-gallery-product]");
    if (galleryButton) {
      openProductDetail(galleryButton.dataset.galleryProduct);
      return;
    }

    const card = event.target.closest("[data-product-card]");
    if (card && !event.target.closest("a, button")) {
      openProductDetail(card.dataset.productId);
    }
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-product-card]");
    if (!card) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductDetail(card.dataset.productId);
    }
  });
}

function ensureProductModal() {
  let modal = document.querySelector("[data-product-modal]");

  if (!modal) {
    modal = document.createElement("div");
    modal.className = "product-modal";
    modal.setAttribute("data-product-modal", "");
    modal.setAttribute("hidden", "");
    document.body.appendChild(modal);
  }

  return modal;
}

function ensureMediaViewer() {
  let viewer = document.querySelector("[data-media-viewer]");

  if (!viewer) {
    viewer = document.createElement("div");
    viewer.className = "media-lightbox";
    viewer.setAttribute("data-media-viewer", "");
    viewer.setAttribute("hidden", "");
    document.body.appendChild(viewer);
  }

  return viewer;
}

function mediaViewerVisualTemplate(media) {
  const isVideo = media.type === "video";

  return `
    <div class="media-lightbox__visual media-lightbox__visual--${isVideo ? "video" : "image"} media-lightbox__visual--${escapeHtml(media.theme)}">
      <img src="images/website-preview.png" alt="" loading="lazy">
      <span class="product-visual__brand-spin"></span>
      ${isVideo ? `<span class="media-lightbox__play" aria-hidden="true"></span>` : ""}
    </div>
  `;
}

function openMediaViewer(trigger) {
  const viewer = ensureMediaViewer();
  const media = {
    type: trigger.dataset.mediaType || "image",
    title: trigger.dataset.mediaTitle || "Product preview",
    detail: trigger.dataset.mediaDetail || "",
    theme: trigger.dataset.mediaTheme || "arena",
    index: trigger.dataset.mediaIndex || ""
  };

  lastMediaTrigger = trigger;

  viewer.innerHTML = `
    <div class="media-lightbox__backdrop" data-close-media></div>
    <section class="media-lightbox__panel glass-card" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title">
      <button class="media-lightbox__close" type="button" data-close-media aria-label="Close larger preview">Close</button>
      ${mediaViewerVisualTemplate(media)}
      <div class="media-lightbox__body">
        <p class="eyebrow">${media.type === "video" ? "Preview video" : `Product picture ${escapeHtml(media.index)}`}</p>
        <h2 id="media-lightbox-title">${escapeHtml(media.title)}</h2>
        <p>${escapeHtml(media.detail)}</p>
      </div>
    </section>
  `;

  viewer.removeAttribute("hidden");
  document.body.classList.add("media-lightbox-open");
  viewer.querySelector(".media-lightbox__close").focus();
}

function closeMediaViewer() {
  const viewer = document.querySelector("[data-media-viewer]");
  if (!viewer || viewer.hasAttribute("hidden")) return false;

  viewer.setAttribute("hidden", "");
  viewer.innerHTML = "";
  document.body.classList.remove("media-lightbox-open");

  if (lastMediaTrigger && document.contains(lastMediaTrigger)) {
    lastMediaTrigger.focus();
  }

  lastMediaTrigger = null;
  return true;
}

function openProductDetail(productId) {
  const product = productById(productId);
  if (!product) return;

  const modal = ensureProductModal();
  const media = Array.isArray(product.media) ? product.media : [];
  const firstVideo = media.find((item) => item.type === "video") || media[0];
  const pictures = media.filter((item) => item.type !== "video");

  modal.innerHTML = `
    <div class="product-modal__backdrop" data-close-product></div>
    <section class="product-modal__panel glass-card" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
      <button class="product-modal__close" type="button" data-close-product aria-label="Close product details">Close</button>
      <div class="product-modal__layout">
        <div class="product-modal__hero">
          ${productVisualTemplate(product, "detail")}
          <div>
            <p class="eyebrow">${escapeHtml(product.category)}</p>
            <h2 id="product-modal-title">${escapeHtml(product.name)}</h2>
            <p>${escapeHtml(product.description)}</p>
            <div class="product-modal__price">
              <strong>${escapeHtml(product.price)}</strong>
              <span>${hasCheckoutUrl(product) ? "One-time purchase" : "Product page coming soon"}</span>
            </div>
            <div class="product-card__actions">
              ${checkoutActionTemplate(product, "button--primary")}
              <button class="button button--secondary" type="button" data-close-product>Keep browsing</button>
            </div>
          </div>

        </div>

        <div class="product-modal__content">
          <div class="product-modal__previews">
            <div>
              <h3>Preview video</h3>
              ${firstVideo ? mediaPreviewTemplate(firstVideo, product.theme, 1) : ""}
            </div>
            <div>
              <h3>Product pictures</h3>
              <div class="modal-media-grid">
                ${pictures.map((item, index) => mediaPreviewTemplate(item, product.theme, index + 1)).join("")}
              </div>
            </div>
          </div>
          <div class="product-modal__facts">
            <div>
              <h3>Included</h3>
              <ul class="modal-list">
                ${(product.includes || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
            <div>
              <h3>Details</h3>
              <ul class="modal-list">
                ${(product.specs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  modal.removeAttribute("hidden");
  document.body.classList.add("product-modal-open");
  modal.querySelector(".product-modal__close").focus();

}

function closeProductDetail() {
  const modal = document.querySelector("[data-product-modal]");
  if (!modal || modal.hasAttribute("hidden")) return;

  closeMediaViewer();
  modal.setAttribute("hidden", "");
  modal.innerHTML = "";
  document.body.classList.remove("product-modal-open");
}

function initProductModalClose() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-media]")) {
      closeMediaViewer();
      return;
    }

    if (event.target.closest("[data-close-product]")) {
      closeProductDetail();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (closeMediaViewer()) return;
      closeProductDetail();
    }
  });
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const lines = [
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Topic: ${formData.get("topic") || ""}`,
      `Order email or receipt ID: ${formData.get("order") || ""}`,
      "",
      "Message:",
      formData.get("message") || ""
    ];

    window.location.href = `mailto:${siteSettings.email}?subject=${encodeURIComponent(siteSettings.contactSubject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
}

updateContactLinks();
initNavigation();
renderProducts();
renderGallery();
initProductInteractions();
initProductModalClose();
initContactForm();
initRevealAnimations();
