import React, { useState } from "react";
import { getProxyy } from "../App";

function AddCar() {
  const [userData, setUserData] = useState({
    nPlate: "",
    VIN: "",
  });
  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ nPlate: userData.nPlate, VIN: userData.VIN,token: lsToken}),
    };
    const response = await fetch(getProxyy() + "/car/add", options);
    console.log(response.status);

    if (response.status === 201) {
      window.location.replace("/dash");
    } else {
      const errresp = await response.json();
      alert(response.status + ": " + errresp.err);
    }
  }

  return (
    <>
      <section className="add">
        <div className="container">
          <div className="add-div">
            <h1>Add Car</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="nPlate"
                onChange={handleChange}
                value={userData.nPlate}
                placeholder="Numar inmatriculare"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="VIN"
                onChange={handleChange}
                value={userData.VIN}
                placeholder="Serie sasiu/VIN"
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

export default AddCar;
