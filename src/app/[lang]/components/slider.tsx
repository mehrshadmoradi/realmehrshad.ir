import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  "/images/laptop.jpg",
  "/images/mouse.jpg",
  "/images/squares.jpg",
  "/images/technology.jpg",
  "/images/banner.jpg",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 3000;
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden relative rounded-md">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 rounded-md relative h-[600px]"
          >
            <Image
              src={src}
              alt={`slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {/* Bullets */}
      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-md transition-all duration-300 border-2 ${
              currentIndex === index
                ? "bg-[#1efff4] w-[12px] h-[12px] rounded-full border-white shadow-white shadow-md scale-125"
                : "w-[17px] h-[6px] bg-[#706f6f]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
