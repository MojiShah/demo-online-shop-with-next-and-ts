import { IProductItemProps } from "@/utils/Types";
import Image from "next/image";
import React from "react";



const ProductItem = ({id,name,price,image,desc}:IProductItemProps) => {
  return (
    <div className="shadow-md p-4 rounded-2xl ">
      <Image
        src={image}
        alt={name}
        height={200}
        width={200}
        className="w-full h-56"
      />
      <h2 className="inline-block text-xl font-bold mx-2 my-3">{name}</h2>
      <p className="inline-block">
        {" "}
        <span> {price} </span>تومان
      </p>
      <p>{desc}</p>
    </div>
  );
};

export default ProductItem;
