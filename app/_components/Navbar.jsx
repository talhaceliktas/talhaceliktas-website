import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center z-10 justify-around">
      <Link
        href="#"
        className="text-[2.5rem] font-light overflow-hidden font-moneral logo "
      >
        celiktas
      </Link>
      <div>sfgs</div>
    </nav>
  );
};

export default Navbar;
