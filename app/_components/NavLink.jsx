"use client";

import Link from "next/link";

const NavLink = ({ href, children, onClick = null }) => {
  if (!onClick)
    return (
      <Link href={href} className="nav-link relative overflow-hidden">
        {children}
      </Link>
    );

  return (
    <Link
      href={href}
      className="text-white transition-colors hover:text-gray-300"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
