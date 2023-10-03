import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
} from "react";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { addBlog, fetchBlog, deleteblog } from "../Api/blogAPI";
import NoData from "../components/NoData";
import { addMember } from "../Api/membersAPI";
import { getAllEventsNews } from "../Api/getAllEvents";
import { AiFillEdit } from "react-icons/ai";
import { close } from "fs";

const Events = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [memberName, setMemberName] = useState("");

  const [title, setTitle] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventType, setEventType] = useState("");
  const [participants, setParticipants] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [data, setData] = useState<any>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [options, setOptions] = useState("option1");
  // State to store the selected year
  const [selectedYear, setSelectedYear] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  // console.log(selectedFile);

  const formData = new FormData();
  const handleUpload = () => {
    if (selectedFile) {
      // title, eventNewsType, eventNewsYear, shortDesc, participants, eventNewsLink
      formData.append("eventImage", selectedFile);
      formData.append("title", title);
      formData.append("shortDesc", shortDesc);
      formData.append("eventNewsType", eventType);
      formData.append("eventNewsLink", eventLink);
      formData.append("eventNewsYear", selectedYear);
      formData.append("participants", participants);
      console.log("selectedfile", selectedFile);

      fetch("http://localhost:5000/events/addEventNews", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log("body", formData);
          console.log("response", res);
          return res.json();
        })
        .then((data) => {
          console.log("File uploaded successfully:", data);
          console.log("data", data);
          // console.log(res)
          // Perform any additional actions or update the UI as needed
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
  };
  console.log("data event", data);
  console.log("options", options);
  const getData = async () => {
    return await getAllEventsNews();
    // console.log("get members response", response);
  };
  // useEffect(() => {
  //   getData();
  // }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useMemo(async () => {
    await getData().then((res) => {
      console.log("res - ", res);
      const filteredData = res.filter(
        (item: any) => item.eventNewsType == options
      );
      console.log("filtered", filteredData);
      setData(filteredData);
    });
  }, [options]);
  console.log("sorted data", data);

  let columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Year",
        accessor: "eventNewsYear",
      },
      {
        Header: "Description",
        accessor: "shortDesc",
      },
      {
        Header: "Participants",
        accessor: "participants",
      },
      {
        Header: "Photo",
        accessor: "",
      },
      {
        Header: "Link",
        accessor: "eventNewsLink",
      },
    ],
    []
  );

  let xdata = useMemo(() => data, [data]);

  // let tableInstance = useTable({ columns, data });
  // useEffect(()=>{
  //   if(data && data.length){
  //     tableInstance = useTable({ columns, data });
  //   }
  // },[data])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const currentYear = new Date().getFullYear();

  // Generate an array of years from 2015 to the current year
  const years = Array.from({ length: currentYear - 2014 }, (_, index) =>
    (currentYear - index).toString()
  );

  // Event handler for when a year is selected
  const handleYearSelect = (e: any) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="h-screen p-3 bg-bggrey">
      <p className="pb-5 text-xl">Events Management</p>
      <div className="bg-white border border-grey">
        <div className="flex justify-between">
          <div className="relative inline-block text-left">
            <select
              className="block w-full px-4 py-2 mx-3 my-3 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
              name="options"
              value={options}
              onChange={(event: any) => setOptions(event.target.value)}
            >
              <option value="option1">Event</option>
              <option value="option2">News</option>
            </select>
          </div>
          <label
            className="block px-4 py-2 mx-3 my-3 font-semibold leading-tight text-white border border-gray-300 rounded shadow appearance-none bg-blue hover:border-gray-400 focus:outline-none focus:shadow-outline"
            htmlFor="my-modal-4"
          >
            Add Media
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="w-7/12 max-w-5xl modal-box">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Add New Media</h3>
              <label htmlFor="my-modal-4" className="hover:cursor-pointer">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  stroke="black"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </label>
            </div>
            <div>
              <div className="divider"></div>
              <div className="flex justify-between">
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative inline-block text-left">
                    <label className="label">
                      <span className="text-lg label-text">Select Type</span>
                    </label>
                    <select
                      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                      name="eventType"
                      value={eventType}
                      onChange={(event: any) =>
                        setEventType(event.target.value)
                      }
                    >
                      <option value="option1">Event</option>
                      <option value="option2">News</option>
                    </select>
                  </div>
                  <div className="relative inline-block text-left">
                    <label className="label">
                      <span className="text-lg label-text">Select Year</span>
                    </label>
                    <select
                      className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                      name="year"
                      value={selectedYear}
                      onChange={handleYearSelect}
                    >
                      <option value="" disabled>
                        Select a year
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">
                      <span className="text-lg label-text">Enter Title</span>
                    </label>
                    <input
                      name="title"
                      type="text"
                      placeholder="Type here"
                      value={title}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                      onChange={(event: any) => setTitle(event.target.value)}
                    />
                  </div>

                  <div className="">
                    <label className="label">
                      <span className="text-lg label-text">
                        Select Event Image
                      </span>
                    </label>
                    <input
                      type="file"
                      accept=".png"
                      onChange={handleFileChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded shadow h-[2.35rem]"
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="text-lg label-text">
                        Enter Event Link
                      </span>
                    </label>
                    <input
                      name="memberName"
                      type="text"
                      placeholder="Type here"
                      value={eventLink}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                      onChange={(event: any) =>
                        setEventLink(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="text-lg label-text">
                        Enter Participants
                      </span>
                    </label>
                    <input
                      name="participants"
                      type="text"
                      placeholder="Type here"
                      value={participants}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow h-[2.35rem]"
                      onChange={(event: any) =>
                        setParticipants(event.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="text-lg label-text">
                        Short Description
                      </span>
                    </label>
                    <textarea
                      rows={1}
                      placeholder="Enter Short Description"
                      className="w-full px-4 py-1 border border-gray-300 rounded shadow"
                      name="shortDesc"
                      value={shortDesc}
                      onChange={(event: any) =>
                        setShortDesc(event.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------Add user Modal End----------------------*/}

        {data.length != 0 ? (
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full bg-white border border-grey">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    <th>Sr. No</th>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 font-bold border border-grey"
                        key={index}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="border border-gray-300"
                      key={index}
                    >
                      <td className="px-4 py-2 text-center border whitespace-nowrap border-grey">
                        {index + 1}
                      </td>
                      {row.cells.map((cell, index) => (
                        <>
                          <td
                            {...cell.getCellProps()}
                            className="px-4 py-2 text-center border whitespace-nowrap border-grey"
                            key={index}
                          >
                            {cell.render("Cell")}
                          </td>
                        </>
                      ))}
                      <td className="px-4 py-2 text-center border whitespace-nowrap border-grey">
                        {/* <button onClick={openModal}>
                          <AiFillEdit />
                        </button> */}
                        {/* <label
                          className="block font-semibold leading-tight border border-gray-300 rounded shadow appearance-none hover:border-gray-400 focus:outline-none focus:shadow-outline"
                          htmlFor="my-modal-5"
                        > */}
                          <AiFillEdit />
                        {/* </label> */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default Events;
