import Image from "next/image";
import React from "react";
import TailorMade from "@/../public/img/tailorMade.png";
import Wedding from "@/../public/img/wedding.png";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const journeys = () => {
  return (
    <>
      <div className="pt-40 pb-20 max-w-[1200px] m-auto">
        <div className="flex flex-wrap justify-between gap-40 items-center">
          <div className="flex-[5] relative">
            <Image
              src={TailorMade}
              alt="Tailor Made Journey"
              width={500}
              className="rounded-xl m-auto"
            />
            <Link
              href="#"
              className="bottom-[-10px] right-0 absolute z-10 bg-yellow-500 hover:bg-yellow-600 transition montserrat flex items-center gap-2 shadow-xl py-2 px-8 rounded-full"
            >
              <span className="text-white">Plan Journey</span>{" "}
              <BsArrowRight
                size={26}
                className="bg-white p-1 rounded-full text-black"
              />
            </Link>
          </div>
          <div className="flex-[5]">
            <h1 className="playfairDisplay text-5xl font-bold text-blue-950">
              Tailor Made & One of a Kind Journeys & Experiences
            </h1>
            <p className="montserrat mt-8 text-justify font-semibold text-blue-950">
              If you are a client in pursuit of great level of sophistication,
              our art and cultural travel curators specialized in the road less
              traveled, will redefine adventure and luxury for your breathtaking
              journey.
            </p>
            <p className="montserrat mt-8 text-justify font-semibold text-blue-950">
              We are experts in having an eye for quality and detail.
            </p>
            <p className="montserrat mt-8 text-justify font-light">
              IRI philosophy is to convert any trip into a unique memorable
              travel. Embark on an expertly curated One of a Kind Journey
              planned just for you by our curators.
            </p>
            <p className="montserrat mt-8 text-xl text-justify font-semibold text-blue-800">
              Be Our Guest!
            </p>
          </div>
        </div>
      </div>
      <div className="py-10 max-w-[1200px] m-auto">
        <div className="flex flex-wrap justify-between gap-40 items-center">
          <div className="flex-[5]">
            <h1 className="playfairDisplay text-5xl font-bold text-pink-950">
              Signature & Magical Honeymoons
            </h1>
            <p className="montserrat mt-8 text-justify font-light">
              Luxury honeymoons for every type of couples: <br /><br />Decor aficionados,
              luxury connoisseurs, wildlife lovers, fitness enthusiasts, city
              slickers, tea lovers, snow aficionados or heritage passionates.
            </p>
            <p className="montserrat mt-8 text-xl text-justify font-semibold text-pink-800">
              Be Our Guest!
            </p>
          </div>
          <div className="flex-[5] relative">
            <Image
              src={Wedding}
              alt="Tailor Made Journey"
              width={500}
              className="rounded-xl m-auto"
            />  
          </div>
        </div>
      </div>
    </>
  );
};

export default journeys;
