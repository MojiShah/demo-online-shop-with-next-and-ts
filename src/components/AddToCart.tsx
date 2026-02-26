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
    handleRemoveProduct,
  } = useShoppingCartContext();
 

  return (
    <div className="flex flex-col">
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

      <div className="mt-3">
        <button
          className="bg-red-500 text-white px-7 py-2 rounded-md"
          onClick={() => handleRemoveProduct(parseInt(id))}
        >
          حذف از سبد
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
