"use client";

import React, { useState } from "react";
import Navbar3 from "../components/Navbar3";

export default function AdminPage() {
  const [categories, setCategories] = useState([
    { id: "burger", name: "Burger", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400" },
    { id: "fries", name: "Fries", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400" },
    { id: "pizza", name: "Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
    { id: "drink", name: "Drink", img: "https://images.unsplash.com/photo-1543253687-c931c8e01820?w=400" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImg, setNewImg] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false); // delete modal
  const [deleteId, setDeleteId] = useState(null);

  // Buyurtmalar uchun
  const [orders, setOrders] = useState([
    { id: "ORD001", items: ["Burger", "Fries"], total: "$12" },
    { id: "ORD002", items: ["Pizza", "Drink"], total: "$15" },
    { id: "ORD003", items: ["Burger", "Drink"], total: "$10" },
  ]);
  const [expandedOrders, setExpandedOrders] = useState({}); // toggle

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewImg(reader.result);
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingId(null);
    setNewName("");
    setNewImg(null);
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setEditingId(cat.id);
    setNewName(cat.name);
    setNewImg(cat.img);
    setShowModal(true);
  };

  const saveCategory = () => {
    if (!newName || !newImg) return alert("Iltimos nom va rasm tanlang");
    if (editingId) {
      setCategories(categories.map(cat => cat.id === editingId ? { ...cat, name: newName, img: newImg } : cat));
    } else {
      const newCat = {
        id: newName.toLowerCase().replace(/\s+/g, "-"),
        name: newName,
        img: newImg,
      };
      setCategories([...categories, newCat]);
    }
    setShowModal(false);
    setNewName("");
    setNewImg(null);
    setEditingId(null);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setCategories(categories.filter(cat => cat.id !== deleteId));
    setDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteModal(false);
    setDeleteId(null);
  };

  const toggleOrder = (id) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <Navbar3 />

      {/* Kategoriya qo'shish */}
      <div style={{ display: "flex", margin:"20px", marginTop: "20px" }}>
        <button className="add-btn" onClick={openAddModal}>
          + Kategoriya qo'shish
        </button>
      </div>

      {/* Kategoriyalar */}
      <div className="menyu">
        {categories.map((cat) => (
          <div key={cat.id} className="menu-card">
            <img src={cat.img} alt={cat.name} className="menu-img" />
            <div className="menu-overlay">
              <div className="menu-actions">
                <button onClick={() => openEditModal(cat)}>Yangilash</button>
                <button onClick={() => openDeleteModal(cat.id)} className="delete-btn">O'chirish</button>
              </div>
            </div>
            <div className="menu-content">
              <span className="menu-name">{cat.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Buyurtmalar bo'limi */}
      <div style={{ padding: "20px" }}>
        <h2>Buyurtmalar</h2>
        <div className="orders">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>{order.id}</span>
                <button onClick={() => toggleOrder(order.id)}>
                  {expandedOrders[order.id] ? "↡" : "↟"}
                </button>
              </div>
              {expandedOrders[order.id] && (
                <div className="order-details">
                  <p>Items: {order.items.join(", ")}</p>
                  <p>Total: {order.total}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Kategoriya modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Kategoriya yangilash" : "Yangi kategoriya qo'shish"}</h2>
            <input type="text" placeholder="Kategoriya nomi" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {newImg && <img src={newImg} alt="Preview" style={{ width: "100%", borderRadius: "10px" }} />}
            <button onClick={saveCategory}>{editingId ? "Saqlash" : "Qo'shish"}</button>
            <button className="close-btn" onClick={() => setShowModal(false)}>Bekor qilish</button>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteModal && (
        <div className="modal-backdrop" onClick={cancelDelete}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>O'chirish bekor qilish</h2>
            <p>Haqiqatan ham ushbu kategoriya o'chirilsinmi?</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={confirmDelete} style={{ background: "#e74c3c", color: "white" }}>O'chirish</button>
              <button onClick={cancelDelete} style={{ background: "#ccc", color: "#333" }}>Bekor qilish</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .menyu {
          display: flex;
          gap: 40px;
          justify-content: center;
          padding: 40px 20px;
          flex-wrap: wrap;
        }

        .menu-card {
          position: relative;
          width: 180px;
          height: 220px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(124, 58, 237, 0.4);
        }

        .menu-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .menu-content {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          color: white;
          font-weight: bold;
          z-index: 2;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
        }

        .menu-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: background 0.3s, opacity 0.3s;
          z-index: 1;
          background: rgba(0,0,0,0);
        }

        .menu-card:hover .menu-overlay {
          background: rgba(0,0,0,0.35);
          opacity: 1;
        }

        .menu-actions {
          display: flex;
          gap: 8px;
        }

        .menu-actions button {
          padding: 5px 8px;
          font-size: 0.75rem;
          border-radius: 6px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .menu-actions button:not(.delete-btn) {
          background: #7c3aed;
          color: white;
        }

        .menu-actions .delete-btn {
          background: #e74c3c;
          color: white;
        }

        .menu-actions button:hover {
          opacity: 0.8;
        }

        .add-btn {
          padding: 10px 20px;
          font-size: 1rem;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .add-btn:hover {
          background: #6008bf;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 50;
        }

        .modal {
          background: white;
          padding: 30px;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          min-width: 300px;
        }

        .modal input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .modal button {
          padding: 10px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .modal button:hover {
          opacity: 0.9;
        }

        /* Buyurtmalar */
        .orders {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 15px;
        }

        .order-card {
          border: 1px solid #ccc;
          border-radius: 12px;
          padding: 10px 15px;
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          cursor: pointer;
        }

        .order-details {
          margin-top: 10px;
          padding-left: 10px;
        }

      `}</style>
    </div>
  );
}