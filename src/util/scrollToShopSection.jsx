export const scrollToShopSection = () => {
  const shopSection = document.getElementById("shop-section");
  if (shopSection) {
    const yOffset = window.innerWidth > 768 ? -120 : -80;
    const yPosition =
      shopSection.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: yPosition, behavior: "smooth" });
  }
};
