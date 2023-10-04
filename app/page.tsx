"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Users from "./adminPages/Users";
import Blogs from "./adminPages/Blogs";
// import Activities from "./adminPages/Activities";
// import AddSection from "./adminPages/AddSection";
// import { fetchSection } from "./Api/api";
// import DynamicForm from "./adminPages/DynamicForm";
import Members from "./adminPages/Members";
import Events from "./adminPages/Events";

const Home = () => {
  interface section {
    section_id: number;
    section_name: string;
    status: string;
  }
  const [selectedMenu, setSelectedMenu] = useState("user");
  const [data, setData] = useState<section[]>([]);

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

    case "members":
      content = <Members />;
      break;
    case "events":
      content = <Events />;
      break;
    // case "addsection":
    //   content = <AddSection />;
    //   break;
    // default:
    //   content = <DynamicForm sectionName={selectedMenu} />;
    // break;
  }

  // const getData = async () => {
  //   const fetchedData = await fetchSection();
  //   setData(fetchedData);
  // };
  // // console.log("data in file", data);
  // useEffect(() => {
  //   getData();
  // }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 border-r-2 shadow-2xl border-grey">
        <div className="p-6">
          <div>
            <Image src={logo} alt="" className="w-20 h-24" />
          </div>
          <ul className="p-4">
            <li className="mb-4">
              <button
                className="block hover:text-gray-300"
                onClick={() => handleMenuClick("user")}
              >
                Users
              </button>
            </li>
            <li className="mb-4">
              <button
                className="block hover:text-gray-300"
                onClick={() => handleMenuClick("blog")}
              >
                Blogs
              </button>
            </li>
            <li className="mb-4">
              <button
                className="block hover:text-gray-300"
                onClick={() => handleMenuClick("members")}
              >
                Members
              </button>
            </li>
            <li className="mb-4">
              <button
                className="block hover:text-gray-300"
                onClick={() => handleMenuClick("events")}
              >
                Events
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Navbar */}
        <nav className="p-4 bg-gray-900 border-b-2 shadow-xl border-grey">
          <div className="flex items-center justify-between">
            <div>
              <a href="#" className="text-xl font-bold">
                Mission 500 | Admin Panel
              </a>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="min-h-screen p-4 overflow-auto">
          {/* Your content goes here */}
          {content}
        </div>
      </div>
    </div>
  );
};

export default Home;
