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

const Members = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberName, setMemberName] = useState("");
  const [data, setData] = useState<any[]>([]); // Provide a type
  const [userData, setUserData] = useState<any[]>([]); // Provide a type

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };
  console.log(selectedFile);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedFile && memberName) {
      const data = {
        member_photo: selectedFile,
        memberName: memberName,
      };
      // const formData = new FormData();
      // formData.append("file", selectedFile);
      // formData.append("memberName", memberName);
      // console.log(formData);
      try {
        const getData = async () => {
          let response = await addMember(data);
        };
        getData();
      } catch (error) {
        //console.log(error);
      }
    } else {
      console.log("File and/or Name is missing.");
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
        accessor: "member_name",
      },
      {
        Header: "Member Photo",
        accessor: "member_photo",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Member Management</p>
      <div className="border border-grey bg-white">
        <div className="flex justify-end">
          <label
            className="uppercase px-4 py-2 mx-3 my-3 bg-blue rounded text-white font-semibold hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Member
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-7/12 max-w-5xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Add New Member</h3>
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
              <div>
                <label className="label">
                  <span className="label-text text-lg">Enter Policy Name</span>
                </label>
                <input
                  name="memberName"
                  type="text"
                  placeholder="Type here"
                  value={memberName}
                  className="input input-bordered w-full"
                  onChange={(event: any) => setMemberName(event.target.value)}
                />
              </div>
              <div className="pt-6">
                <input
                  // name="selectedFile"
                  type="file"
                  accept=".png"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-sm w-full"
                />
              </div>
              <div className="flex justify-end">
                <button onClick={handleSubmit} className="btn btn-primary">
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

export default Members;
