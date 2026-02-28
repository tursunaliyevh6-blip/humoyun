"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2000&auto=format&fit=crop",
    title: "Eng mazali burgerlar!",
    sub: "Sabo - sifat va maza uyg'unligi"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop",
    title: "Issiqgina Pizzalar",
    sub: "Italiya ta'mi sizning xonadoningizda"
  },
  {
    id: 3,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_h0UUkAGPIRcxrme8yB8kbqh214tR5hJp0w&s",
    title: "Muzdek ichimliklar",
    sub: "Chanqog'ingizni biz bilan qondiring"
  }
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '550px', // Balandlikni yana bir oz oshirdik
        overflow: 'hidden',
        backgroundColor: '#7c3aed', // Bo'sh joylar uchun to'q rang
      }}
    >
      {carouselImages.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          {/* Overlay - Rasmni qorong'ulash va matnni ochish uchun */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 2
          }} />
          
          <img 
            src={slide.url} 
            alt={slide.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: 'brightness(0.8)' // Rasmni o'zini bir oz xiralashtirish (ichimliklar ko'rinishi uchun)
            }}
          />

          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '8%',
            zIndex: 3,
            color: 'white',
          }}>
            <h1 style={{ 
                fontSize: '4rem', 
                fontWeight: '900', 
                color: '#7c3aed', // SABO sariq rangi
                textTransform: 'uppercase',
                margin: 0,
                textShadow: '3px 3px 15px rgba(0,0,0,0.6)'
            }}>
              {slide.title}
            </h1>
            <p style={{ 
                fontSize: '1.5rem', 
                marginTop: '10px',
                fontWeight: '300',
                letterSpacing: '1px'
            }}>
              {slide.sub}
            </p>
          </div>
        </div>
      ))}

      {/* Navigatsiya tugmalari - SABO sariq rangida */}
      <button onClick={prevSlide} style={btnStyle('left')}> <ChevronLeft size={35} /> </button>
      <button onClick={nextSlide} style={btnStyle('right')}> <ChevronRight size={35} /> </button>

      {/* Indikatorlar */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 4
      }}>
        {carouselImages.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: i === currentIndex ? '50px' : '15px',
              height: '4px',
              backgroundColor: i === currentIndex ? '#7c3aed' : 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.5s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const btnStyle = (dir) => ({
  position: 'absolute',
  top: '50%',
  [dir]: '30px',
  transform: 'translateY(-50%)',
  background: 'rgba(0, 0, 0, 0.4)',
  border: '2px solid #7c3aed', // Sariq chegara
  borderRadius: '50%',
  color: '#7c3aed', // Sariq ikonka
  width: '60px',
  height: '60px',
  cursor: 'pointer',
  zIndex: 5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 15px rgba(255, 204, 0, 0.2)'
});

export default ImageCarousel;