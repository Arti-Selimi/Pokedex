import React, { useState } from "react";
import Image from "next/image";
import ArrowLeft from "../../../public/icons/arrow-left-box.svg";
import ArrowRight from "../../../public/icons/arrow-right-box.svg";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function PokedexNavbar({ page, setPage, setName }: Props) {
  const [tempName, setTempName] = useState("");
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
    setName("")
  };

  const handleNext = () => {
    setPage(page + 1);
    setName("")
  };

  return (
    <div className="flex gap-5 p-4 text-background border-t-4 border-background">
      <div className="flex text-sm items-center gap-2">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Enter pokemon name"
            onChange={(e) => setTempName(e.target.value)}
            className="border-2 rounded-xl p-2 font-extrabold"
          />
        </div>
        <button
          onClick={() => setName(tempName)}
          className="bg-background text-foreground font-extrabold h-min p-2 rounded-xl cursor-pointer"
        >
          Search
        </button>
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
