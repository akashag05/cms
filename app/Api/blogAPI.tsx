export const fetchBlog = async () => {
  const res = await fetch("http://localhost:8080/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const addBlog = async (props: any) => {
  console.log(props);
  // const res = await fetch("http://localhost:8080/addBlog", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(props),
  // });
  // console.log(res);
};

export const deleteblog = async (props: any) => {
  const res = await fetch(`http://localhost:8080/deleteblog/${props}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
};
