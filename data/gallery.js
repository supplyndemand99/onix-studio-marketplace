/*
  Gallery updater:
  - These are standalone showcase previews for work happening inside UEFN
  - Set image to the screenshot/thumbnail visitors should see
  - Set src when a video should play in the enlarged preview
*/
const galleryImages = [
  {
    productId: "collision-events-system",
    title: "Collision Event Demo",
    category: "UEFN Showcase",
    theme: "arena",
    type: "video",
    image: "images/website-preview.png",
    poster: "images/website-preview.png",
    src: "videos/collision-event-demo.mp4",
    detail: "Custom collision events and gameplay triggers running inside a UEFN test space.",
    featured: true
  },
  {
    productId: "camera-raycast-system",
    title: "Camera Raycast Preview",
    category: "UEFN Showcase",
    theme: "quest",
    type: "image",
    image: "images/website-preview.png",
    detail: "Look-based detection and interaction targeting tests for player-camera systems.",
    featured: true
  },
  {
    productId: "modular-building-system",
    title: "Building Placement Flow",
    category: "UEFN Showcase",
    theme: "lobby",
    type: "image",
    image: "images/website-preview.png",
    detail: "Snapping, placement, and Scene Graph structure handling for a custom building flow.",
    featured: true
  },
  {
    productId: "material-pack-vol-1",
    title: "Material Showcase",
    category: "UEFN Showcase",
    theme: "economy",
    type: "image",
    image: "images/website-preview.png",
    detail: "Creator-ready materials and environment polish tests for future material packs.",
    featured: true
  }
];

window.galleryImages = galleryImages;
