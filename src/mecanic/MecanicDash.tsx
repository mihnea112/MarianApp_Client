import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import moment from "moment";

function MecanicDash() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    updateData();
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
    const response = await fetch(getProxyy() + "/mecanic/car", options);
    if (response.status === 201) {
      const data = await response.json();
      setCars(data);
      console.log(data);
    } else {
      alert("An error occured on loading your tasks");
    }
  }
  return (
    <>
      <section className="job">
        <div className="container">
          <h1>My Jobs</h1>
          {cars.map((car, i) => (
            <div key={i}>
              {(car as any).jobs.length > 0 && (
                <>
                  <h1>{(car as any).nPlate}</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Tasks</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(car as any).jobs.map((job, i) => (
                        <tr
                          key={i}
                          onClick={() => {
                            window.location.href = "/jobDash/" + job.id;
                          }}
                        >
                          <td>{job.status}</td>
                          <td>{job.tasks}</td>
                          {job.date != null && (
                            <td>
                              {moment(
                                (job.date as string).split("T", 1),
                                "YYYY-MM-DD"
                              )
                                .format("DD.MM.YYYY")
                                .toString()}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </>

    //job-uri+istoricul masinii
    //modificare status
    //checklist
  );
}

export default MecanicDash;
