import React from "react";
import Image from "next/image";
import ArrowLeft from "../../../public/icons/arrow-left-box.svg";
import ArrowRight from "../../../public/icons/arrow-right-box.svg";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PokedexNavbar({ page, setPage }: Props) {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1); // Decrease page
  };

  const handleNext = () => {
    setPage(page + 1); // Increase page
  };

  return (
    <div className="flex gap-5 p-8 text-background border-b-4 border-background">
      <div className="flex text-xl items-center gap-2">
        <div className="flex flex-col">
          <input type="text" placeholder="Enter pokemon name" className="border-2 rounded-xl p-2" />
        </div>
        <button className="bg-background text-foreground font-extrabold h-min p-2 rounded-xl cursor-pointer">Search</button>
      </div>
      <div className="flex items-center gap-1">
        <Image
          src={ArrowLeft}
          alt="arrow left"
          onClick={handlePrev}
          width={50}
          height={50}
          className="cursor-pointer"
        />
        <Image
          src={ArrowRight}
          alt="arrow right"
          onClick={handleNext}
          width={50}
          height={50}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
