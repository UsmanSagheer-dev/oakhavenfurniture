"use client";

import { useState, useEffect } from "react";

export default function FurnitureHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "/images/arizonaDouble1.jpeg",
    "/images/arizonaSingle2.jpeg",
    "/images/arizonabed_king1.jpeg",
    "/images/kignsleighbed.jpeg",
    "/images/kingbed1.jpeg",
    "/images/sofa.jpg",
    "/images/bedroom.jpg",
    "/images/hero.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 py-16 min-h-125">
      <div className="backdrop-blur-md bg-[rgba(247,243,236,0.7)] p-12 rounded-lg text-black">
        <span className="block mb-4 text-[#b39a6a] text-xs font-semibold tracking-widest uppercase">
          OAK &amp; HAVEN Furniture
        </span>
        <h1 className="m-0 font-serif text-5xl lg:text-6xl font-normal leading-[0.9] capitalize">
          All Furniture
        </h1>
        <p className="mt-6 text-gray-700 text-base">
          Explore our collection of thoughtfully selected pieces.
        </p>
      </div>
      <div className="relative w-full h-125 overflow-hidden rounded-lg">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Furniture ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 border-2 border-white rounded-full bg-transparent transition-all hover:scale-110 ${
                index === currentSlide ? "bg-white" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
