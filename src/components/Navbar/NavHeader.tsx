import logo from "../../assets/interliga.png";
import Image from "next/image";

export function NavHeader() {
  return (
    <div className="flex justify-center pb-10">
      <div className="rounded-full bg-white px-2 py-4 drop-shadow-md">
        <Image alt="Interliga" src={logo} className="w-[80px]" />
      </div>
    </div>
  );
}
