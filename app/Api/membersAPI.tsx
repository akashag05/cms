export const addMember = async (props: any) => {
  console.log(props);
  const res = await fetch("http://localhost:5000/members/addMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props.file),
  });
  console.log(res);
};
