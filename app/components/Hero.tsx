"use client";
import React, { useState } from "react";
import { collections } from "../constants";
import Image from "next/image";
import MySvgClose from "../../public/images/icon-close.svg";
import SVGRight from "../../public/images/icon-next.svg";
import SVGLeft from "../../public/images/icon-previous.svg";

interface CartItem {
  title: string;
  price: number;
  count: number;
  image: string;
}

interface HeroProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Hero: React.FC<HeroProps> = ({ cartItems, setCartItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [price, setPrice] = useState(125);
  const [count, setCount] = useState(1);

  const handleAddToCart = async () => {
    const item = {
      title: collections[activeIndex].title,
      price: price,
      count: count,
      image: collections[0].LargeImages[activeIndex],
    };

    setCartItems((prevItems: any[]) => {
      const itemIndex = prevItems.findIndex(
        (cartItems) =>
          cartItems.title.toLowerCase() === item.title.toLowerCase()
      );

      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          count: updatedItems[itemIndex].count + (count || 1),
          price: price * (updatedItems[itemIndex].count + (count || 1)),
        };

        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });

    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error("error adding to cart", err);
    }
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
  // function to handle the right click
  const handleModalRightClick = () => {
    setActiveIndex(
      activeIndex + 1 === collections[0].LargeImages.length
        ? 0
        : activeIndex + 1
    );
  };
  // function to handle the left click
  const handleModalLeftClick = () => {
    setActiveIndex(
      activeIndex - 1 < 0
        ? collections[0].LargeImages.length - 1
        : activeIndex - 1
    );
  };

  return (
    <div className="  ">
      <div className="md:container md:mx-auto md:grid lg:grid-cols-2 w-full  lg:h-[120vh]  ">
        {/* LEFT SECTION */}
        <div className="2xl:pl-32 lg:pl-5  lg:pr-0 md:pr-14  md:ml-10 lg:ml-0 sm:pt-24 w-full ">
          <div className="grid grid-cols-4  lg:grid-rows-2 gap-8 relative  xs:w-full lg:w-[80%] ">
            <div className="absolute px-7 translate-y-[12rem]  justify-between w-full md:hidden xs:flex ">
              <div className="" onClick={handleModalLeftClick}>
                {/* LEFT BUTTON */}
                <SVGLeft className="pt-4 pl-4 w-14 h-14 rounded-full bg-white  hover:bg-gray-200  stroke-black hover:stroke-orange-400 stroke-[3] transition-all ease-linear duration-100" />
              </div>
              <div className="" onClick={handleModalRightClick}>
                <SVGRight className="pt-4 pl-5 w-14 h-14 rounded-full bg-white hover:bg-gray-200  stroke-black hover:stroke-orange-400 stroke-[3] transition-all ease-linear duration-100" />
              </div>
            </div>
            <div className=" w-full h-[30rem]  col-span-4 lg:row-span-1 md:rounded-xl ">
              <Image
                src={collections[0]?.LargeImages?.[activeIndex]}
                width={1000}
                height={500}
                alt="product"
                className="w-full h-full  object-cover md:rounded-xl lg:cursor-zoom-in"
                onClick={() => setOpenModal(true)}
              />
            </div>
            {/* RIGHT BUTTON */}

            {collections[0].smallImages.map((images, index) => (
              <div
                key={index}
                className={`h-[6rem] xs:hidden md:block  rounded-xl ${
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
          <div
            key={index}
            className="xs:h-[80vh]  xs:pt-20 lg:pt-40 xs:px-8 sm:px-0 xs:ml-0 sm:ml-10 lg:ml-0  "
          >
            <p className="text-dark-grayish-blue font-semibold">
              SNEAKER COMPANY
            </p>
            <h1 className="xs:text-4xl lg:text-5xl font-bold  md:w-[30rem] mt-5 xs:mb-5 sm:mb-10">
              {item.title}
            </h1>
            <p className="sm:w-[29.8rem] mb-6 xs:text-lg leading-7  text-dark-grayish-blue">
              {item.description}
            </p>
            <div className="xs:flex sm:block xs:justify-between  ">
              <div className="flex">
                <h2 className="text-3xl font-semibold ">${price.toFixed(2)}</h2>
                <div>
                  <p className="bg-black text-white py-[2px] font-medium justify-center items-center flex px-2 rounded-lg  ml-3 xs:translate-y-1 sm:translate-y-2">
                    {item.discount}%
                  </p>
                </div>
              </div>
              <p className="mt-3 line-through text-dark-grayish-blue font-semibold">
                ${item.originalPrice?.toFixed(2)}
              </p>
            </div>

            <div className="flex sm:flex-row xs:flex-col  gap-4 mt-7">
              <div className="flex xs:px-2 sm:px-0 xs:justify-between sm:justify-center xs:py-5  md:py-4 items-center  bg-light-grayish-blue rounded-lg">
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
                className="flex justify-center items-center xs:py-5 sm px-20 rounded-lg bg-primary-orange hover:bg-orange-300 font-semibold shadow-lg"
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
        <div className="lg:fixed lg:block xs:hidden inset-0  z-50  bg-black/85  drop-shadow-md">
          <div className="pt-96 -translate-x-10 flex  justify-center items-center w-full h-full ">
            <div
              className=" -translate-y-[35rem] translate-x-[36rem]  cursor-pointer "
              onClick={() => setOpenModal(false)}
            >
              <MySvgClose className="fill-current text-white hover:text-orange-400  w-5 h-5 scale-[1.4]" />
            </div>
            {/* LEFT BUTTON */}
            <div
              className="-translate-y-[16rem] translate-x-5  z-50 cursor-pointer"
              onClick={handleModalLeftClick}
            >
              <SVGLeft className="w-14 h-14 pl-[18px] pt-[19px] rounded-full bg-light-grayish-blue  hover:bg-gray-200  stroke-black hover:stroke-orange-400 stroke-[3] transition-all ease-linear duration-100" />
            </div>
            <div className="grid grid-cols-[repeat(4,_1fr)_0.2fr]   grid-rows-2 gap-8">
              <div className=" w-full h-[32rem] col-span-5 row-span-1 rounded-xl s ">
                <Image
                  src={collections[0]?.LargeImages?.[activeIndex]}
                  width={1200}
                  height={500}
                  alt="product"
                  className="w-full h-full object-cover rounded-xl  "
                />
              </div>

              {collections[0].smallImages.map((images, index) => (
                <div
                  key={index}
                  className={`h-[6rem] grid  rounded-xl translate-x-6   ${
                    index === activeIndex ? "border-2 border-orange-400" : ""
                  }`}
                >
                  <Image
                    src={images}
                    width={100}
                    height={60}
                    alt="product"
                    className={`w-full h-full justify-items-center items-center center object-cover rounded-xl cursor-pointer ${
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
              <SVGRight className="w-14 h-14 pl-[22px] pt-[19px]  rounded-full bg-light-grayish-blue  hover:bg-gray-200  stroke-black hover:stroke-orange-400 stroke-[3] transition-all ease-linear duration-100" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
