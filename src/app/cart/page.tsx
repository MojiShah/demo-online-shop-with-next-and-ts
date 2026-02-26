"use client";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import { useShoppingCartContext } from "@/context/ShoppingCartContext";
import { formatNumberWithCommas } from "@/utils/number";
import { IProductItemProps, TDiscount } from "@/utils/Types";
import React, { useEffect, useState } from "react";

const cart = () => {
  const { cartItems } = useShoppingCartContext();
  const [products, setProducts] = useState<IProductItemProps[]>([]);
  const [disCountCode, setDisCountCode] = useState("");
  const [disCountedPrice,setDisCountedPrice]=useState(0);
  const [finalPrice,setFinalPrice]=useState(0);
  

  useEffect(() => {
    fetch("http://localhost:3001/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  let totalPrice = cartItems.reduce((total, item) => {
    let selectedProduct = products.find((x) => x.id == item.id);
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleDiscount = () => {
    fetch(`http://localhost:3001/discounts?code=${disCountCode}`)
      .then((res) => res.json())
      .then((data:TDiscount[]) => {
        // console.log("data =>", data);
        let CalculatedDisCountedPrice = (data[0].percentage/100)*totalPrice;
        let CalculatedFinalPrice = totalPrice-CalculatedDisCountedPrice;
        setDisCountedPrice(CalculatedDisCountedPrice);
        setFinalPrice(CalculatedFinalPrice);
      });
  };

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
          <span>{formatNumberWithCommas(totalPrice)}</span>
        </h3>

        <h3 className="rtl">
          سود شما از این خرید: <span>{disCountedPrice} تومان</span>
        </h3>

        <h3 className="rtl">
          قیمت نهایی: <span>{formatNumberWithCommas(finalPrice)} تومان</span>
        </h3>

        <div className="flex flex-col">
          <button
            className="bg-sky-600 text-white px-4 py-1 rounded mb-2"
            onClick={handleDiscount}
          >
            {" "}
            اعمال تغییرات
          </button>
          <input
            type="text"
            placeholder="کد تخفیف خود را وارد کنید."
            className="rtl text-right border px-2 py-0.5"
            value={disCountCode}
            onChange={(e) => setDisCountCode(e.target.value)}
          />
        </div>
      </div>
    </Container>
  );
};

export default cart;
