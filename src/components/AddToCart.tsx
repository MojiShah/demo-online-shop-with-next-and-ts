"use client";

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

interface IAddToCartProps {
  id: string;
}

const AddToCart = ({ id }: IAddToCartProps) => {
  const {
    cartItems,
    handleIncreaseProductQty,
    getProductQty,
    handleDecreaseProductQty,
  } = useShoppingCartContext();
  console.log("cartItems => ", cartItems);

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-700 text-white text-3xl font-semibold rounded-md"
        onClick={() => handleIncreaseProductQty(parseInt(id))}
      >
        +
      </button>
      <span className="px-4 text-2xl">{getProductQty(parseInt(id))}</span>
      <button
        className="px-4 py-2 bg-blue-700 text-white text-3xl font-semibold rounded-md"
        onClick={() => handleDecreaseProductQty(parseInt(id))}
      >
        -
      </button>
    </div>
  );
};

export default AddToCart;
