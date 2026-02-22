import { IProductItemProps } from "@/components/ProductItem";
import Image from "next/image";


interface IProductDetailProps{
  params:Promise<{id:string}>;
  serchParams:Promise<{}>;
}

const productDetail = async ({params}:IProductDetailProps) => {
  const {id} = await params;

  const res = await fetch(`http://localhost:3001/allProducts/${id}`);
  const data = (await res.json()) as IProductItemProps;
  console.log(data)
  return (
    <div className="grid grid-cols-12 mt-8 p-7 shadow-md">

      <div className="col-span-3">
        <Image
          src={data.image}
          alt={data.name}
          height={200}
          width={200}
          className="w-full"
        />
      </div>

      <div className="col-span-9 text-right p-4">

        <h2 className="inline-block text-2xl font-bold mx-2 my-3">
         {data.name}
        </h2>

        <p className="text-gray-500">
          {data.desc}
        </p>

        <p className="text-left">
          {" "}
          <span>{data.price} </span>تومان
        </p>

        <button className="px-4 py-2 bg-blue-700 text-white text-3xl font-semibold rounded-md">+</button>
        <span className="px-4 text-2xl">3</span>
        <button className="px-4 py-2 bg-blue-700 text-white text-3xl font-semibold rounded-md">-</button>
      </div>
    </div>
  );
};

export default productDetail;
