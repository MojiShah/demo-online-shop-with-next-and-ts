"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const router = useRouter();
  const [searchItem, setSearchItem] = useState("");

  const handleSearch =() => router.push(`/store?title=${searchItem}`)

  return (
    <div className=" h-20">
      <input
        type="text"
        placeholder="محصول خود را جستجو کنید ..."
        className="bg-slate-100 px-4 py-2 border-[.5] rounded-md font-light"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      <button
        className="bg-sky-800 text-white px-4 py-2 rounded-lg mt-2"
        onClick={handleSearch}
      >
        جستجو
      </button>
    </div>
  );
};

export default Search;
