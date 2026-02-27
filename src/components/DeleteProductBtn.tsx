"use client";

import { useRouter } from "next/navigation";

export default function DeleteProductBtn({ id }: { id: number }) {
  const router = useRouter();

  const handleClick = async () => {
    await fetch(`http://localhost:3001/allProducts/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return(<button
    className="bg-red-700 text-white px-4 py-2 rounded-md border-red-700
   hover:bg-white hover:border-white hover:text-red-700 transition duration-300"
    onClick={handleClick}
  >
    حذف محصول
  </button>)
  
}
