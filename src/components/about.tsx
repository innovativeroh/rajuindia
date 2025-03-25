import React from "react";
import HalfCircle from "@/../public/img/HalfCircle.png";
import Image from "next/image";
import Img1 from "@/../public/img/img1.png";
import Img2 from "@/../public/img/img2.png";
import Img3 from "@/../public/img/img3.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
const about = () => {
  return (
    <div className="m-auto max-w-[1150px] p-10 lg:p-20 relative">
      <Image
        src={HalfCircle}
        alt="Half Circle"
        className="absolute left-[-160px] w-[300px] hidden lg:block"
      />

      <Image
        src={Img1}
        alt="Half Circle"
        className="absolute right-[-60px] w-[300px] rounded-full hidden lg:block"
      />
      <Image
        src={Img2}
        alt="Half Circle"
        className="absolute right-[-50px] w-[200px] top-[450px] rounded-full hidden lg:block"
      />
      <Image
        src={Img3}
        alt="Half Circle"
        className="absolute right-[-180px] w-[150px] top-[330px] rounded-full hidden lg:block"
      />

      <div className="max-w-[640px] m-auto lg:p-10">
        <h1 className="font-extrabold playfair text-5xl text-blue-900">
          &quot;Padharo Mhare Desh&quot;
        </h1>
        <h3 className="text-left text-2xl mt-1 text-gray-800 montserrat">
          Welcome to My Land!
        </h3>
        <p className="mt-14 text-justify leading-7 montserrat font-light text-gray-800">
          Representing Indian tourism is my privilege and honour. My promise is
          to offer you a glimpse of the rich Indian architectural heritage,
          ancestral culture, music, folk art, hundred tongues, mystic traditions
          and an outstanding culinary delight. Expect the unexpected, the rise
          of a dream converted into a unique memorable journey and travel
          experience, as local.
        </p>
        <p className="mt-8 text-justify leading-7 montserrat font-light text-gray-800">
          Expect the unexpected, the rise of a dream converted into a unique
          memorable journey and travel experience, as local.
        </p>
        <h2 className="mt-8 text-2xl playfair font-bold text-blue-950">
          Be my guest!
          <br /> Peace at your home and in life too
        </h2>
        <p className="italic font-light mt-2">-Raju India</p>

        <center>
          <div className="inline-block">
            <Link
              href="#"
              className="mt-20 montserrat flex gap-2 items-center rounded-lg text-left font-semibold text-zinc-600"
            >
              Learn More About Us <ArrowRight />
            </Link>
            <hr className="w-[40px] border-none bg-blue-600 h-[2px] float-left mt-2" />
          </div>
        </center>
      </div>
    </div>
  );
};

export default about;
