export const addSectionDetails = async (props: any) => {
  console.log("data in api", props);
  const res = await fetch("http://localhost:8080/addSectionDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  console.log(res);
};

export const addSectionFormDetails = async (props: any) => {
  console.log("data in api", props);
  const res = await fetch("http://localhost:8080/addSectionFormDetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
};

export const sectionformdetails = async (props: any) => {
  const res = await fetch(`http://localhost:8080/sectionformdetails/${props}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);
  return data;
};
