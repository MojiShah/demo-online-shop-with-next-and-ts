"use client";
import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  const navLinks = [
    { href: "/", title:  " خانه " },
    { href: "/store", title: "فروشگاه  " },
  ];
  return (
    <nav className="shadow p-4">
      <Container>
        {navLinks.map((navLink) => (
          <Link
            className={`p-4 ${pathName === navLink.href ? "bg-sky-950 text-white" : ""}`}
            key={navLink.href}
            href={navLink.href}
          >
          {navLink.title}
          </Link>
        ))}
      </Container>
    </nav>
  );
};

export default Navbar;
