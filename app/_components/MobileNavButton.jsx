import React from "react";

const MobileNavButton = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <button
      className="z-50 flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
          isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
        }`}
      />
    </button>
  );
};

export default MobileNavButton;
