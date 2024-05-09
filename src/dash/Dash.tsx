import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";

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
          <h1>Your cars</h1>
          <a href="/addCar" className="btn">
            Add Car
          </a>
          {cars.length != 0 && (
            <>
              <table>
                <tr>
                  <th>Numar Inmatriculare</th>
                  <th>Serie Sasiu</th>
                </tr>
                {cars.map((cars, i) => (
                  <tr key={i}>
                    <td>
                      <a href={"/car/" + (cars as any).id} className="btn">
                        {(cars as any).nPlate}
                      </a>
                    </td>
                    <td>{(cars as any).VIN}</td>
                  </tr>
                ))}
              </table>
            </>
          )}
        </div>
      </section>
    </>
  );
}
export default Dash;
