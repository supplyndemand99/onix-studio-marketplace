/*
  Gallery updater:
  - These are preview slots that use CSS visuals
  - Set productId to connect a preview to a product detail modal
  - Replace or expand these later with real screenshots/video links
*/
const galleryImages = [
  {
    productId: "collision-events-system",
    title: "Collision Event Demo",
    category: "Video Preview",
    theme: "arena",
    type: "video",
    detail: "Preview area for custom collision events and gameplay triggers.",
    featured: true
  },
  {
    productId: "camera-raycast-system",
    title: "Camera Raycast Preview",
    category: "Video Preview",
    theme: "quest",
    type: "video",
    detail: "Preview area for look-based detection and interaction targeting.",
    featured: true
  },
  {
    productId: "modular-building-system",
    title: "Building Placement Flow",
    category: "Screenshot",
    theme: "lobby",
    type: "image",
    detail: "Preview area for snapping, placement, and Scene Graph structure handling.",
    featured: true
  },
  {
    productId: "material-pack-vol-1",
    title: "Material Showcase",
    category: "Screenshot",
    theme: "economy",
    type: "image",
    detail: "Preview area for useful creator-ready materials and environment polish.",
    featured: true
  }
];

window.galleryImages = galleryImages;
