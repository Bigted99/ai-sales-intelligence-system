"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    title: "Automate Lead Qualification",
    description:
      "Let AI analyze and score every incoming lead automatically.",
    buttonText: "Start Automating",
  image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920",
  },
  {
    title: "Route High-Intent Leads Instantly",
    description:
      "Send your best opportunities directly to your sales team.",
    buttonText: "See How It Works",
     image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920",
  },
  {
    title: "Make Smarter Decisions with AI",
    description:
      "Turn raw inquiries into actionable business insights.",
    buttonText: "Explore Features",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1920",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-125 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

         
          <div className="absolute inset-0 bg-black/50" />

        
          <div className="absolute inset-0 flex items-center max-w-6xl mx-auto px-6">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-6 text-white/80">
                {slide.description}
              </p>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold">
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

    
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "bg-white w-6"
                : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}