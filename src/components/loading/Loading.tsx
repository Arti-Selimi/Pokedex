import Image from "next/image";
import LoadingGif from "../../../public/loading.gif";

export default function Loading() {
  return (
    <div className="centered">
      <Image src={LoadingGif} alt="LoadingGif" />
    </div>
  );
}
