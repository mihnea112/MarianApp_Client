import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import { DirectionsCarFilled } from "@mui/icons-material";
import { colors } from "@mui/material";

function Dash() {
  const [cars, setCars] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    updateData();
    // eslint-disable-next-line
  }, []);
  async function updateData() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: lsToken }),
    };
    const response = await fetch(getProxyy() + "/car", options);
    if (response.status === 201) {
      const data = await response.json();
      setCars(data);
      console.log(cars);
    } else {
      alert("An error occured on loading your tasks");
    }
  }
  return (
    <>
      <section className="cars">
        <div className="container">
          <h1>My Cars</h1>
          <a href="/addCar" className="btn">
            Add Car
          </a>
          <div className="row">
            {cars.length != 0 && (
              <>
                {cars.map((cars, i) => (
                  <div
                    className="col-md-4 carss"
                    onClick={() => {
                      window.location.href = "/car/" + (cars as any).id;
                    }}
                  >
                    <DirectionsCarFilled
                      sx={{ fontSize: 60 }}
                    ></DirectionsCarFilled>
                    <h5>License Plate: {(cars as any).nPlate}</h5>
                    <h5>VIN: {(cars as any).VIN}</h5>
                  </div>
                ))}

                {/* <table>
                <tr>
                  <th>Numar Inmatriculare</th>
                  <th>Serie Sasiu</th>
                </tr>
                {cars.map((cars, i) => (
                  <tr key={i} onClick={()=>{window.location.href = "/car/" + (cars as any).id}}>
                    <td>
                        {(cars as any).nPlate}
                    </td>
                    <td>{(cars as any).VIN}</td>
                  </tr>
                ))}
              </table> */}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default Dash;
