import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function  POST(req:Request) {
    const data = await req.formData();
    const file : File | null = data.get("file") as unknown as File;

    if(!file)
        return NextResponse.json({error:"No file uploaded."},{status:400});

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDirection = path.join(process.cwd(),'public/img/uploads');
    const filePath = path.join(uploadDirection,file.name);

    await writeFile(filePath,buffer);
    return NextResponse.json({
    imageUrl: `/img/uploads/${file.name}`,
  });
}

export async function  GET(req:Request){
  return NextResponse.json({
    imageUrl: `img/uploads`,
  });
}