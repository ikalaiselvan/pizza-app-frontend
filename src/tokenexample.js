import { useState, useEffect } from "react";

export function TokenExample() {
  const [token, setToken] = useState(null);

  async function one (){
    const response = await fetch("http://localhost:4005/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "kalaiselvi",
        password: "password@123",
      }),
    });
    console.log(response);
  }
  one();
//   .then((res)=>res.json())
//   .then((data)=>console.log(data))

  localStorage.setItem("token", "my-token");


  useEffect(() => {
    // retrieve the token from storage or the server
    const retrievedToken =
      localStorage.getItem("token") ;
    setToken(retrievedToken);
  }, []);

  return <div>{token && <ChildComponent token={token} />}</div>;
}



function ChildComponent(props) {
  return <p>Your token is: {props.token}</p>;
}




localStorage.removeItem("token");
