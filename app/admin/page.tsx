"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.png";
import Users from "./adminPages/Users";
import Blogs from "./adminPages/Blogs";
import Activities from "./adminPages/Activities";

const Page = () => {
  const [selectedMenu, setSelectedMenu] = useState("user");

  const handleMenuClick = (menu: any) => {
    setSelectedMenu(menu);
  };

  let content;
  switch (selectedMenu) {
    case "user":
      content = <Users />;
      break;
    case "blog":
      content = <Blogs />;
      break;
    case "achievement":
      content = <h1>Our Services</h1>;
      break;
    case "activity":
      content = <Activities />;
      break;
    case "hero":
      content = <h1>Contact Us</h1>;
      break;
    default:
      content = <h1>Page Not Found</h1>;
      break;
  }

  return (
    <div className="flex">
      <aside className="bg-gray-800 w-1/5 shadow-2xl h-screen border-r-2 border-grey">
        <div className="p-6">
          <div>
            <Image src={logo} alt="" className="h-24 w-20" />
          </div>
          <ul className="p-4">
            <li className="mb-4">
              <button
                className={`block hover:text-gray-300 ${
                  selectedMenu === "user" ? "text-gray-300" : ""
                }`}
                onClick={() => handleMenuClick("user")}
              >
                User&apos;s
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`block hover:text-gray-300 ${
                  selectedMenu === "blog" ? "text-gray-300" : ""
                }`}
                onClick={() => handleMenuClick("blog")}
              >
                Blog&apos;s
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`block hover:text-gray-300 ${
                  selectedMenu === "activity" ? "text-gray-300" : ""
                }`}
                onClick={() => handleMenuClick("activity")}
              >
                Activitie&apos;s
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`block hover:text-gray-300 ${
                  selectedMenu === "hero" ? "text-gray-300" : ""
                }`}
                onClick={() => handleMenuClick("hero")}
              >
                Hero&apos;s
              </button>
            </li>
            <li className="mb-4">
              <button
                className={`block hover:text-gray-300 ${
                  selectedMenu === "achievement" ? "text-gray-300" : ""
                }`}
                onClick={() => handleMenuClick("achievement")}
              >
                Achievement&apos;s
              </button>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-grow">
        <nav className="bg-gray-900 p-4 shadow-xl border-b-2 border-grey">
          <div className="flex items-center justify-between">
            <div>
              <a href="#" className="text-xl font-bold">
                Mission 500 | Admin Pannel
              </a>
            </div>
          </div>
        </nav>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

export default Page;
