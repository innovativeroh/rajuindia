import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
const Quote = () => {
  return (
    <div className="relative p-10 md:p-20 lg:p-40">
        <FaQuoteLeft size={80} className="text-yellow-300 lg:top-[140px] left-[10px] top-[10px] lg:left-[120px] absolute z-[20]" />
        <FaQuoteRight size={80} className="text-yellow-300 lg:bottom-[140px] right-[10px] bottom-[10px] lg:right-[120px] absolute z-[20]" />
      <div
        className="relative rounded-3xl w-full h-auto md:h-[500px] flex justify-center items-center flex-col gap-6 md:gap-10 p-8 md:p-12 overflow-hidden"
        style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-pink-900 opacity-90"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10">
          <h1 className="playfairDisplay text-white font-extrabold text-3xl md:text-4xl lg:text-5xl text-center">
            This is Indeed India!
          </h1>

          <div className="max-w-[600px]">
            <p className="text-center font-light text-xs md:text-sm leading-6 md:leading-7 text-white montserrat">
              The land of dreams and romance, of fabulous wealth and fabulous
              poverty, of splendour and rags, of palaces and hovels, of famine
              and pestilence, of genii, giants and Aladdin lamps; of tigers and
              elephants, the cobra and the jungle, the country of hundred
              nations and a hundred tongues, of a thousand religions and two
              million gods, cradle of the human race, birthplace of human
              speech, mother of history, grandmother of legend,
              great-grandmother of traditions.
            </p>
          </div>

          <p className="text-center font-light text-base md:text-lg leading-7 text-white montserrat italic">
            ~ Mark Twain
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
