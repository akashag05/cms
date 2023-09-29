import React, { useState, ChangeEvent, FormEvent } from "react";
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

const Events = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberName, setMemberName] = useState("");
  const [data, setData] = useState<any[]>([]); // Provide a type
  const [userData, setUserData] = useState<any[]>([]); // Provide a type

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  // console.log(selectedFile);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("pdfFile", selectedFile);
      // formData.append('policy', selectedPolicy);
      formData.append("memberName", memberName);
      console.log("formData", formData);

      fetch("http://localhost:5000/members/addMember", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
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

  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Member Id",
        accessor: "member_id",
      },
      {
        Header: "Member Name",
        accessor: "memberName",
      },
      {
        Header: "Member Photo",
        accessor: "memberPhoto_path",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const currentYear = new Date().getFullYear();

  // Generate an array of years from 2015 to the current year
  const years = Array.from({ length: currentYear - 2014 }, (_, index) =>
    (currentYear - index).toString()
  );

  // State to store the selected year
  const [selectedYear, setSelectedYear] = useState("");

  // Event handler for when a year is selected
  const handleYearSelect = (e: any) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Events Management</p>
      <div className="border border-grey bg-white">
        <div className="flex justify-end">
          <label
            className="uppercase px-4 py-2 mx-3 my-3 bg-blue rounded text-white font-semibold hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Event
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-7/12 max-w-5xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Add New Event</h3>
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
              <div className="flex  justify-between">
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative inline-block text-left">
                    <label className="label">
                      <span className="label-text text-lg">Select Type</span>
                    </label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      name="dropdown"
                    >
                      <option value="option1">Event</option>
                      <option value="option2">News</option>
                    </select>
                  </div>
                  <div className="relative inline-block text-left">
                    <label className="label">
                      <span className="label-text text-lg">Select Year</span>
                    </label>
                    <select
                      className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
                      <span className="label-text text-lg">Enter Title</span>
                    </label>
                    <input
                      name="memberName"
                      type="text"
                      placeholder="Type here"
                      value={memberName}
                      className="input input-bordered w-full"
                      onChange={(event: any) =>
                        setMemberName(event.target.value)
                      }
                    />
                  </div>
                  <div className="">
                    <label className="label">
                      <span className="label-text text-lg">
                        Select Member Photo
                      </span>
                    </label>
                    <input
                      type="file"
                      accept=".png"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered file-input-md w-full"
                    />
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
          <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-grey">
              <thead>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="py-2 px-4 border border-grey font-bold"
                        key={index}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
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
                      {row.cells.map((cell, index) => (
                        <td
                          {...cell.getCellProps()}
                          className="py-2 px-4 whitespace-nowrap border border-grey text-center"
                          key={index}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
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
