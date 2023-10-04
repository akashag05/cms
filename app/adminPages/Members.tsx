import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { addBlog, fetchBlog, deleteblog } from "../Api/blogAPI";
import NoData from "../components/NoData";
import {
  addMember,
  deleteMember,
  getMember,
  getMemberById,
} from "../Api/membersAPI";

const Members = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memberName, setMemberName] = useState("");
  const [editMemberName, setEditMemberName] = useState("");
  const [data, setData] = useState<any[]>([]); // Provide a type
  const [memberID, setMemberID] = useState<any>(null); // Provide a type
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const handleEditFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  // console.log(selectedFile);
  const getData = async () => {
    let response = await getMember();
    setData(response);
    // console.log("get members response", response);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("memberPhoto", selectedFile);
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
    getData();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (cellValue: any) => {
    let response = await deleteMember(cellValue.row.original.id);
    getData();
  };

  const handleEdit = async (cell: any) => {
    setMemberID(cell.row.original.id);
    console.log("Single USer Data", memberID);
    await fetch(
      `http://localhost:5000/members/getMember/${cell.row.original.id}`,
      {
        method: "GET", // Use GET method for a GET request
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setEditMemberName(res[0].memberName);
      })
      .then(() => {
        openModal();
      });
  };

  const handleEditSubmit = () => {
    console.log("function called", memberID);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("memberPhoto", selectedFile);
      formData.append("memberName", editMemberName);
      console.log("formData", formData);

      fetch(`http://localhost:5000/members/updateMember/${memberID}`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => {
          console.log("response", res);
          return res.json();
        })
        // .then((data) => {
        //   console.log("File uploaded successfully:", data);
        //   console.log("data", data);
        // })
        .catch((error) => {
          console.error("Error uploading file:", error);
          // Handle the error and update the UI accordingly
        });
    }
    closeModal();
    getData();
  };

  const columns = React.useMemo<Column<any>[]>(
    () => [
      // {
      //   Header: "Member Id",
      //   accessor: "id",
      // },
      {
        Header: "Member Name",
        accessor: "memberName",
      },
      {
        Header: "Member Photo",
        accessor: "member_photo",
        Cell: ({ cell }) => {
          return (
            <div className="text-center">
              <img
                src={cell.row.original.memberPhoto_path} // Assuming cell.value contains the image URL
                alt="Member"
                style={{ width: "100px", height: "auto" }} // Adjust the size as needed
              />
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: ({ cell }: any) => (
          <div className="flex justify-center space-x-2">
            <label
              className="px-4 py-2 font-bold bg-blue-500 rounded hover:bg-blue-700"
              onClick={(e) => handleEdit(cell)}
              htmlFor="my-modal-5"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </label>

            {/* --------------------Edit user Modal Start----------------------*/}

            <button
              className="px-4 py-2 font-bold bg-red-500 rounded hover:bg-red-700"
              onClick={(e) => handleDelete(cell)}
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="red"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="h-screen p-3 bg-bggrey">
      <p className="pb-5 text-xl">Member Management</p>
      <div className="bg-white border border-grey">
        <div className="flex justify-end">
          <label
            className="px-4 py-2 mx-3 my-3 font-semibold text-white uppercase rounded bg-blue hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Member
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="w-7/12 max-w-5xl modal-box">
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">Add New Member</h3>
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="text-lg label-text">
                      Enter Member Name
                    </span>
                  </label>
                  <input
                    name="memberName"
                    type="text"
                    placeholder="Type here"
                    value={memberName}
                    className="w-full input input-bordered"
                    onChange={(event: any) => setMemberName(event.target.value)}
                  />
                </div>
                <div className="">
                  <label className="label">
                    <span className="text-lg label-text">
                      Select Member Photo
                    </span>
                  </label>
                  <input
                    type="file"
                    accept=".png"
                    onChange={handleFileChange}
                    className="w-full file-input file-input-bordered file-input-md"
                  />
                </div>
              </div>

              <div className="flex justify-end modal-action">
                <form method="dialog">
                  {/* <div className="flex justify-end"> */}
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  {/* </div> */}
                </form>
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
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column, index) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 font-bold border border-grey"
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
                          className="px-4 py-2 text-center border whitespace-nowrap border-grey"
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
      <div className="flex items-center justify-center h-screen">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={openModal}
        >
          Open Modal
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              {/* Content */}
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between px-3 pt-3 border-gray-300 border-solid rounded-t">
                  <h3 className="text-lg font-bold">Edit Member deatils</h3>
                  <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="divider"></div>
                {/* Body */}
                <div className="relative flex-auto px-6">
                  {" "}
                  <div className="flex flex-wrap justify-between">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="label">
                          <span className="text-lg label-text">
                            Enter Member Name
                          </span>
                        </label>
                        <input
                          name="memberName"
                          type="text"
                          placeholder="Type here"
                          value={editMemberName}
                          className="w-full input input-bordered"
                          onChange={(event: any) =>
                            setEditMemberName(event.target.value)
                          }
                        />
                      </div>
                      <div className="">
                        <label className="label">
                          <span className="text-lg label-text">
                            Select Member Photo
                          </span>
                        </label>
                        <input
                          type="file"
                          accept=".png"
                          onChange={handleEditFileChange}
                          className="w-full file-input file-input-bordered file-input-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-gray-300 border-solid rounded-b">
                  <button
                    className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    className="bg-[#5393E8] text-white active:bg-[#5393E8] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleEditSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black opacity-50"></div>
        )}
      </div>
    </div>
  );
};

export default Members;
