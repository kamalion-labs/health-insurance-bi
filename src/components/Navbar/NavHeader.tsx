import logo from "../../assets/interliga.png";
import Image from "next/image";

export function NavHeader() {
  return (
    <div className="flex justify-center pb-10 pt-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 drop-shadow-md">
        <Image alt="Interliga" src={logo} className="aspect-video" />
      </div>
    </div>
  );
}
