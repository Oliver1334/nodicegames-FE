import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeaturedHero from "./FeaturedHero";
import { UserContext } from "../contexts/UserContext";
import { Loading } from "./Loading";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 50); // small delay for fade
    return () => clearTimeout(timeout);
  }, []);

  // Map your old slides to the new hero items
  const items = [
    {
      id: 10,
      title: "Super Rhino Hero",
      href: "/reviews/10",
      image: "https://images.pexels.com/photos/4691579/pexels-photo-4691579.jpeg?w=1200&h=800&auto=compress&cs=tinysrgb",
      tag: "Review",
      owner: "jessjelly",
    },
    {
      id: 8,
      title: "Scythe; you're gonna need a bigger table!",
      href: "/reviews/8",
      image: "https://images.pexels.com/photos/4200740/pexels-photo-4200740.jpeg?w=1200&h=800&auto=compress&cs=tinysrgb",
      tag: "Feature",
      owner: "grumpy19",
    },
    {
      id: 23,
      title: "Escape The Dark Castle",
      href: "/reviews/23",
      image: "https://images.pexels.com/photos/5439508/pexels-photo-5439508.jpeg?w=1200&h=800&auto=compress&cs=tinysrgb",
      tag: "Review",
      owner: "jessjelly",
    },
    {
      id: 6,
      title: "Build your own Tour de Yorkshire",
      href: "/reviews/6",
      image: "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?w=1200&h=800&auto=compress&cs=tinysrgb",
      tag: "Opinion",
      owner: "cooljmessy",
    },
    {
      id: 9,
      title: "Settlers of Catan: Don't Settle For Less",
      href: "/reviews/9",
      image: "https://images.pexels.com/photos/1153929/pexels-photo-1153929.jpeg?w=700&h=700",
      tag: "Opinion",
      owner: "tickle122",
    },
  ];
  

  return (
    <main className="bg-brandLight dark:bg-brandDark">
      {/* Fade wrapper for content only */}
      <div
        className={`transition-opacity duration-700 ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <FeaturedHero items={items} />
        <div className="h-110">
          {/* Extra page space div */}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;