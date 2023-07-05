export const fetchSection = async () => {
  const res = await fetch("http://localhost:8080/sections", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const createNewTable = async (props: any) => {
  console.log("create new table porps in api function", props);
  const res = await fetch("http://localhost:8080/createnewtable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
  return res;
};
