"use client";

import React, { useEffect, useState } from "react";
import { NAV_LINKS } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { FetchCart } from "../lib/fetchCart";
import MobileSVGBtn from "../../public/images/icon-menu.svg";

const NavBar = ({
  cartItems,
  setCartItems,
}: {
  cartItems: any;
  setCartItems: Function;
}) => {
  const [showCart, setShowCart] = useState(false);

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
        <div className="pl-7 pr-2">
          <MobileSVGBtn />
        </div>
        {/* LOGO */}
        <div className="w-full  ">
          <Image src="/images/logo.svg" alt="Logo" width={155} height={25} />
        </div>

        <nav className="flex  justify-between items-center w-full text-dark-grayish-blue font-light ">
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
          <div className={`flex   items-center    relative  `}>
            {NAV_LINKS.slice(-2).map((link, index) => (
              <div
                key={index}
                onMouseEnter={() => {
                  if (link.icon === "/images/icon-cart.svg") {
                    setShowCart(true);
                  }
                }}
                onMouseLeave={() => {
                  if (link.icon === "/images/icon-cart.svg") {
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
                    <Link
                      href={
                        link.icon === "/images/image-avatar.png"
                          ? link.path
                          : ""
                      }
                    >
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

                {link.name === "Cart" && showCart && (
                  <div className=" translate-y-4  ">
                    <div className="absolute w-[22rem] pt-5 pb-8 bg-white shadow-2xl border rounded-lg -translate-x-40 text-black ">
                      <p className="pl-3 mb-5 font-bold">Cart</p>
                      <div className="border-t w-full h-full flex justify-center items-center pt-6">
                        {cartItems.length === 0 ? (
                          <p className="py-9">Your cart is empty</p>
                        ) : (
                          <div className="flex flex-col gap-1">
                            {cartItems.map((item: any, index: any) => (
                              <div key={index} className="flex gap-4 mb-4">
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
                                className="px-[7.5rem] rounded-lg bg-primary-orange hover:bg-orange-300 font-semibold py-3"
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
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
