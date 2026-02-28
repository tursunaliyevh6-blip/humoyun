import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { X, ShoppingBag } from 'lucide-react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 400 },
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

const CartModal = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className="flex justify-between items-center mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <ShoppingBag color="#7c3aed" />
                        <Typography variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
                            Savat
                        </Typography>
                    </div>
                    <X onClick={handleClose} style={{ cursor: 'pointer', color: 'gray' }} />
                </div>

                {/* Savat bo'sh bo'lgan holat uchun yoki mahsulotlar uchun joy */}
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <Typography style={{ color: 'gray' }}>
                        Savatda hozircha mahsulotlar yo'q
                    </Typography>
                </div>

                <button
                    onClick={handleClose}
                    style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#7c3aed',
                        border: 'none',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        color: 'white',
                    }}
                >
                    Xarid qilishda davom etish
                </button>
            </Box>
        </Modal>
    );
};

export default CartModal;