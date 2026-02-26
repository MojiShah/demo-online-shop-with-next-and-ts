import Container from "@/components/Container";
import FilterProduct from "@/components/FilterProduct";
import Pagination from "@/components/Pagination";
import ProductItem from "@/components/ProductItem";
import Search from "@/components/Search";
import { IProductItemProps, IProductList } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";

interface IProductPaginationProps {
  params: Promise<{}>;
  searchParams: Promise<{
    page: string;
    per_page: string;
    title: string;
    min: string;
    max: string;
  }>;
}

const Store = async ({ searchParams }: IProductPaginationProps) => {
  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "6";
  const title = (await searchParams).title ?? "";
  const min = (await searchParams).min ?? "";
  const max = (await searchParams).max ?? "";

  let query = title?.trim() ? `&name=${encodeURIComponent(title.trim())}` : "";
  if (min) query += `&price_gte=${min}`;
  if (max) query += `&price_lte=${max}`;

  const response = await fetch(
    `http://localhost:3001/allProducts?_page=${page}&_per_page=${per_page}${query}`,
    { cache: "no-store" }
  );
  const data = (await response.json()) as IProductList;
  console.log("title => ", title);

  return (
    <Container>
      <h1 className="text-4xl p-4">فروشگاه</h1>

      <div className="flex justify-between items-start">
        <div className="flex flex-col px-4 border-l-[1] my-10">
          <Search />
          <FilterProduct />
        </div>

        <div className="">
          <div className=" p-5 grid grid-cols-2 md:grid-cols-3 gap-6">
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
        </div>
      </div>
    </Container>
  );
};

export default Store;
