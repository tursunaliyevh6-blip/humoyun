"use client"
import { useState } from "react";
import Navbarpage from "./navbar";
import OrderModal from "./OrderModal";
import ImageCarousel from "./ImageCarousel"; // Yangi karuselni import qilamiz

// Ma'lumotlar o'zgarishsiz qoladi
const MENU_DATA = {
    title: "Sabo Taomlari Menyusi",
    lastUpdated: "2024-05-20",
    items: [
        { id: 1, name: "Classic Burger", price: "255.000", cardPrice: "245.000", img: "https://www.lurch.de/media/b5/4c/70/1693989554/burger-classic-cheese-rezept.jpg?ts=1753774543", category: "burger" },
        { id: 2, name: "Cheeseburger", price: "255.000", cardPrice: "245.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTthMItWzAAXDjKOuUNiN3b1me3pSweyIx7fA&s", category: "burger" },
        { id: 3, name: "Big Burger", price: "255.000", cardPrice: "245.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgpqV3ZV1b3MPr28xZ1fNVPZxGouL5I1FL8A&s", category: "burger" },
        { id: 4, name: "Hot Pizza", price: "255.000", cardPrice: "245.000", img: "https://imageproxy.wolt.com/assets/68885d3b8272b33a3024817c", category: "pizza" },
        { id: 5, name: "Margarita Pizza", price: "255.000", cardPrice: "245.000", img: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Homemade-Pizza_EXPS_FT23_376_EC_120123_3.jpg", category: "pizza" },
        { id: 6, name: "Pepperoni Pizza", price: "255.000", cardPrice: "245.000", img: "https://eldiario.com/wp-content/uploads/2022/02/Pizza.jpg", category: "pizza" },
        { id: 7, name: "French Fries", price: "255.000", cardPrice: "245.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSBe1p3umYWf7Jd74L2YsWJM6RP7K0rMFdg&s", category: "fries" },
        { id: 8, name: "Coca-Cola", price: "255.000", cardPrice: "245.000", img: "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fd075d76f-4a2f-45b6-95d1-8b32f364b913&w=3840&q=75", category: "drink" },
        { id: 9, name: "Fanta", price: "255.000", cardPrice: "245.000", img: "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fd075d76f-4a2f-45b6-95d1-8b32f364b913&w=3840&q=75", category: "drink" },
        { id: 10, name: "Sprite", price: "255.000", cardPrice: "245.000", img: "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fd075d76f-4a2f-45b6-95d1-8b32f364b913&w=3840&q=75", category: "drink" },
        { id: 11, name: "Water", price: "255.000", cardPrice: "245.000", img: "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fd075d76f-4a2f-45b6-95d1-8b32f364b913&w=3840&q=75", category: "drink" },
        { id: 12, name: "Milk", price: "255.000", cardPrice: "245.000", img: "https://maxway.uz/_next/image?url=https%3A%2F%2Fcdn.delever.uz%2Fdelever%2Fd075d76f-4a2f-45b6-95d1-8b32f364b913&w=3840&q=75", category: "drink" },

    ]
};

const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = MENU_DATA.items.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* Karuselni menyu va mahsulotlardan yuqoriga qo'shamiz */}
            <ImageCarousel />

            <div className="menyu">
                <a href="#burger" className="menu-card" style={{ '--bg-url': "url('https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400')" }}>
                    <div className="menu-overlay"></div>
                    <div className="menu-content">
                        <span className="menu-name">Burger</span>
                    </div>
                </a>

                <a href="#fries" className="menu-card" style={{ '--bg-url': "url('https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400')" }}>
                    <div className="menu-overlay"></div>
                    <div className="menu-content">
                        <span className="menu-name">Fries</span>
                    </div>
                </a>

                <a href="#pizza" className="menu-card" style={{ '--bg-url': "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400')" }}>
                    <div className="menu-overlay"></div>
                    <div className="menu-content">
                        <span className="menu-name">Pizza</span>
                    </div>
                </a>

                <a href="#drink" className="menu-card" style={{ '--bg-url': "url('https://images.unsplash.com/photo-1543253687-c931c8e01820?w=400')" }}>
                    <div className="menu-overlay"></div>
                    <div className="menu-content">

                        <span className="menu-name">Drink</span>
                    </div>
                </a>
            </div>

            <div className="qwerty">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div className="components" key={item.id}>
                            <div className="rasim">
                                <img src={item.img} alt={item.name} />
                            </div>
                            <div className="malumot">
                                <h2>{item.name}</h2>
                                <div className="narx">
                                    <p className="N">Narxi:</p>
                                    <p className="pul">{item.price}</p>
                                </div>
                                <div className="narx">
                                    <p className="N">Karta bilan:</p>
                                    <p className="pul">{item.cardPrice}</p>
                                </div>
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