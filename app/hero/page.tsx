"use client";
import React, { useState } from "react";
import { collections } from "../constants";
import Image from "next/image";
import MySvgClose from "../../public/images/icon-close.svg";

const Hero = ({ setCartItems }: { cartItems: any; setCartItems: Function }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState(125);
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    const item = {
      title: collections[activeIndex].title,
      price: price,
      count: count || 1,
      image: collections[0].LargeImages[activeIndex],
    };

    setCartItems((prevItems: any[]) => {
      const itemExists = prevItems.find(
        (cartItems) => cartItems.title === item.title
      );

      if (itemExists) {
        return prevItems.map((cartItems) =>
          cartItems.title === item.title
            ? {
                ...cartItems,
                count: cartItems.count + count,
                price: item.price * (cartItems.count + (count || 1)),
              }
            : cartItems
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  // function to handle the decrement of the count
  const handleLeftClick = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(price - 125);
    }
  };

  // function to handle the increment of the count
  const handleRightClick = () => {
    setCount(count + 1);
    setPrice(price + 125);
  };

  const handleModalRightClick = () => {
    setActiveIndex(
      activeIndex + 1 === collections[0].LargeImages.length
        ? 0
        : activeIndex + 1
    );
  };

  const handleModalLeftClick = () => {
    setActiveIndex(
      activeIndex - 1 < 0
        ? collections[0].LargeImages.length - 1
        : activeIndex - 1
    );
  };

  return (
    <div className="h-[100vh] ">
      <div className="container mx-auto grid grid-cols-2 ">
        {/* LEFT SECTION */}
        <div className="pl-32 pr-28 pt-24  ml-10 ">
          <div className="grid grid-cols-4  grid-rows-2 gap-8 ">
            <div className=" w-full h-[30rem] col-span-4 row-span-1 rounded-xl s ">
              <Image
                src={collections[0]?.LargeImages?.[activeIndex]}
                width={1000}
                height={500}
                alt="product"
                className="w-full h-full object-cover rounded-xl cursor-zoom-in"
                onClick={() => setOpenModal(true)}
              />
            </div>
            {collections[0].smallImages.map((images, index) => (
              <div
                key={index}
                className={`h-[6rem]  rounded-xl ${
                  index === activeIndex ? "border-2 border-orange-400" : ""
                }`}
              >
                <Image
                  src={images}
                  width={100}
                  height={60}
                  alt="product"
                  className={`w-full h-full object-cover rounded-xl cursor-pointer ${
                    index === activeIndex ? " opacity-35 " : " hover:opacity-70"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        {collections.map((item, index) => (
          <div key={index} className=" h-[100vh] pt-40 pl-10 ">
            <p className="text-dark-grayish-blue font-semibold">
              SNEAKER COMPANY
            </p>
            <h1 className="text-5xl font-bold  w-[30rem] mt-5 mb-10">
              {item.title}
            </h1>
            <p className="w-[29.8rem] mb-5 text-dark-grayish-blue">
              {item.description}
            </p>
            <div className="flex">
              <h2 className="text-3xl font-semibold ">${price.toFixed(2)}</h2>
              <div>
                <p className="bg-black text-white py-[2px] font-medium justify-center items-center flex px-2 rounded-lg  ml-3 translate-y-2">
                  {item.discount}%
                </p>
              </div>
            </div>
            <p className="mt-3 line-through text-dark-grayish-blue font-semibold">
              ${item.originalPrice?.toFixed(2)}
            </p>

            <div className="flex gap-4 mt-7">
              <div className="flex justify-center py-4 items-center  bg-light-grayish-blue rounded-lg">
                <button
                  className="px-5  h-full"
                  type="button"
                  title="less"
                  onClick={handleLeftClick}
                >
                  <Image
                    src="/images/icon-minus.svg"
                    alt="minus"
                    width={13}
                    height={13}
                  />
                </button>
                <p className="px-5 font-semibold">{count}</p>
                <button
                  className="px-5 h-full"
                  type="button"
                  title="plus"
                  onClick={() => handleRightClick()}
                >
                  <Image
                    src="/images/icon-plus.svg"
                    alt="plus"
                    width={13}
                    height={13}
                  />
                </button>
              </div>
              <button
                className="flex justify-center items-center px-20 rounded-lg bg-primary-orange hover:bg-orange-300 font-semibold"
                onClick={() => handleAddToCart()}
              >
                <span className="mr-2  ">
                  <Image
                    src="/images/icon-cart.svg"
                    alt="minus"
                    width={13}
                    height={13}
                  />
                </span>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed  inset-0   bg-black/85  drop-shadow-md">
          <div className="pt-96 -translate-x-10 flex  justify-center items-center w-full h-full ">
            <div
              className=" -translate-y-[33rem] translate-x-[34rem]  cursor-pointer "
              onClick={() => setOpenModal(false)}
            >
              <MySvgClose className="fill-current text-white hover:text-orange-400 " />
            </div>
            {/* LEFT BUTTON */}
            <div
              className="-translate-y-[16rem] translate-x-5  z-50 cursor-pointer"
              onClick={handleModalLeftClick}
            >
              <Image
                src="/images/icon-previous.svg"
                width={15}
                height={15}
                alt="next button"
                className="w-full h-full px-5 py-4 rounded-full bg-light-grayish-blue hover:bg-gray-200"
              />
            </div>
            <div className="grid grid-cols-4  grid-rows-2 gap-8    ">
              <div className=" w-full h-[30rem] col-span-4 row-span-1 rounded-xl s ">
                <Image
                  src={collections[0]?.LargeImages?.[activeIndex]}
                  width={1000}
                  height={500}
                  alt="product"
                  className="w-full h-full object-cover rounded-xl  "
                />
              </div>

              {collections[0].smallImages.map((images, index) => (
                <div
                  key={index}
                  className={`h-[6rem]  rounded-xl ${
                    index === activeIndex ? "border-2 border-orange-400" : ""
                  }`}
                >
                  <Image
                    src={images}
                    width={100}
                    height={60}
                    alt="product"
                    className={`w-full h-full object-cover rounded-xl cursor-pointer ${
                      index === activeIndex
                        ? " opacity-35 "
                        : " hover:opacity-70"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                </div>
              ))}
            </div>
            {/* RIGHT BUTTON */}
            <div
              className="-translate-y-[16rem] -translate-x-5  z-50 cursor-pointer"
              onClick={handleModalRightClick}
            >
              <Image
                src="/images/icon-next.svg"
                width={15}
                height={15}
                alt="next button"
                className="w-full h-full px-5 py-4 rounded-full bg-light-grayish-blue  hover:bg-gray-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
