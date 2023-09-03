import React, { useState } from "react";
import CarouselItem from "./CarouselItem";
import products from "../data/products.json";
import "../styles/Carousel.css";

// Adapted from https://github.com/harakisgeorge/carouselreact\

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Keep track of the index when traversing the carousel
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= products.length) {
      newIndex = products.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="carousel">
      <div
        className="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {products.map((product) => {
          return <CarouselItem product={product} />;
        })}
      </div>
      <div className="carousel-buttons">
        <div className="indicators">
          {products.map((product, index) => {
            return (
              <button
                className="indicator-buttons"
                onClick={() => {
                  updateIndex(index);
                }}
              >
                <span
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  remove
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
