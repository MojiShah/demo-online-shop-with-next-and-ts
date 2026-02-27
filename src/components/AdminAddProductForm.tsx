"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface IProductFormState {
  name: string;
  price: number;
  desc: string;
}

export default function AdminAddProductForm() {
  const router = useRouter();


  //states
  const [formData, setFormData] = useState<IProductFormState>({
    name: "",
    price: 0,
    desc: "",
  });

  const [file,setFile]= useState<File | null>(null);



  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]:name === "price" ? Number(value) : value})
  };

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    if(!file){
        alert("لطفا عکس محصول را انتخاب نمایید.");
        return;
    }

    //1.image upload
    const uploadFormData = new FormData();
    uploadFormData.append("file",file);
    const uploadRes = await fetch("/api/upload",{
        method:"POST",
        body:uploadFormData
    });
    const { imageUrl } = await uploadRes.json();
    

    //2. make product object according to db.json
    const newProduct = {
        id:Date.now().toString(),
        ...formData,
        image:imageUrl
    }

    //3.send product infos to json-server
    await fetch("http://localhost:3001/allProducts",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newProduct)
    })

    router.push('/admin/products')
  };

  return (
    <div className="w-full bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-400 rounded-md shadow-2xl w-full space-y-4 p-8"
      >
        <h2 className="text-xl font-bold">افزودن محصول</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="نام محصول"
            className="w-full border bg-slate-50 p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="قیمت"
            className="w-full border bg-slate-50 p-2 rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            placeholder="قیمت"
            className="w-2/3 border p-2 rounded bg-slate-500"
            onChange={e=>setFile(e.target.files?.[0] || null)}
          />
        </div>

        <textarea
          name="desc"
          placeholder="توضیحات"
          className="w-full mt-4 border p-2 bg-slate-50 rounded"
          value={formData.desc}
          onChange={handleChange}
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
