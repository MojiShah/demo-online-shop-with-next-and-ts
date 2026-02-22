"use client";
import { createContext, useState } from "react";

type TShoppingCartContextProviderProps = { children: React.ReactNode };
type TCartItems = { id: number; qty: number };
// other infos are stored in db and backend, Only id & qty is needed in front in order to send to backend.

const ShoppingCartContext = createContext({});

const ShoppingCartContextProvider = ({children}: TShoppingCartContextProviderProps) => {

    const [cartItems , setCartItems] = useState<TCartItems[]>([]);

    /*
        for add to basket we have 3 ststes:
            1. we don't have any items
            2. There are some items
            3. The selected product don't related to us
    */

    const handleIncreaseProductQty = (id:number) => {
        setCartItems((currentItem) => {
            let isNotProductExist = currentItem.find(item => item.id == id) == null;

            if(isNotProductExist)
                return [...currentItem,{id,qty:1}];
            else{
                return currentItem.map(item=>{
                    if(item.id==id)
                        return {...item,qty:item.qty+1}
                    else
                        return item
                })
            }
        })
    }

  return (
    <ShoppingCartContext.Provider value={{cartItems}}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContextProvider };
