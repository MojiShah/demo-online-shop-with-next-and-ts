import Container from "@/components/Container";
import Image from "next/image";

export default async function Home() {

  
  return (
    <Container>
      <h1 className="px-4 py-5  text-4xl font-bold">صفحه اصلی</h1>
      <Image
        src="/img/Shopping.jfif"
        alt="shopping-home"
        width={600}
        height={600}
        className="rounded-2xl shadow-2xl w-3/5 mx-auto"
      />
    </Container>
  );
}
