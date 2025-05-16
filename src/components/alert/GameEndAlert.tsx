import Link from "next/link";
import React from "react";

type Props = {
  winner: string;
};

export default function SoftAlert({ winner }: Props) {
  return (
    <div className="flex flex-col absolute top-10 left-1/2 transform -translate-x-1/2 z-20 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg shadow-md border border-yellow-300">
      <h1>Game Over!!!</h1>
      <p>The winner is {winner}</p>
      <p>
        Thanks for trying this out, Click on the button to go back to the
        pokedex where you can try another pokemon!!
      </p>
      <Link href="/" className="link w-fit">Go Back</Link>
    </div>
  );
}
