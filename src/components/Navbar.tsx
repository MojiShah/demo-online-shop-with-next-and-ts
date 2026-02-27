"use client";
import Link from "next/link";
import Container from "./Container";
import { usePathname } from "next/navigation";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";

const Navbar = () => {
  const pathName = usePathname();
  const { cartTotalQty } = useShoppingCartContext();

  const navLinks = [
    { href: "/", title: " خانه " },
    { href: "/store", title: "فروشگاه  " },
    { href: "/admin", title: "پنل مدیریت  " },
    { href: "/about", title: "درباره ما" },
  ];
  return (
    <nav className="shadow p-4 w-full sticky">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            {navLinks.map((navLink) => (
              <Link
                className={`p-4 ${pathName === navLink.href ? "bg-sky-950 text-white" : ""}`}
                key={navLink.href}
                href={navLink.href}
              >
                {navLink.title}
              </Link>
            ))}
          </div>

          <div className="relative">
            {cartTotalQty > 0 && ( 
              <span className="absolute -left-1 -top-4 px-2 py-1 bg-red-500 text-white rounded-full">
                {cartTotalQty}
              </span>
            )}
            <Link
              href="/cart"
              className={`p-4 ${pathName === "/cart" ? "bg-sky-950 text-white" : ""}`}
            >
              سبد خرید
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
