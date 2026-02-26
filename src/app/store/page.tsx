import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import { IProductItemProps, IProductList } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";

interface IProductPaginationProps {
  params: Promise<{}>;
  searchParams: Promise<{page:string;per_page:string;}>;
}

const Store = async ({searchParams}:IProductPaginationProps) => {

  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "6";


  const response = await fetch(
    `http://localhost:3001/allProducts?_page=${page}&_per_page=${per_page}`,
  );
  const data = (await response.json()) as IProductList;
  // console.log("data => ",typeof(data.pages))
  
  return (
    <Container>
      <h1 className="px-4 py-5  text-4xl font-bold">فروشگاه </h1>
      <div className=" p-5 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.data.map((product: IProductItemProps) => (
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


      <Pagination pageCount={data.pages} />
    </Container>
  );
};

export default Store;
