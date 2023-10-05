"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Blogs from "../adminPages/Blogs";
import Events from "../adminPages/Events";
import Members from "../adminPages/Members";
import Users from "../adminPages/Users";
import router, { useRouter } from "next/navigation";
import Link from "next/link";

// import Activities from "./adminPages/Activities";
// import AddSection from "./adminPages/AddSection";
// import { fetchSection } from "./Api/api";
// import DynamicForm from "./adminPages/DynamicForm";

const Home = () => {
  interface section {
    section_id: number;
    section_name: string;
    status: string;
  }
  const [selectedMenu, setSelectedMenu] = useState("user");
  const [data, setData] = useState<section[]>([]);
  const router = useRouter();
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const handleMenuClick = (menu: any) => {
    setSelectedMenu(menu);
  };
  const handleSignOut = () => {
    setIsSignOutModalOpen(true);
  };
  const handleSignOutConfirm = () => {
    router.push("/");
    setIsSignOutModalOpen(false);
  };
  const handleSignOutCancel = () => {
    setIsSignOutModalOpen(false);
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
            <div className="font-semibold px-2">
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="p-4 overflow-auto min-h-fit">
          {/* Your content goes here */}
          {content}
        </div>
        {isSignOutModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white border-2 border-gray-600 px-7 py-4 rounded-lg shadow-xl">
              <p className="text-lg">Are you sure you want to sign out?</p>

              <div className="mt-4 flex justify-end">
                {/* <Link href="/"> */}
                {/* </Link> */}

                <button
                  className="px-4 mr-4 py-1 text-gray-700 rounded-lg"
                  onClick={handleSignOutCancel}
                >
                  Cancel
                </button>
                <button
                  className=" px-4 py-1 bg-blue text-white rounded-md border"
                  onClick={handleSignOutConfirm}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
