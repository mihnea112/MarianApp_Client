import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProxyy } from "../App";
import { log } from "console";
import moment from "moment";

function Car() {
  const { id } = useParams();
  const [carData, setCarData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const fetchData = async () => {
    await fetch(getProxyy() + `/car/` + id)
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
      });
    await fetch(getProxyy() + `/job/` + id)
      .then((response) => response.json())
      .then((data) => {
        setJobData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(jobData);

  return (
    <section className="car">
      <div className="container">
        <h1>My Car</h1>
        {carData != null && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <h5>License Plate: {(carData as any)[0].nPlate}</h5>
              </div>
              <div className="col-md-6">
                <h5>VIN: {(carData as any)[0].VIN}</h5>
              </div>
            </div>
            <h1>Job Request</h1>
            <a href={"/addJob/" + id} className="btn">
              Add Job
            </a>
            <table>
              <tr>
                <th>Tasks</th>
                <th>Status Service</th>
                <th>Data</th>
                <th>Changed Parts</th>
                <th>Feedback</th>
                <th>Approximate deadline</th>
              </tr>
              {jobData.map((job, i) => (
                <tr key={i}>
                  <td>{(job as any).tasks}</td>
                  <td>{(job as any).status}</td>
                  <td>
                    {moment(
                      ((job as any).date as string).split("T", 1),
                      "YYYY-MM-DD"
                    )
                      .format("DD.MM.YYYY")
                      .toString()}
                  </td>
                  <td>{(job as any).piese}</td>
                  <td>{(job as any).feedback}</td>
                  <td>{(job as any).deadline}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Car;
