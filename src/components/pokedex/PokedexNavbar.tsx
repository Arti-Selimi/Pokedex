import React from "react";
import Image from "next/image";
import ArrowLeft from "../../../public/icons/arrow-left-box.svg";
import ArrowRight from "../../../public/icons/arrow-right-box.svg";

export default function PokedexNavbar() {
  return (
    <div className="flex gap-5 p-8 text-background">
      <div className="flex text-xl items-center gap-2">
        <div className="flex flex-col">
          <input type="text" placeholder="Enter pokemon name" className="border-2 rounded-xl p-2"/>
        </div>
        <button className="bg-blue-950 h-min p-2 rounded-xl text-white cursor-pointer">Search</button>
      </div>
      <div className="flex items-center gap-1">
        <Image src={ArrowLeft} alt="arrow left" width={50} height={50} className="cursor-pointer"/>
        <Image src={ArrowRight} alt="arrow right" width={50} height={50} className="cursor-pointer"/>
      </div>
    </div>
  );
}
