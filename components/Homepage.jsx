"use client"
import { useState } from "react";
import { useOrders } from "./OrderContext";

export default function CartPage() {
  const { cartItems, checkout } = useOrders();
  const [paymentType, setPaymentType] = useState("");

  const handleCheckout = () => {
    if(!paymentType) return alert("To‘lov turini tanlang");
    checkout(paymentType);
    alert(`Buyurtma ${paymentType} orqali yuborildi!`);
    setPaymentType("");
  }

  return (
    <div>
      <h2>Savatcha</h2>
      {cartItems.length===0 ? <p>Bo'sh</p> :
        cartItems.map(i=>(
          <div key={i.id}>
            <p>{i.name} x{i.quantity}</p>
            <p>Naqt: {i.price} so'm</p>
            <p>Karta: {i.cardPrice} so'm</p>
          </div>
        ))
      }

      <select value={paymentType} onChange={e=>setPaymentType(e.target.value)}>
        <option value="">To‘lov turini tanlang</option>
        <option value="Naqt">Naqt</option>
        <option value="Karta">Karta</option>
      </select>

      <button onClick={handleCheckout}>Buyurtmani rasmiylashtirish</button>
    </div>
  )
}