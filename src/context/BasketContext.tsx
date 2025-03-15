// src/context/BasketContext.tsx

import { createContext, useContext, useState, ReactNode } from "react";

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  comment?: string;
}

interface BasketContextType {
  basket: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromBasket: (id: number) => void;
  updateComment: (id: number, comment: string) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const addToBasket = (item: BasketItem) => {
    setBasket((prev) => [...prev, item]);
  };

  const increaseQuantity = (id: number) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromBasket = (id: number) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateComment = (id: number, comment: string) => {
    setBasket((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, comment } : item
      )
    );
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, increaseQuantity, decreaseQuantity, removeFromBasket, updateComment }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
