import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
function EditData() {
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    name: "",
    adresa: "",
    telefon: "",
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
  async function submit() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        name: userData.name,
        adresa: userData.adresa,
        telefon: userData.telefon,
      }),
    };
    const response = await fetch(getProxyy() + "/userdata/edit", options);
    console.log(response.status);

    if (response.status === 201) {
      window.location.replace("/user");
    }
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
