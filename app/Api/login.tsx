export const loginUser = async (email: any, passowrd: any) => {
  let body = {
    user_email: email,
    password: passowrd,
  };

  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};
