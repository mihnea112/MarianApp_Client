import React, { useState } from "react";
import { getProxyy } from "../App";
function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    };
    const response = await fetch(getProxyy() + "/login", options);
    console.log(response.status);

    if (response.status === 201) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.role == "2") {
        window.location.replace("/carAdmin");
      } else if (data.role == "1") {
        window.location.replace("/mecanic");
      } else {
        window.location.replace("/dash");
      }
    } else {
      const errresp = await response.json();
      alert(response.status + ": " + errresp.err);
    }
  }

  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login-div">
            <h1>Login</h1>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={userData.email}
                placeholder="E-mail"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={userData.password}
                placeholder="Parola"
              />
            </div>
            <div className="form-group">
              <h5>Nu aveti cont?</h5>
              <a href="/register">Register</a>
            </div>
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
