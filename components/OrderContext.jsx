"use client"
import { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(i => i.id === product.id);
      if(exist){
        return prev.map(i => i.id===product.id ? {...i, quantity:i.quantity+1} : i);
      }else{
        return [...prev, {...product, quantity:1}];
      }
    });
  };

  const checkout = (paymentType) => {
    const newOrders = cartItems.map(i => ({
      ...i,
      paymentType,
      delivered: false,
    }));
    setAdminOrders(prev => [...prev, ...newOrders]);
    setCartItems([]);
  };

  const deleteOrder = (id) => {
    setAdminOrders(prev => prev.filter(o => o.id !== id));
  };

  const markDelivered = (id) => {
    setAdminOrders(prev => prev.map(o => o.id===id ? {...o, delivered:true} : o));
  };

  return (
    <OrderContext.Provider value={{
      cartItems, addToCart, checkout,
      adminOrders, deleteOrder, markDelivered
    }}>
      {children}
    </OrderContext.Provider>
  );
};