import DeleteProductBtn from "@/components/DeleteProductBtn";
import { IProductItemProps } from "@/utils/Types";
import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3001/allProducts", {
    cache: "no-store",
  });
  return res.json();
}

export default async function AdminProducts() {
  const products = await getProducts();
    
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">مدیریت محصولات</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">نام</th>
            <th className="p-3 text-left">قیمت</th>
            <th className="p-3 text-left">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: IProductItemProps) => (
            <tr key={product.id} className="border-b">
              <td className="p-3">{product.name}</td>
              <td className="p-3">{product.price}</td>
              <td className="p-3 space-x-3">
                <button className="text-blue-600">ویرایش</button>
                <DeleteProductBtn id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}