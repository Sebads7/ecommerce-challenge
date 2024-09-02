"use client";

import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero"; // Ensure you point to the correct path

function HomeClient() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  return (
    <div>
      <NavBar cartItems={cartItems} setCartItems={setCartItems} />
      <Hero cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
}

export default HomeClient;
