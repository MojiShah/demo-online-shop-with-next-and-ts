"use client";
import { createContext, useContext, useEffect, useState } from "react";

//Types
type TShoppingCartContextProviderProps = { children: React.ReactNode };
type TCartItems = { id: number; qty: number };
type TShoppingCartContext = {
  cartItems: TCartItems[];
  handleIncreaseProductQty: (id: number) => void;
  handleDecreaseProductQty: (id: number) => void;
  getProductQty: (id: number) => number;
  handleRemoveProduct : (id:number) =>void;
  cartTotalQty: number;
};

// other infos are stored in db and backend, Only id & qty is needed in front in order to send to backend.
export const ShoppingCartContext = createContext({} as TShoppingCartContext);

export const useShoppingCartContext = () => useContext(ShoppingCartContext);

const ShoppingCartContextProvider = ({
  children,
}: TShoppingCartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<TCartItems[]>([]);

  // In reactjs we use from useLocalStorage Custom hook. Because of server side rendering for
  // both of server and even client components we cant use from it in Next js.

  useEffect(()=>{
    const storedCartItems = localStorage.getItem("cartItems");
    if(storedCartItems) setCartItems(JSON.parse(storedCartItems));
  },[])
  
  useEffect(()=>{localStorage.setItem("cartItems",JSON.stringify(cartItems))},[cartItems])


  const getProductQty = (id: number) => cartItems.find((item) => item.id == id)?.qty || 0;

  const cartTotalQty = cartItems.reduce(
    (totalQty, item) => totalQty + item.qty,
    0,
  );
  /*
        for add to basket we have 3 ststes:
            1. we don't have any items
            2. There are some items
            3. The selected product don't related to us
    */

  const handleIncreaseProductQty = (id: number) => {
    setCartItems((currentItem) => {
      let isNotProductExist = currentItem.find((item) => item.id == id) == null;

      if (isNotProductExist) return [...currentItem, { id, qty: 1 }];
      else {
        return currentItem.map((item) => {
          if (item.id == id) return { ...item, qty: item.qty + 1 };
          else return item;
        });
      }
    });
  };

  /*
        for Ubtract to basket we have 3 ststes:
            1. we just have One item.
            2. There are some items that is more than One and we should subtract from them.
            3. The selected product don't related to us
    */

  const handleDecreaseProductQty = (id: number) => {
    setCartItems((currentItems) => {
      let isLastOne = currentItems.find((item) => item.id == id)?.qty == 1;
      if (isLastOne) return currentItems.filter((item) => item.id != id);
      else return currentItems.map((item) => {
        if(item.id == id) return {...item , qty : item.qty-1};
        else return item;
      });
    });
  };

  const handleRemoveProduct = (id:number) => setCartItems(currentIems => currentIems.filter(item => item.id != id));

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        handleIncreaseProductQty,
        handleDecreaseProductQty,
        getProductQty,
        cartTotalQty,
        handleRemoveProduct
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContextProvider };
