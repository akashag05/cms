import React, { useEffect, useState } from "react";
import {
  Column,
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { fetchActivities } from "../Api/activityAPI";
import NoData from "../../components/NoData";

const Activities = () => {
  const initialValue = {
    activity_id: 0,
    activity_name: "",
    image_path: null,
    description: "",
    status: "",
  };

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [formData, setFormData] = useState(initialValue);
  const [showModal, setShowModal] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    const fetchedData = await fetchActivities();
    setData(fetchedData);
    console.log("data in file", fetchedData);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    let response;
    try {
      const addData = async () => {
        // response = await addBlog(formData);
        // setResponse(response);
      };
      addData();
      getData();
    } catch (error) {
      console.log(error);
    }

    console.log("Form Data after Submiting", formData);
    console.log("Response From Api", response);
  };

  const handleDelete = (e: any, cell: any) => {
    console.log("cell value", cell.row.values.userid);
    let id = cell.row.values.userid;
    // deleteUser(id);
    getData();
  };

  let fetchedData: any;

  const handleEdit = (e: any, cell: any) => {
    let id = cell.row.values.userid;
    const getSingleData = async () => {
      //   fetchedData = await getSingleUser(id);
      setUserData(fetchedData);
      console.log("Single USer Data", fetchedData.userName);
    };
    getSingleData();
  };

  const columns = React.useMemo<Column<any>[]>(
    () => [
      {
        Header: "Activity Id Id",
        accessor: "activity_id",
      },
      {
        Header: "Activity Name",
        accessor: "activity_name",
      },
      {
        Header: "Image",
        accessor: "image_path",
      },
      {
        Header: "Description",
        accessor: "description",
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
                  <h3 className="font-bold text-lg">Edit Activity Details</h3>
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
                      <label className="label">Activity Name</label>
                      <input
                        type="text"
                        name="activity_name"
                        // value={fetchedData.activity_name}
                        placeholder="Enter Activity Name"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Upload Activity Image</label>
                      <input
                        type="file"
                        name="userEmail"
                        // value={formData.userEmail}
                        // placeholder="Enter Activity Email"
                        className="file-input file-input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label"> Description</label>
                      <input
                        type="text"
                        name="description"
                        value={formData.description}
                        placeholder="Enter Short Description"
                        className="input input-bordered w-full max-w-xs"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">Activity Status</label>
                      <div className="flex">
                        <div className="m-4 flex mt-2">
                          <label>Active</label>
                          <input
                            type="radio"
                            name="Active"
                            value={formData.status}
                            className="radio"
                            checked={formData.status == "Active"}
                            onChange={() =>
                              setFormData({
                                ...formData,
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
                            value={formData.status}
                            className="radio"
                            checked={formData.status == "In-Active"}
                            onChange={() =>
                              setFormData({
                                ...formData,
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
  console.log("table data", data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Activity Management</p>
      <div className="border border-grey bg-white">
        <div className="flex justify-end">
          <label
            className="uppercase px-4 py-2 mx-3 my-3 bg-blue rounded text-white font-semibold hover:cursor-pointer"
            htmlFor="my-modal-4"
          >
            Add Activity
          </label>
        </div>

        {/* --------------------Add user Modal Start----------------------*/}
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-7/12 max-w-5xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">Add New Activity</h3>
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
            <div className="border border-grey p-4 m-3 rounded-md">
              <div className="flex flex-wrap justify-between">
                <div className="form-control w-full max-w-xs">
                  <label className="label">Activity Name</label>
                  <input
                    type="text"
                    name="activity_name"
                    value={formData.activity_name}
                    placeholder="Enter Activity Name"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">Upload Activity Image</label>
                  <input
                    type="file"
                    name="image"
                    // value={formData.userEmail}
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={(e) =>
                      //   console.log(e.target.files[0])
                      setFormData({
                        ...formData,
                        image_path: e.target.files ? e.target.files[0] : "",
                      })
                    }
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Enter Short Description"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">Activity Status</label>
                  <div className="flex">
                    <div className="m-4 flex mt-2">
                      <label>Active</label>
                      <input
                        type="radio"
                        name="Active"
                        value={formData.status}
                        className="radio"
                        checked={formData.status == "Active"}
                        onChange={() =>
                          setFormData({
                            ...formData,
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
                        value={formData.status}
                        className="radio"
                        checked={formData.status == "In-Active"}
                        onChange={() =>
                          setFormData({
                            ...formData,
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

export default Activities;
