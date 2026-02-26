"use client";
import { useEffect, useState } from "react";
import { IProductItemProps } from "./ProductItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumberWithCommas } from "@/utils/number";

interface ICartItemProps {
  id: number;
  qty: number;
}

const CartItem = ({ id, qty }: ICartItemProps) => {
  const [basket, setBasket] = useState({} as IProductItemProps);
  const {
    handleIncreaseProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCartContext();

  useEffect(() => {
    fetch(`http://localhost:3001/allProducts/${id}`)
      .then((res) => res.json())
      .then((data) => setBasket(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-12 bg-slate-100 mb-4 p-4">
        <img 
        src={basket.image}
        alt="product"
        className="col-span-2 w-full h-fit border-2 rounded-2xl p-3 bg-white"
      />
      <div className="col-span-10 text-right p-4">
        <h2 className="text-xl font-bold">{basket.name}</h2>
        <p>
          تعداد: <span>{qty}</span>
        </p>
        <p className="rtl">
          قیمت محصول: <span>{basket.price}</span>
        </p>

        <div className="mt-4">
          <button
            className="px-4 py-2 rounded bg-sky-500 text-white"
            onClick={() => handleIncreaseProductQty(basket.id)}
          >
            +
          </button>
          <span className="mx-4">{qty}</span>
          <button
            className="px-4 py-2 rounded bg-sky-500 text-white"
            onClick={() => handleDecreaseProductQty(basket.id)}
          >
            -
          </button>

          <div className="mt-3">
            <button
              className="bg-red-500 text-white px-7 py-2 rounded-md"
              onClick={() => handleRemoveProduct(id)}
            >
              حذف از سبد
            </button>
          </div>

        </div>
      </div>

      
    </div>
  );
};

export default CartItem;
