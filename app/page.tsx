import Image from "next/image";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import home from "../assets/home.png";
import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import blog1 from "../assets/blog1.jpg";
import support1 from "../assets/support1.png";
import support2 from "../assets/support2.png";
import support3 from "../assets/support3.png";
import support4 from "../assets/support4.png";
import support5 from "../assets/support5.png";
import water_bg from "../assets/water_bg.png";
export default function Home() {
  return (
    <>
      <div>
        <Image src={home} alt="" className="relative" />
        <Navbar />
      </div>
      <div className="flex ">
        <div className="w-1/4 flex flex-col justify-center items-center h-20 bg-cardb1">
          <p className=" text-white font-semibold">Benifit Achiver</p>
          <p className=" text-white text-xl font-semibold">1500000</p>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center h-20 bg-cardb2">
          <p className=" text-white font-semibold">Village</p>
          <p className=" text-white text-xl font-semibold">70</p>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center h-20 bg-cardb3">
          <p className=" text-white font-semibold">District</p>
          <p className=" text-white text-xl font-semibold">7</p>
        </div>
        <div className="w-1/4 flex flex-col justify-center items-center h-20 bg-cardb4">
          <p className=" text-white font-semibold">Water Level</p>
          <p className=" text-white text-xl font-semibold">450</p>
        </div>
      </div>
      <div className=" bg-white relative pt-8">
        <Image src={water_bg} alt="" className="w-full h-96 lg:h-full" />
        <div className="absolute inset-0 justify-center items-center my-6 text-black">
          {/* <div className=" absolute inset-0 justify-center items-center mt-10"> */}
          <p className="lg:text-3xl font-semibold text-center lg:p-6">
            By coming together now, <br />
            we can end water crises
          </p>
          {/* </div> */}
          <p className="text-center px-4 md:px-8 lg:px-16 xl:px-32 ">
            At Mission 500Crore Water , our objectives are - Providing permanent
            solutions to the water crisis in India by establishing rainwater
            harvesting projects, water sanitation facilities, Providing
            emergency water tankers and plantation of trees to revive the
            ecology.
          </p>
          <div className="flex justify-center items-center p-8">
            <button className="bg-blue p-2 rounded text-white">
              Our Projects
            </button>
          </div>
        </div>
      </div>
      <div className="bg-blue2">
        <Heading title="Our Projects" />
        <Carousel />
      </div>
      <div className="bg-white">
        <Heading title="Our Recent Activities" />
        <div className="flex flex-wrap justify-evenly p-4">
          <div className="border border-black h-28 w-2/5 my-3 rounded-2xl"></div>
          <div className="border border-black h-28 w-2/5 my-3 rounded-2xl"></div>
          <div className="border border-black h-28 w-2/5 my-3 rounded-2xl"></div>
          <div className="border border-black h-28 w-2/5 my-3 rounded-2xl"></div>
        </div>
      </div>

      <div className="bg-blue2">
        <Heading title="Achivements & Appreciation" />
        <div className="flex flex-wrap justify-center p-4 text-black">
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card1} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card2} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card3} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card4} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card1} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 m-2">
            <figure>
              <Image src={card1} alt="" />
            </figure>
            <div className="p-5 h-28 mt-4">
              <p>IKartavayam Reward 2022 - By Honorable Governor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue2">
        <Heading title="Video Documentry : Mission 500 MH" />
        {/* <Carousel /> */}
        <div className="flex justify-center items-center ">
          <iframe
            className="rounded-2xl"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/X93Y3-f37Fk"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        {/* <img src={yt_image} alt="" className="px-44 py-10" /> */}
      </div>

      <div className="bg-blue2 py-5">
        <Heading title="Latest blogs" />
        <div className="flex flex-wrap justify-evenly">
          <div className="border border-black rounded-2xl h-60 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-3 overflow-hidden">
            <Image src={blog1} alt="" className="h-full w-full" />
          </div>
          <div className="border border-black rounded-2xl h-60 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-3 overflow-hidden">
            <Image src={blog1} alt="" className="h-full w-full" />
          </div>
          <div className="border border-black rounded-2xl h-60 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-3 overflow-hidden">
            <Image src={blog1} alt="" className="h-full w-full" />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <Heading title="Our Heros" />
        <div className="text-black">
          <p className="flex justify-center items-center text-center px-10">
            There are very few people in this world, who are not just activists,
            but rather are creationists.
            <br /> People who decide to do something about a problem...
          </p>
          <div className="flex justify-evenly py-6">
            <div className="border-2 border-1-black rounded-2xl h-60 w-1/4 m-1 overflow-hidden">
              {/* <img src={blog1} alt="" className="h-full w-full" /> */}
            </div>
            <div className="border-2 border-1-black rounded-2xl h-60 w-1/4 m-1 overflow-hidden">
              {/* <img src={blog1} alt="" className="h-full w-full" /> */}
            </div>
          </div>
        </div>
        <div className="bg-grey text-black flex justify-between p-7 mx-14 rounded-xl">
          <h1 className="text-3xl justify-start font-bold">
            NEXT HERO COULD BE YOU !
          </h1>
          <button className="bg-blue p-2 rounded text-white justify-end">
            Share your efforts
          </button>
        </div>
      </div>

      <div className="bg-white">
        <Heading title="Our Supporters" />
        <div className="flex flex-wrap justify-center">
          <Image
            src={support1}
            alt=""
            className="w-20 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl mx-2 my-2"
          />
          <Image
            src={support2}
            alt=""
            className="w-20 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl mx-2 my-2"
          />
          <Image
            src={support3}
            alt=""
            className="w-20 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl mx-2 my-2"
          />
          <Image
            src={support4}
            alt=""
            className="w-20 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl mx-2 my-2"
          />
          <Image
            src={support5}
            alt=""
            className="w-20 sm:w-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-2xl mx-2 my-2"
          />
        </div>

        <div className="bg-grey text-black flex flex-col justify-center items-center py-8">
          <h2 className="font-semibold text-xl p-3">
            JOIN US IN WATTER LOGGING MISSION
          </h2>
          <p className="flex justify-center items-center text-center">
            For more information and for join to us in this water logging
            mission or to run this MISSION 500LT. in your VILLAGE, DISTRICT, and
            STATE please.
          </p>
          <div className="flex justify-center items-center p-8">
            <button className="bg-blue p-2 rounded text-white">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
