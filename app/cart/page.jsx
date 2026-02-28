"use client"
import React,{useState} from "react"
import {ShoppingBag,ArrowLeft,Trash2,Plus,Minus,ShoppingCart} from "lucide-react"
import Link from "next/link"

const c="#5c00b8"

export default function CartPage(){

  const [cartItems,setCartItems]=useState([
    { id:1, name:"Classic Burger", price:255000, cardPrice:245000, img:"https://www.lurch.de/media/b5/4c/70/1693989554/burger-classic-cheese-rezept.jpg", quantity:1 },
    { id:2, name:"Cheese Burger", price:275000, cardPrice:265000, img:"https://www.lurch.de/media/b5/4c/70/1693989554/burger-classic-cheese-rezept.jpg", quantity:1 }
  ])

  const [modalOpen,setModalOpen]=useState(false)
  const [paymentType,setPaymentType]=useState("")
  const [deleteModalOpen,setDeleteModalOpen]=useState(false)
  const [itemToDelete,setItemToDelete]=useState(null)

  const plus=id=>setCartItems(cartItems.map(i=>i.id===id?{...i,quantity:i.quantity+1}:i))
  const minus=id=>setCartItems(cartItems.map(i=>i.id===id&&i.quantity>1?{...i,quantity:i.quantity-1}:i))

  const totalCash=cartItems.reduce((s,i)=>s+i.price*i.quantity,0)
  const totalCard=cartItems.reduce((s,i)=>s+i.cardPrice*i.quantity,0)

  const handleOrderClick=()=>setModalOpen(true)
  const handlePaymentSelect=(type)=>{
    setPaymentType(type)
    setModalOpen(false)
    alert(`Siz ${type} orqali to‘lov qilmoqchisiz!`)
  }

  const confirmDelete=(item)=>{
    setItemToDelete(item)
    setDeleteModalOpen(true)
  }

  const handleDelete=()=>{
    if(itemToDelete){
      setCartItems(cartItems.filter(i=>i.id!==itemToDelete.id))
      setItemToDelete(null)
    }
    setDeleteModalOpen(false)
  }

  const cancelDelete=()=>{
    setItemToDelete(null)
    setDeleteModalOpen(false)
  }

  return(
    <div style={{minHeight:"100vh",background:"#fff",fontFamily:"sans-serif"}}>

      {/* HEADER */}
      <header style={{
        padding:"15px 30px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        borderBottom:`2px solid ${c}`
      }}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:6,color:c,textDecoration:"none",fontWeight:600}}>
          <ArrowLeft size={20}/> Menu
        </Link>
        <h2 style={{color:c,margin:0}}>Savatcha</h2>
        <div style={{position:"relative"}}>
          <ShoppingCart size={26} color={c}/>
          <span style={{
            position:"absolute",top:-5,right:-5,
            background:c,color:"#fff",
            borderRadius:"50%",width:18,height:18,
            fontSize:11,display:"flex",justifyContent:"center",alignItems:"center"
          }}>
            {cartItems.length}
          </span>
        </div>
      </header>

      {/* BODY */}
      <main style={{maxWidth:800,margin:"20px auto",padding:"0 15px"}}>

        {cartItems.length===0 && (
          <div style={{textAlign:"center",marginTop:80}}>
            <ShoppingBag size={60} color={c}/>
            <p>Bo'sh</p>
          </div>
        )}

        {cartItems.map(i=>(
          <div key={i.id} style={{
            display:"flex",alignItems:"center",gap:15,
            padding:12,marginBottom:12,
            borderRadius:14,boxShadow:"0 3px 10px rgba(0,0,0,0.06)",
            transition:"0.2s",
          }}
          onMouseEnter={e=>{
            e.currentTarget.style.transform="translateY(-2px)"
            e.currentTarget.style.boxShadow=`0 6px 18px rgba(92,0,184,0.15)`
          }}
          onMouseLeave={e=>{
            e.currentTarget.style.transform="translateY(0)"
            e.currentTarget.style.boxShadow="0 3px 10px rgba(0,0,0,0.06)"
          }}>
            <img src={i.img} style={{width:70,height:70,borderRadius:10}}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{i.name}</div>
              <div style={{color:"#555"}}>Naqt: {i.price.toLocaleString()} so'm</div>
              <div style={{color:c,fontWeight:700}}>Karta: {i.cardPrice.toLocaleString()} so'm</div>
            </div>

            <div style={{
              display:"flex",alignItems:"center",gap:10,
              background:"#f4ebff",padding:"4px 10px",
              borderRadius:10,fontWeight:600
            }}>
              <Minus size={16} color={c} style={{cursor:"pointer"}} onClick={()=>minus(i.id)}/>
              {i.quantity}
              <Plus size={16} color={c} style={{cursor:"pointer"}} onClick={()=>plus(i.id)}/>
            </div>

            <Trash2 size={18} color="#999" style={{cursor:"pointer"}} onClick={()=>confirmDelete(i)}/>
          </div>
        ))}

        {cartItems.length>0 && (
          <div style={{
            marginTop:20,padding:15,borderRadius:14,
            boxShadow:"0 3px 10px rgba(0,0,0,0.06)"
          }}>
            <div style={{marginBottom:10,fontWeight:700}}>
              <div>Naqt jami: <span style={{color:c}}>{totalCash.toLocaleString()} so'm</span></div>
              <div>Karta jami: <span style={{color:c}}>{totalCard.toLocaleString()} so'm</span></div>
            </div>
            <button onClick={handleOrderClick} style={{
              width:"100%",padding:14,
              background:c,color:"#fff",
              border:"none",borderRadius:10,
              fontWeight:600,fontSize:15,cursor:"pointer"
            }}>Buyurtmani rasmiylashtirish</button>
          </div>
        )}

      </main>

      {/* PAYMENT MODAL */}
      {modalOpen && (
        <div style={{
          position:"fixed",top:0,left:0,width:"100%",height:"100%",
          background:"rgba(0,0,0,0.5)",
          display:"flex",justifyContent:"center",alignItems:"center",
          zIndex:1000
        }}>
          <div style={{
            background:"#fff",padding:20,borderRadius:12,
            width:"90%",maxWidth:400,boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{marginBottom:15}}>To‘lov turini tanlang</h3>
            <div style={{display:"flex",gap:12}}>
              <button onClick={()=>handlePaymentSelect("Naqt")} style={{
                flex:1,padding:12,borderRadius:10,
                border:"none",background:c,color:"#fff",cursor:"pointer",
                fontWeight:600
              }}>Naqt pul</button>
              <button onClick={()=>handlePaymentSelect("Karta")} style={{
                flex:1,padding:12,borderRadius:10,
                border:"none",background:c,color:"#fff",cursor:"pointer",
                fontWeight:600
              }}>Karta</button>
            </div>
            <button onClick={()=>setModalOpen(false)} style={{
              marginTop:15,width:"100%",padding:10,
              borderRadius:10,border:"none",background:"#eee",cursor:"pointer"
            }}>Bekor qilish</button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteModalOpen && (
        <div style={{
          position:"fixed",top:0,left:0,width:"100%",height:"100%",
          background:"rgba(0,0,0,0.5)",
          display:"flex",justifyContent:"center",alignItems:"center",
          zIndex:1000
        }}>
          <div style={{
            background:"#fff",padding:20,borderRadius:12,
            width:"90%",maxWidth:350,boxShadow:"0 5px 15px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{marginBottom:15}}>Haqiqatan ham o‘chirmoqchimisiz?</h3>
            <div style={{display:"flex",gap:12}}>
              <button onClick={handleDelete} style={{
                flex:1,padding:12,borderRadius:10,
                border:"none",background:c,color:"#fff",cursor:"pointer",
                fontWeight:600
              }}>Ha</button>
              <button onClick={cancelDelete} style={{
                flex:1,padding:12,borderRadius:10,
                border:"none",background:"#eee",cursor:"pointer",
                fontWeight:600
              }}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}