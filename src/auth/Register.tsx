import React, { useState } from "react";
import { getProxyy } from "../App";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    adresa: "",
    telefon: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [checkbox, setChx] = useState(false);

  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    console.log(checkbox);
    if (userData.password !== userData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    if (checkbox === false) {
      alert("Please agree to all terms!");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        adresa: userData.adresa,
        telefon: userData.telefon,
        email: userData.email,
        password: userData.password,
      }),
    };

    const response = await fetch(getProxyy() + "/register", options);
    console.log(response.status);

    if (response.status === 201) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.replace("/dash");
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
            <h1>Register</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={userData.name}
                placeholder="Nume si Prenume"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="adresa"
                onChange={handleChange}
                value={userData.adresa}
                placeholder="Adresa"
                onMouseOut={()=>{alert("aborted")}}
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                name="telefon"
                onChange={handleChange}
                value={userData.telefon}
                placeholder="Telefon"
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                onChange={handleChange}
                value={userData.confirm_password}
                placeholder="Confirma Parola"
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="checkbox"
                onChange={()=> {setChx(prevData => !prevData)}}
                checked={checkbox}
              />
              <h5>
                Sunt de acord cu politica de protectie a datelor cu carcater
                personal
              </h5>
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

export default Register;
