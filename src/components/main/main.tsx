import Image from "next/image"
import ash from "../../../public/Ash.png"
import Chat from "../chat/chat"
import { Pointer } from "../chat/pointer"
import Pokedex from "../pokedex/Pokedex"

export const Main = () => {
    return (
        <div className="flex flex-col xl:flex-row gap-20 p-20">
            <div>
                <Chat 
                    title="Welcome Trainer!"
                    content="This is the Showcase website for the new pokedex, and you've been selected to preview it!"
                />
                <div>
                    <Pointer />
                    <Image src={ash} alt="Ash Ketchum" width={250} height={250}/>
                </div>
            </div>
            <div className="w-full">
                <Pokedex />
            </div>
            <div></div>
        </div>
    )
}