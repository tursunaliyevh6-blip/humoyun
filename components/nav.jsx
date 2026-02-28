<div className="navbar">
           

            <div className="search">
                <Search className="qidiruv" />
                <input
                    className="searchs"
                    type="text"
                    placeholder="Qidirish..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div className="right">
                <div className="lang-wrapper">
                    <select className="lang-select">
                        <option>Uzb</option>
                        <option>Rus</option>
                    </select>
                </div>

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

            {/* Modallar */}
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
        </div>