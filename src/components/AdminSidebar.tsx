"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      pathname === path
        ? "bg-white text-gray-900 font-semibold"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <nav className="flex flex-col gap-3 mt-6">
        <Link href="/admin" className={linkClass("/admin")}>
          داشبورد
        </Link>

        <Link href="/admin/products" className={linkClass("/admin/products")}>
          محصولات
        </Link>

        <Link href="/admin/products/add" className={linkClass("/admin/products/add")}>
          افزودن محصول
        </Link>
      </nav>
    </aside>
  );
}