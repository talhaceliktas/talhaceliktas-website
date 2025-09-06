export function findNavLocation() {
  const logo = document.querySelector(".logo");
  const surnameEl = document.querySelector(".surname");

  if (!logo || !surnameEl) return { x: 0, y: 0 };

  const logoRect = logo.getBoundingClientRect();
  const surnameRect = surnameEl.getBoundingClientRect();

  const logoCenterX = logoRect.left + logoRect.width / 2;
  const logoCenterY = logoRect.top + logoRect.height / 2;

  const surnameCenterX = surnameRect.left + surnameRect.width / 2;
  const surnameCenterY = surnameRect.top + surnameRect.height / 2;

  return {
    x: logoCenterX - surnameCenterX,
    y: logoCenterY - surnameCenterY,
  };
}

export const pages = ["About", "Portfolio", "Skills", "Contact", "Playground"];
