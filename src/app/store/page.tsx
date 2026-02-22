import Container from "@/components/Container";
import ProductItem from "@/components/ProductItem";
import Image from "next/image";
import Link from "next/link";
import { IProductItemProps } from "@/components/ProductItem";

const Store = async () => {
  const response = await fetch("http://localhost:3001/allProducts");
  const data = (await response.json()) as IProductItemProps[];
  console.log(data);
  return (
    <Container>
      <h1 className="px-4 py-5  text-4xl font-bold">فروشگاه </h1>
      <div className=" p-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((product: IProductItemProps) => (
          <Link href={`/store/${product.id}`} key={product.id}>
            <ProductItem {...product} />
            {/* <ProductItem
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              desc={product.desc}
            /> */}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Store;
