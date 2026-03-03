"use client"
import { useState } from "react";
import Navbarpage from "./navbar";
import OrderModal from "./OrderModal";
import ImageCarousel from "./ImageCarousel";
import { useGetCategories, useGetFastfoods } from "@/hook/todo";

const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data: categories, isLoading: catLoading } = useGetCategories();
    const { data: fastfoods, isLoading: foodLoading } = useGetFastfoods();

    const filteredProducts = fastfoods?.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategoryId || product.category_id === selectedCategoryId;
        return matchesSearch && matchesCategory;
    });

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="home">
            <Navbarpage onSearch={setSearchQuery} />

            <ImageCarousel />

            {/* KATEGORIYALAR BOLI'MI */}
            <div className="menyu">
                <div
                    className={`menu-card ${!selectedCategoryId ? "active-cat" : ""}`}
                    onClick={() => setSelectedCategoryId(null)}
                    style={{ cursor: 'pointer', backgroundColor: '#333' }}
                >
                    <div className="menu-content">
                        <span className="menu-name">Hammasi</span>
                    </div>
                </div>

                {/* API dan kelgan kategoriyalar */}
                {!catLoading && categories?.map((cat) => (
                    <div
                        key={cat.id}
                        className={`menu-card ${selectedCategoryId === cat.id ? "active-cat" : ""}`}
                        onClick={() => setSelectedCategoryId(cat.id)}
                        style={{
                            '--bg-url': `url('${cat.image_url}')`,
                            cursor: 'pointer'
                        }}
                    >
                        <div className="menu-overlay"></div>
                        <div className="menu-content">
                            <span className="menu-name">{cat.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* MAHSULOTLAR RO'YXATI */}
            <div className="qwerty">
                {foodLoading ? (
                    <p>Mahsulotlar yuklanmoqda...</p>
                ) : filteredProducts?.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div className="components" key={item.id}>
                            <div className="rasim">
                                <img src={item.image_url} alt={item.name} />
                            </div>
                            <div className="malumot">
                                <h2>{item.name}</h2>
                                <div className="narx">
                                    <p className="N">Narxi:</p>
                                    <p className="pul">{item.price.toLocaleString()} so'm</p>
                                </div>
                                {item.discount_price && (
                                    <div className="narx">
                                        <p className="N">Chegirma:</p>
                                        <p className="pul" style={{ color: '#7c3aed' }}>
                                            {item.discount_price.toLocaleString()} so'm
                                        </p>
                                    </div>
                                )}
                                <button className="tugma" onClick={() => handleOpen(item)}>
                                    Sotib olish
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-result">
                        <p>Kechirasiz, mahsulot topilmadi...</p>
                    </div>
                )}
            </div>

            <OrderModal
                open={open}
                handleClose={handleClose}
                product={selectedProduct}
            />
        </div>
    );
}

export default Homepage;