import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedHero({ items = [] }) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const intervalRef = useRef(null);

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 10000);
  };

  const resetAutoRotate = () => {
    clearInterval(intervalRef.current);
    startAutoRotate();
  };

  useEffect(() => {
    if (items.length > 1) {
      startAutoRotate();
    }
    return () => clearInterval(intervalRef.current);
  }, [items.length]);

  if (!items.length) return null;

  const primary = items[featuredIndex];
  const rest = items.filter((_, idx) => idx !== featuredIndex);

  const handleClick = (index) => {
    setFeaturedIndex(index);
    resetAutoRotate();
  };

  return (
    <section className="py-10 ">
      <div className="max-w-screen-xl mx-auto px-4 py-4 ">

        {/* === Desktop / Tablet Grid === */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Featured */}
          <div className="md:col-span-7">
            <Link to={primary.href} className="block group relative">
              <div className="w-full aspect-[16/9] overflow-hidden rounded-lg relative">
                <img
                  src={primary.image}
                  alt={primary.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-brandPrimary px-3 py-1 rounded-md shadow text-sm font-semibold tracking-wide text-brandLightText">
                  Featured Review
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight hover:text-brandHighlight dark:hover:text-brandHighlight text-brandLightText dark:text-brandText">
                {primary.title}
              </h2>
              <p className="text-sm text-brandLightText dark:text-brandText mt-1">
                Reviewed by: <span className="font-medium">{primary.owner}</span> · Posted on: {primary.date} 
              </p>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {rest.map((item) => {
              const actualIndex = items.findIndex((x) => x.id === item.id);
              return (
                <button
                  key={item.id ?? item.href}
                  onClick={() => handleClick(actualIndex)}
                  className="flex gap-4 group items-center text-left"
                >
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                  <div>
                    <h3 className="text-md font-semibold leading-snug hover:text-brandHighlight dark:hover:text-brandHighlight text-brandLightText dark:text-brandText cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-xs text-brandLightText dark:text-brandText mt-1">
                    Reviewed by: <span className="font-medium">{primary.owner}</span> · Posted on: {primary.date} 
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

       {/* === Mobile Carousel === */}
<div className="sm:hidden">
  <h2 className="text-lg font-semibold mb-4 px-4">Featured Reviews</h2>
  <div className="flex snap-x snap-mandatory overflow-x-auto gap-4 -mx-4 px-4 pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
    {items.map((item) => (
      <Link
        key={item.id ?? item.href}
        to={item.href}
        className="shrink-0 snap-center min-w-[80%] max-w-[90%] group"
      >
        <div className="aspect-[16/10] overflow-hidden rounded-lg">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-3">
          
          <h3 className="text-lg font-semibold mt-1 leading-tight group-hover:underline text-brandLightText dark:text-brandText">
            {item.title}
          </h3>
          <p className="text-xs text-brandLightText dark:text-brandText mt-1">
            Reviewed by: <span className="font-medium">{item.owner}</span> · Posted on: {item.date}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
