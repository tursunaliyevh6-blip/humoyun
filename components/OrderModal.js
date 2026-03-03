"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute', // "s" harfi olib tashlandi
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 420 }, // Mobil qurilmalarda ekranga moslashadi
  maxHeight: '90vh', // Ekrandan chiqib ketmasligi uchun
  overflowY: 'auto', // Agar kontent sig'masa, skroll chiqadi
  bgcolor: 'white',
  borderRadius: '24px',
  boxShadow: '0px 20px 50px rgba(124, 58, 237, 0.15)',
  p: 4,
  outline: 'none',
  border: '1px solid rgba(124, 58, 237, 0.1)'
};

export default function OrderModal({ open, handleClose, product }) {
  const [count, setCount] = useState(1);
  const deliveryPrice = 15000;
  const themeColor = "#7c3aed"; // Siz tanlagan rang

  useEffect(() => { if (open) setCount(1); }, [open]);

  if (!product) return null;

  const purePrice = parseInt(product.cardPrice.replace(/\./g, ''));
  const totalProductPrice = purePrice * count;
  const finalTotal = totalProductPrice + deliveryPrice;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5" sx={{ fontWeight: '800', mb: 2, color: '#1f2937' }}>
          Buyurtma berish
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, p: 2, bgcolor: '#f5f3ff', borderRadius: '16px' }}>
          <img src={product.img} alt={product.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
          <Box>
            <Typography sx={{ fontWeight: '700', fontSize: '1.1rem' }}>{product.name}</Typography>
            <Typography variant="body2" sx={{ color: themeColor, fontWeight: '600' }}>{product.cardPrice} so'm</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontWeight: '600' }}>Soni:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f3f4f6', p: '5px', borderRadius: '30px' }}>
            <button 
              onClick={() => count > 1 && setCount(count - 1)}
              style={{ width: '35px', height: '35px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: 'white', fontWeight: 'bold', color: themeColor }}
            >–</button>
            <Typography sx={{ fontWeight: '800', minWidth: '20px', textAlign: 'center' }}>{count}</Typography>
            <button 
              onClick={() => setCount(count + 1)}
              style={{ width: '35px', height: '35px', borderRadius: '50%', border: 'none', cursor: 'pointer', backgroundColor: themeColor, color: 'white' }}
            >+</button>
          </Box>
        </Box>

        <Box sx={{ borderTop: '2px dashed #e5e7eb', pt: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280' }}>Yetkazib berish:</span>
            <span style={{ fontWeight: '600' }}>{deliveryPrice.toLocaleString()} so'm</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Jami:</span>
            <span style={{ fontWeight: '800', fontSize: '1.4rem', color: themeColor }}>{finalTotal.toLocaleString()} so'm</span>
          </div>
        </Box>

        <button 
          onClick={handleClose}
          style={{
            marginTop: '25px',
            width: '100%',
            padding: '16px',
            backgroundColor: themeColor,
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: `0 10px 20px -5px ${themeColor}66`
          }}
        >
          Tasdiqlash
        </button>
      </Box>
    </Modal>
  );
}