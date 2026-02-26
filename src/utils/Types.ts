export type TDiscount = {
    id:number,
    code:string,
    percentage:number
};

export interface IProductItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
};

export interface IProductList{
    first:number | null;
    items:number | null;
    last:number | null;
    next:number | null;
    pages:number;
    prev:number | null;
    data:IProductItemProps[];
};

