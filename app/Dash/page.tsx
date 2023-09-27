"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Users from "../adminPages/Users";
import Blogs from "../adminPages/Blogs";
import Activities from "../adminPages/Activities";
import AddSection from "../adminPages/AddSection";
import { fetchSection } from "../Api/api";
import DynamicForm from "../adminPages/DynamicForm";
import Members from "../adminPages/Members";

const Dashboard = () => {
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
    case "events":
      content = <h1>Our Services</h1>;
      break;
    case "news":
      content = <Activities />;
      break;
    case "members":
      content = <Members />;
      break;
    case "addsection":
      content = <AddSection />;
      break;
    default:
      content = <DynamicForm sectionName={selectedMenu} />;
      break;
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
    <div className="flex">
      <aside className="bg-gray-800 w-1/5 shadow-2xl h-screen border-r-2 border-grey">
        <div className="p-6">
          <div>
            <Image src={logo} alt="" className="h-24 w-20" />
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

            {/* <li>
              <button
                onClick={() => handleMenuClick("addsection")}
                className="flex w-max bg-blue p-2 m-2 rounded text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Section
              </button>
            </li> */}
          </ul>
        </div>
      </aside>

      <div className="flex-grow">
        <nav className="bg-gray-900 p-4 shadow-xl border-b-2 border-grey">
          <div className="flex items-center justify-between">
            <div>
              <a href="#" className="text-xl font-bold">
                Mission 500 | Admin Panel
              </a>
            </div>
          </div>
        </nav>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

export default Dashboard;
