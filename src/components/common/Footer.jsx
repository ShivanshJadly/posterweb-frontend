import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-[#d9d9d9]">
        <div className="lg:border-b lg:border-r lg:border-l border-black min-h-[6rem] h-auto flex flex-col lg:flex-row lg:min-h-[11rem] ">
          {/* SHOP Section - Hidden on mobile */}
          <div className="flex-1 relative hidden lg:block">
            <div className="text-2xl w-full text-center absolute top-1/3 hover:underline cursor-pointer transition duration-500">
              SHOP
            </div>
          </div>
          {/* ABOUT Section - Always visible */}
          <div className="flex-1 lg:border-r lg:border-l border-black flex flex-col sm:flex-col md:flex-col lg:flex-col items-center relative">
            <div className="w-full text-2xl text-center mt-4 lg:mt-12 ">
              ABOUT
            </div>
            <div className="w-full flex flex-wrap items-center justify-center gap-4 bg-red-600 h-9 lg:h-auto mt-4 lg:mt-0">
              <span className="hover:underline cursor-pointer transition duration-500">
                Shop
              </span>
              <span className="hover:underline cursor-pointer transition duration-500">
                Contact
              </span>
              <span className="hover:underline cursor-pointer transition duration-500">
                FAQs
              </span>
            </div>
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="absolute top-0 right-0 bg-blue-400 font-bold transition duration-300 h-24 lg:hidden"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
              }}
            >
              ↑Top
            </div>
          </div>
          {/* CONTACT Section - Hidden on mobile */}
          <div className="flex-1 relative hidden lg:block">
            <div className="w-full text-2xl text-center absolute top-1/3 hover:underline cursor-pointer transition duration-500">
              CONTACT
            </div>
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="absolute top-0 right-0 bg-blue-400 font-bold pb-2 pl-2 pr-2 lg:hover:bg-blue-500 lg:hover:translate-y-[-4px] transition duration-300"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "upright",
                letterSpacing: "-0.01em",
                cursor: "pointer",
              }}
            >
              ↑To Top
            </div>
          </div>
        </div>

        <div className="border-b w-full flex flex-col lg:flex-row pt-5 lg:pb-8">
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 lg:pl-3 lg:pr-5 gap-3">
            <div className="flex flex-col gap-3 mb-7 lg:pl-0 lg:pt-14 border-b lg:border-0 pb-5 lg:pb-0 border-t pt-5 pl-1 pr-1 md:pl-5 md:pr-5">
              <h1 className="text-richblack-50 text-2xl font-bold bg-yellow-400">
                About Us
              </h1>
              <p className="text-sm lg:text-base">
                Welcome to the ultimate destination where your creative ideas
                come to life! Transform your walls into stunning masterpieces
                with our premium-quality posters, designed to elevate your space
                and reflect your unique style. Let your imagination soar as you
                explore endless possibilities to create a truly personalized and
                captivating environment.
              </p>
            </div>
          </div>

          <div className="lg:w-[50%] lg:pt-14 flex lg:flex-wrap flex-row pl-3 lg:pl-5 lg:gap-3 gap-5">
            <div className="w-[48%] sm:w-[45%] lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end md:pl-4">
                <h1 className="font-bold text-sm sm:text-base">Help</h1>
                <div className="hover:underline  cursor-pointer transition duration-500 text-sm sm:text-base">
                  Shipment
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Payments
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Cancellation Policy
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Track Your Order
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Return Policy
                </div>
              </div>
            </div>
            <div className="w-[48%] sm:w-[45%] lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end">
                <h1 className="font-bold text-sm sm:text-base">Legal Info</h1>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Terms & Conditions
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Privacy Policy
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Conditions
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Items Inside The Box
                </div>
              </div>
            </div>
            <div className="w-[48%] lg:w-[25%] mb-7 lg:pl-0">
              <div className="flex flex-col gap-2 mt-2 items-start lg:items-end">
                <h1 className="font-bold text-sm sm:text-base">FOLLOW US</h1>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  Instagram
                </div>
                <div className="hover:underline cursor-pointer transition duration-500 text-sm sm:text-base">
                  LinkedIn
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[2rem] sm:text-[3rem] lg:text-[10rem] w-full text-center font-extrabold font-serif">
          POSTERWEB
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto text-sm">
          <div className="flex gap-5"></div>
        </div>
      </div>
  );
};

export default Footer;
