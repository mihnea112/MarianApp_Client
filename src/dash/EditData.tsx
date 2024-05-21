import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
function EditData() {
const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    name: "",
    adresa: "",
    telefon: "",
    email: "",
  });
  const fetchData = async () => {
    await fetch(getProxyy() + `/userdata?token=` + token)
      .then((response) => response.json())
      .then(([data]) => {
        setUserData(data);
        console.log(data);
      });
  };
  useEffect(() => {
    fetchData();
    console.log(userData);
    
  }, []);
  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit (){

  }
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="login-div">
            <h1>Contul meu</h1>
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
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditData;
