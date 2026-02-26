"use client";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { IProductItemProps } from "@/components/ProductItem";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import React, { useEffect, useState } from "react";

const cart = () => {
  const { cartItems } = useShoppingCartContext();
  const [products, setProducts] = useState<IProductItemProps[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  console.log("products=> ", products);
  console.log("cartItems=> ", cartItems);

  return (
    <Container>
      <h1>سبد خرید</h1>
      <div className="">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="border shadow-md text-right p-4">
        <h3 className="rtl">
          قیمت کل:
          <span>{cartItems.reduce((total,item)=>{
            let selectedProduct = products.find(x => x.id == item.id);
            return total + (selectedProduct?.price || 0)*item.qty
          },0)} </span>
        </h3>

        <h3 className="rtl">
          سود شما از این خرید: <span>5$</span>
        </h3>

        <h3 className="rtl">
          قیمت نهایی: <span>69$</span>
        </h3>

        <div className="flex flex-col">
          <button className="bg-sky-600 text-white px-4 py-1 rounded mb-2">
            {" "}
            اعمال تغییرات
          </button>
          <input
            type="text"
            placeholder="کد تخفیف خود را وارد کنید."
            className="rtl text-right border px-2 py-0.5"
          />
        </div>
      </div>
    </Container>
  );
};

export default cart;
