/*
  Gallery updater:
  - These are preview slots that use CSS visuals
  - Set productId to connect a preview to a product detail modal
  - Replace or expand these later with real screenshots/video links
*/
const galleryImages = [
  {
    productId: "rift-arena-framework",
    title: "Arena Flythrough",
    category: "Video Preview",
    theme: "arena",
    type: "video",
    detail: "Product video area for a trailer or walkthrough.",
    featured: true
  },
  {
    productId: "tycoon-economy-core",
    title: "Upgrade Flow",
    category: "Screenshot",
    theme: "economy",
    type: "image",
    detail: "Preview area for upgrade paths and shop logic.",
    featured: true
  },
  {
    productId: "quest-pulse-kit",
    title: "Quest Objective State",
    category: "Screenshot",
    theme: "quest",
    type: "image",
    detail: "Preview area for objectives, prompts, and rewards.",
    featured: true
  },
  {
    productId: "creator-lobby-suite",
    title: "Lobby Reveal",
    category: "Video Preview",
    theme: "lobby",
    type: "video",
    detail: "Product video area for a cinematic lobby reveal.",
    featured: true
  }
];

window.galleryImages = galleryImages;
