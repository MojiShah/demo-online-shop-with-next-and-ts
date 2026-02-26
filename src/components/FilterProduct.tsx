"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const MIN = 0;
const MAX = 9000;
const STEP = 100;

const FilterProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min")) || MIN
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max")) || MAX
  );

  const title = searchParams.get("title") || "";

  const handleMinChange = (value: number) => {
    if (value > maxPrice) return; // جلوگیری از عبور از max
    setMinPrice(value);
  };

  const handleMaxChange = (value: number) => {
    if (value < minPrice) return; // جلوگیری از کمتر شدن از min
    setMaxPrice(value);
  };

  const applyFilter = () => {
    const params = new URLSearchParams();

    if (title) params.set("title", title);
    params.set("min", String(minPrice));
    params.set("max", String(maxPrice));
    // params.set("page", "1");
    // params.set("per_page", "6");

    router.push(`/store?${params.toString()}`);
  };

  return (
    <div className="h-60 px-4 my-10 flex flex-col gap-4">
      <h3 className="font-semibold">فیلتر بازه قیمت</h3>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>{minPrice}</span>
          <span>{maxPrice}</span>
        </div>

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={minPrice}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="w-full"
        />

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={maxPrice}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <button
        onClick={applyFilter}
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        اعمال فیلتر
      </button>
    </div>
  );
};

export default FilterProduct;