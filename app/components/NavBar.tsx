"use client";

import React, { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { FetchCart } from "../lib/fetchCart";
import MobileSVGBtn from "../../public/images/icon-menu.svg";
import MySvgClose from "../../public/images/icon-close.svg";

interface CartItem {
  title: string;
  price: number;
  count: number;
  image: string;
}

interface NavBarProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const NavBar: React.FC<NavBarProps> = ({ cartItems, setCartItems }) => {
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const handleCartRef = (e: any) => {
    if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      setShowCart(false);
    }
  };

  const handleUserRef = (e: any) => {
    if (userRef.current && !userRef.current.contains(e.target as Node)) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCartRef);
    document.addEventListener("mousedown", handleUserRef);

    return () => {
      document.removeEventListener("mousedown", handleCartRef);
      document.removeEventListener("mousedown", handleUserRef);
    };
  }, []);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const data = await FetchCart();
        setCartItems(data.data);
      } catch (error) {
        console.error("An error occurred while fetching the cart items");
      }
    };

    getCartItems();
  }, [setCartItems]);

  const handleDeleteItem = async (item: any) => {
    try {
      const response = await fetch(`/api/cart/${item._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("An error occurred while deleting the cart item");
      }

      setCartItems(
        cartItems.filter((cartItem: any) => cartItem._id !== item._id)
      );
    } catch (error) {
      console.error("An error occurred while deleting the cart item");
    }
  };

  return (
    <div className=" py-8 lg:ml-36 lg:mr-40   lg:border-b-[.1px] lg:border-grayish-blue  ">
      <div className="sm:container flex justify-center  items-center  md:mx-auto xs:gap-3 lg:gap-14  ">
        {/* MOBILE MENU */}
        <div
          className="pl-7 pr-2 xs:block md:hidden"
          onClick={() => setShowMobileMenu(true)}
        >
          <MobileSVGBtn />
        </div>
        {/* LOGO */}
        <div className="xs:w-full md:w-[14rem] lg:w-[12rem]  ">
          <Image src="/images/logo.svg" alt="Logo" width={155} height={25} />
        </div>

        <nav className="flex   justify-between items-center w-full text-dark-grayish-blue font-light ">
          {/* LEFT NAV */}
          <div className="xs:hidden md:block">
            <ul className="flex gap-7 ">
              {NAV_LINKS.slice(1, -2).map((link, index) => {
                return (
                  <li key={index} className="relative group">
                    <Link
                      href={link.path}
                      className={`group-hover:text-black transition-all duration-100 ease-in-out`}
                    >
                      {link.name}
                    </Link>
                    <div
                      className={`w-full h-1 bg-orange-500 transition-opacity duration-300 opacity-0 group-hover:opacity-100  translate-y-12  `}
                    ></div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* RIGHT NAV */}
          <div
            className={`flex items-center sm:justify-end md:justify-center  sm:w-full lg:w-auto  relative z-10  `}
          >
            {NAV_LINKS.slice(-2).map((link, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  if (link.icon === "/images/icon-cart.svg") {
                    setShowCart(true);
                    setShowUserMenu(false);
                  }
                  if (link.icon === "/images/image-avatar.png") {
                    setShowUserMenu(true);
                    setShowCart(false);
                  }
                }}
                className={`${
                  link.icon === "/images/icon-cart.svg"
                    ? "px-10  py-5  translate-y-1"
                    : ""
                }`}
              >
                <ul className="">
                  <li
                    className={`transition-all duration-200 ease-in-out  ${
                      link.icon === "/images/image-avatar.png"
                        ? "hover:border-primary-orange border-2 rounded-full hover:scale-105"
                        : ""
                    }`}
                  >
                    <Link href="">
                      <Image
                        className=""
                        src={link.icon || "default-icon-path"}
                        alt="icon"
                        width={link.icon === "/images/icon-cart.svg" ? 22 : 50}
                        height={link.icon === "/images/icon-cart.svg" ? 22 : 50}
                      />
                    </Link>

                    {/* SMALL ICON */}
                    {link.name === "Cart" && cartItems.length > 0 && (
                      <div className="absolute rounded-lg bg-orange-500 translate-x-2 -translate-y-7">
                        <p className="text-white flex justify-center items-center px-[8px] text-xs">
                          {cartItems.reduce(
                            (total: number, item: any) => total + item.count,
                            0
                          )}
                        </p>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* CART DROPDOWN  */}
        {NAV_LINKS.some((link) => link.name === "Cart") && showCart && (
          <div className="absolute z-10 flex sm:justify-end  xs:px-3 xs:pt-[7.5rem] md:pt-5 md:pr-20   w-full  translate-y-[9rem] ">
            <div
              className=" xs:w-[100dvw]   sm:w-[22rem] pt-5 pb-8 bg-white shadow-2xl border rounded-lg  text-black"
              onMouseLeave={() => {
                if (
                  NAV_LINKS.some(
                    (link) => link.icon === "/images/icon-cart.svg"
                  )
                ) {
                  setShowCart(false);
                }
              }}
              ref={cartRef}
            >
              <p className="pl-3 mb-5 font-bold">Cart</p>
              <div className="border-t w-full h-full flex justify-center items-center pt-6">
                {cartItems.length === 0 ? (
                  <p className="py-9">Your cart is empty</p>
                ) : (
                  <div className="flex flex-col gap-1 mb-5">
                    {cartItems.map((item: any, index: any) => (
                      <div key={index} className="flex gap-4 md:mb-4 xs:mb-6">
                        <div className="w-16 h-16 rounded-lg">
                          <Image
                            src={item.image}
                            alt="Image"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p>{item.title}</p>
                          <p>
                            ${item.price / item.count} x{" "}
                            <span>{item.count}</span>
                            <span className="font-bold pl-2">
                              ${item.price}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-center items-center cursor-pointer">
                          <Image
                            src="/images/icon-delete.svg"
                            alt="Delete"
                            width={14}
                            height={14}
                            onClick={() => handleDeleteItem(item)}
                          />
                        </div>
                      </div>
                    ))}

                    <button>
                      <Link
                        href="/cart"
                        className="px-[7.5rem] rounded-lg bg-primary-orange hover:bg-orange-300 font-semibold xs:py-5 md:py-3"
                      >
                        {" "}
                        Checkout
                      </Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* USER MENU  */}

        {NAV_LINKS.some((link) => link.name === "User") && showUserMenu && (
          <div className="w-full  flex sm:justify-end translate-y-[9rem] pr-12   absolute z-50">
            <div className="xs:w-[100dvw]   sm:w-[15rem] pt-5 pb-8 bg-white shadow-2xl border rounded-lg  text-black">
              <div
                className=""
                ref={userRef}
                onMouseLeave={() => {
                  if (
                    NAV_LINKS.some(
                      (link) => link.icon === "/images/image-avatar.png"
                    )
                  ) {
                    setShowUserMenu(false);
                  }
                }}
              >
                <ul className="flex flex-col justify-center items-center">
                  <li className="hover:bg-orange-600 w-full text-center hover:text-white px-3 py-3 font-bold">
                    User: John Doe
                  </li>
                  <li className="hover:bg-orange-600 w-full text-center hover:text-white px-3 py-3">
                    Sign In
                  </li>
                  <li className="hover:bg-orange-600 w-full text-center hover:text-white px-3 py-3">
                    Create Account
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE MENU  */}
        {showMobileMenu && (
          <div className="fixed top-0 w-full h-full bg-black/80 z-50">
            <div className="h-full w-[60dvw]  bg-white   pl-10">
              <div className=" pt-9 " onClick={() => setShowMobileMenu(false)}>
                <MySvgClose className="fill-current text-gray-500   w-5 h-5 scale-[1.2]" />
              </div>
              <ul className="flex flex-col gap-7 pt-16 font-bold text-lg">
                {NAV_LINKS.slice(1, -2).map((link, index) => {
                  return (
                    <li key={index} className=" ">
                      <Link href={link.path}>{link.name}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
