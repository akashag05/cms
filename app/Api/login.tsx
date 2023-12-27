
export const loginUser = async (email: any, password: any) => {
  let body = {
    user_email: email,
    password: password,
  };

  const res = await fetch("http://127.0.0.1:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),

  });
  return res.json();
//  const data = await res.json();
//   return data; 
 
//  //Assuming the server returns a token in the response
//  const token = data.token;
//  if (!token) {
//    throw new Error("Token not found in the response");
//  }

//  return token;
};
