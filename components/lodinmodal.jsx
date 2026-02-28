'use client';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, handleClose }) {

  const router = useRouter();

  const goAdmin = () => {
    router.push('/admin');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box className='modal-content' sx={style}>
        
        <input
          type="text"
          placeholder="Login"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
        />

        <button className="login-btn">
          Kirish
        </button>


        {/* ✅ YANGI QO‘SHILDI */}
        <button
          onClick={goAdmin}
          className="login-btn"
          style={{
            marginTop: "10px",
            background: "#0f172a"
          }}
        >
          Admin sahifasiga o‘tish
        </button>


      </Box>
    </Modal>
  );
}