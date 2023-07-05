import React, { useEffect, useState } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { addBlog, fetchBlog, deleteblog } from "../Api/blogAPI";
import NoData from "../../components/NoData";

const Blogs = () => {
  const initialValue = {
    blog_id: 0,
    blog_title: "",
    blog_image: {},
    short_desc: "",
    long_desc: "",
    status: "",
  };

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [form, setform] = useState(initialValue);
  const [showModal, setShowModal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);
  const getData = async () => {
    const fetchedData = await fetchBlog();
    setData(fetchedData);
    console.log("data in file", fetchedData);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let data: any;
    try {
      let response;
      data = { ...form, blog_image: state };
      const addData = async () => {
        response = await addBlog(data);
        // setResponse(response);
      };
      addData();
      getData();
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data after Submiting", data);
    // console.log("Response From Api", response);
  };

  const handleDelete = (e: any, cell: any) => {
    console.log("cell value", cell.row.values.blog_id);
    let id = cell.row.values.blog_id;
    deleteblog(id);
    getData();
  };

  let fetchedData: any;

  const handleEdit = (e: any, cell: any) => {
    let id = cell.row.values.blog_id;
    const getSingleData = async () => {
      //   fetchedData = await getSingleUser(id);
      setUserData(fetchedData);
      //   console.log("Single USer Data", fetchedData.userName);
    };
    getSingleData();
  };

  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Blog Id",
        accessor: "blog_id",
      },
      {
        Header: "Blog Title",
        accessor: "blog_title",
      },
      {
        Header: "Image",
        accessor: "blog_image",
      },
      {
        Header: "Short Description",
        accessor: "short_desc",
      },
      {
        Header: "Long Description",
        accessor: "long_desc",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        Cell: ({ cell }: any) => (
          <div className="flex justify-center space-x-2">
            <label
              className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
              onClick={(e) => handleEdit(e, cell)}
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
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box w-7/12 max-w-5xl">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">Edit Blog Details</h3>
                  <label htmlFor="my-modal-5" className="hover:cursor-pointer">
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
                <div className="border border-grey p-4 m-3 rounded-md">
                  <div className="flex flex-wrap justify-between">
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Blog Title</label>
                      <input
                        type="text"
                        name="blog_title"
                        // value={fetchedData.blog_title}
                        placeholder="Enter Blog Title"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Upload Blog Image</label>
                      <input
                        type="file"
                        name="image"
                        // value={form.userEmail}
                        // placeholder="Enter User Email"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Short Description</label>
                      <input
                        type="password"
                        name="short_desc"
                        value={form.short_desc}
                        placeholder="Enter Short Description"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Long Description</label>
                      <textarea
                        className="textarea textarea-bordered"
                        placeholder="Bio"
                      ></textarea>
                      {/* <input
                    type="textarea"
                    name="short_desc"
                    value={form.short_desc}
                    placeholder="Enter Short Description"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  /> */}
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Blog Status</label>
                      <div className="flex">
                        <div className="m-4 flex mt-2">
                          <label>Active</label>
                          <input
                            type="radio"
                            name="Active"
                            value={form.status}
                            className="radio"
                            checked={form.status == "Active"}
                            onChange={() =>
                              setform({
                                ...form,
                                status: "Active",
                              })
                            }
                          />
                        </div>
                        <div className="flex mt-2">
                          {" "}
                          <label>In-Active</label>
                          <input
                            type="radio"
                            name="In-Active"
                            value={form.status}
                            className="radio"
                            checked={form.status == "In-Active"}
                            onChange={() =>
                              setform({
                                ...form,
                                status: "In-Actibe",
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <label
                    className="btn btn-primary"
                    htmlFor="my-modal-4"
                    onClick={handleSubmit}
                  >
                    Submit
                  </label>
                </div>
              </div>
            </div>

            <button
              className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
              onClick={(e) => handleDelete(e, cell)}
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
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Blog Management</p>
      <div className="border border-grey bg-white">
        <div className="flex justify-end">
          <label
            className="uppercase px-4 py-2 mx-3 my-3 bg-blue rounded text-white font-semibold hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Blog
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-7/12 max-w-5xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Add New Blog</h3>
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
            <form onSubmit={handleSubmit}>
              <div className="border border-grey p-4 m-3 rounded-md">
                <div className="flex flex-wrap justify-between">
                  <div className="form-control w-full max-w-xs">
                    <label className="label">Blog Title</label>
                    <input
                      type="text"
                      name="blog_title"
                      value={form.blog_title}
                      placeholder="Enter Blog title"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">Upload Blog Image</label>
                    <input
                      type="file"
                      name="image"
                      className="file-input file-input-bordered w-full max-w-xs"
                      onChange={(e) => setState(e.target.files[0]!)}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">Short Description</label>
                    <input
                      type="text"
                      name="short_desc"
                      value={form.short_desc}
                      placeholder="Enter Short Description"
                      className="input input-bordered w-full max-w-xs"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">Long Description</label>
                    <textarea
                      className="textarea textarea-bordered h-4"
                      placeholder="Bio"
                      name="long_desc"
                      value={form.long_desc}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="form-control w-full max-w-xs">
                    <label className="label">User Status</label>
                    <div className="flex">
                      <div className="m-4 flex mt-2">
                        <label>Active</label>
                        <input
                          type="radio"
                          name="Active"
                          value={form.status}
                          className="radio"
                          checked={form.status == "Active"}
                          onChange={() =>
                            setform({
                              ...form,
                              status: "Active",
                            })
                          }
                        />
                      </div>
                      <div className="flex mt-2">
                        {" "}
                        <label>In-Active</label>
                        <input
                          type="radio"
                          name="In-Active"
                          value={form.status}
                          className="radio"
                          checked={form.status == "In-Active"}
                          onChange={() =>
                            setform({
                              ...form,
                              status: "In-Actibe",
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <label htmlFor="my-modal-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    //   onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </label>
              </div>
            </form>
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

export default Blogs;
