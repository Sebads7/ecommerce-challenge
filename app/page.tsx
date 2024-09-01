"use client";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Hero from "./hero/page";

export default function Home() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  return (
    <div>
      <NavBar cartItems={cartItems} setCartItems={setCartItems} />
      <Hero cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
}
