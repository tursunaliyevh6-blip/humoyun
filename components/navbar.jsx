"use client"
import { useState } from "react";
import { Search, User, Phone, MapPin, Headphones, ShoppingCart } from "lucide-react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LoginModal from "./lodinmodal";
import CartModal from "./CartModal"; // Yangi modalni import qilamiz
import Link from 'next/link';

const modalStyle = {
    position: 'absolute',
    top: '20%',
    right: '2%',
    width: 320,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 3,
    outline: 'none',
};

const Navbarpage = ({ onSearch }) => {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false); // Savat uchun state

    const handleLogin = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
         <nav className="w-full bg-white shadow-md flex items-center justify-between px-16 py-3 nav" style={{ height: "50px" }} >
              
              <div className="flex gap-3 items-center logo">
                <h1 className="text-2xl font-bold sabo">SABO</h1>
            </div>
        

        
            <div className="flex-1 flex justify-center max-w-3xl mx-4">
                   <div className="flex w-full border border-gray-300 rounded-full overflow-hidden shadow-sm qi">
                     
                     <div className="flex items-center justify-center px-4 qi1">
                       <Search className="text-gray-500 " size={20} />
                     </div>
                     
                     <input 
                       type="text"
                       placeholder="Qidiruv..."
                       className="flex-1 py-1 px-6 text-base focus:outline-none qi1"
                       style={{ paddingRight: "10px" }} 
                     />
                   </div>
                 </div>


               <div className="right">
                

                <User
                    size={34}
                    className="user-icon"
                    onClick={() => setLoginOpen(true)} // Login modalni ochish
                    style={{ cursor: 'pointer', color: '#7c3aed' }}
                />

                <Headphones
                    size={34}
                    onClick={handleLogin} // Admin kontakt modalini ochish
                    style={{ cursor: 'pointer', color: '#7c3aed' }}
                />

               <Link href="/cart">
    <ShoppingCart 
        size={34}
        style={{ cursor: 'pointer', color: '#7c3aed' }}
    />
</Link>
            </div>
        


         <LoginModal
                open={loginOpen}
                handleClose={() => setLoginOpen(false)}
            />

            <CartModal 
                open={cartOpen} 
                handleClose={() => setCartOpen(false)} 
            />
         <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#7c3aed' }}>
                        Admin bilan bog'lanish
                    </Typography>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Phone size={20} color="#7c3aed" />
                            <div>
                                <p style={{ margin: 0, fontSize: '14px', color: 'gray' }}>Telefonlar:</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>+998 50 907 75 65</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>+998 93 360 05 87</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={20} color="#7c3aed" />
                            <div>
                                <p style={{ margin: 0, fontSize: '14px', color: 'gray' }}>Manzil:</p>
                                <p style={{ margin: 0, fontWeight: '500' }}>6-mikrorayon, 54-dom / 1</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleClose}
                        style={{
                            marginTop: '20px',
                            width: '100%',
                            padding: '8px',
                            backgroundColor: '#7c3aed',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: 'white',
                        }}
                    >
                        Yopish
                    </button>
                </Box>
            </Modal>
            
        
            </nav>
    );
}

export default Navbarpage;