import React, { useState, useEffect } from "react";
import InputSwitch from "../adminComponent/InputSwitch";
import { addSectionDetails, addSectionFormDetails } from "../Api/sectionAPI";

const AddSection = () => {
  const [sectionDetails, setSectionDetails] = useState({
    section_name: "",
    status: "",
  });
  const [formFields, setFormFields] = useState<any>([
    {
      name: "",
      type: "",
      values: ["", ""],
      required: "",
      section_name: "",
    },
    {
      name: "",
      type: "",
      values: ["", ""],
      required: "",
      section_name: "",
    },
  ]);

  // useEffect(() => {
  //   setFormFields({ ...formFields, section_name: sectionDetails.section_name });
  // }, [sectionDetails]);
  // const onChangefunc = (e: any) => {
  //   handleSectionDetailsChange(e);
  //   handleChange(e);
  // };
  const handleChange = (index?: any, event?: any) => {
    // console.log(event.target.value);
    const values = [...formFields];
    values[index][event.target.name] = event.target.value;
    values[index].section_name = sectionDetails.section_name;
    setFormFields(values);
    // setFormFields({ ...formFields, section_name: sectionDetails.section_name });
  };

  const handleSectionDetailsChange = (e: any) => {
    const { name, value } = e.target;
    console.log(value);
    setSectionDetails({ ...sectionDetails, [name]: value });
  };

  const handleAddFields = () => {
    setFormFields([
      ...formFields,
      {
        name: "",
        type: "",
        values: ["", ""],
        required: "",
        section_name: "",
      },
    ]);
  };

  const handleRemoveFields = (index: any) => {
    const values = [...formFields];
    console.log("index removed", index);
    values.splice(index, 1);
    setFormFields(values);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // setFormFields({ ...formFields, section_name: sectionDetails.section_name });
    let response;
    try {
      const addData = async () => {
        response = await addSectionDetails(sectionDetails);
        console.log("section details in function", sectionDetails);
        // setResponse(response);
      };
      addData();

      const addfieldData = async () => {
        response = await addSectionFormDetails(formFields);
        console.log("section form details in function", formFields);
        // setResponse(response);
      };
      addfieldData();
    } catch (error) {
      console.log(error);
    }

    console.log("Response From Api", response);
    console.log("Section name", sectionDetails);
    console.log("form field data", formFields);
  };

  return (
    <div className="p-3 bg-bggrey h-screen">
      <p className="text-xl pb-5">Add New Section Form</p>
      <div className="border border-grey bg-white">
        <div className="p-4">
          <div className="flex flex-row justify-between form-control w-full">
            <div>
              <label className="label">
                Section Name<span className="text-red">*</span>&nbsp;&nbsp; -
                &nbsp;&nbsp;
              </label>
              <input
                type="text"
                name="section_name"
                value={sectionDetails.section_name}
                placeholder="Enter Section Name"
                className="input input-bordered w-full max-w-xs"
                onChange={handleSectionDetailsChange}
              />
            </div>
            <div className=" flex form-control m-2  max-w-xs">
              <label className="label block">
                Section Status<span className="text-red">*</span>
              </label>
              <div className="flex">
                <div className="m-4 flex mt-2">
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    className="radio"
                    onChange={(event: any) => handleSectionDetailsChange(event)}
                  />
                  <label>&nbsp;Active </label>
                </div>
                <div className="flex mt-2">
                  <input
                    type="radio"
                    name="status"
                    value="In-Active"
                    className="radio"
                    onChange={(event: any) => handleSectionDetailsChange(event)}
                  />
                  <label>&nbsp;In-Active</label>
                </div>
              </div>
            </div>
          </div>
          <div className="py-6 mx-2">
            <p className="text-md font-semibold">Section & From Details</p>
          </div>
          <div className="border border-grey p-4">
            {formFields.map((field: any, index: any) => (
              <>
                <div className="flex justify-between" key={index}>
                  <div className="flex items-center">
                    <p>{index + 1}.)</p>
                  </div>
                  <div className="form-control m-2 w-full max-w-xs">
                    <label className="label block">
                      Name<span className="text-red">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      // value={formData.userName}
                      placeholder="Enter Field Name"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(event) => handleChange(index, event)}
                    />
                  </div>
                  <div className="form-control m-2 w-full max-w-xs">
                    <label className="label block">
                      Field Type<span className="text-red">*</span>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="type"
                      onChange={(event: any) => handleChange(index, event)}
                    >
                      <option selected value="text">
                        Text
                      </option>
                      <option value="textarea">Textarea</option>
                      <option value="email">Email</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="radio">Radio</option>
                      <option value="file">File</option>
                    </select>
                  </div>
                  <div className="form-control m-2  max-w-xs">
                    <label className="label block">
                      Field Required<span className="text-red">*</span>
                    </label>
                    <div className="flex">
                      <div className="m-4 flex mt-2">
                        <input
                          type="radio"
                          name="required"
                          value="Yes"
                          className="radio"
                          checked={formFields[index].status}
                          onChange={(event: any) => handleChange(index, event)}
                        />
                        <label>&nbsp;Yes </label>
                      </div>
                      <div className="flex mt-2">
                        <input
                          type="radio"
                          name="required"
                          value="No"
                          className="radio"
                          checked={formFields[index].status}
                          onChange={(event: any) => handleChange(index, event)}
                        />
                        <label>&nbsp;No</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {index != 0 && (
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="red"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="css-i6dzq1"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    )}
                  </div>
                </div>
                {formFields[index].type && (
                  <div>
                    <InputSwitch
                      index={index}
                      inputType={formFields[index].type}
                      formFields={formFields}
                      field={field}
                      setFormFields={setFormFields}
                    />
                  </div>
                )}
                <div className="divider"></div>
              </>
            ))}
            <div className="flex justify-end items-center">
              <button
                type="button"
                className="bg-blue py-2 px-4 rounded text-white"
                onClick={handleAddFields}
              >
                Add Field
              </button>
            </div>
          </div>
          <div className="flex justify-center p-2 m-2">
            <button
              type="button"
              className="bg-blue py-2 px-4 rounded text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
