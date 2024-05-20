import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import moment from "moment";

function UserDash() {
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const lsToken = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token: lsToken }),
  };
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
    const response = await fetch(getProxyy() + "/mecanic/jobs", options);
    if (response.status === 201) {
      const data = await response.json();
      setUsers(data);
      console.log(data);
    } else {
      alert("An error occured on loading your tasks");
    }
  }

  useEffect(() => {
    updateData();
  }, []);

  return (
    <section className="admin">
      <div className="container">
        <h1>Mecanic Dash</h1>
        <div className="row">
          {users.map((users: any, i) => (
            <div key={i} className="col-md-4">
              <h3>{users.name}</h3>
              {users.jobs.length > 0 && (
                <>
                  <table>
                    <thead>
                      <th>Tasks</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Car</th>
                    </thead>
                    {users.jobs.map((job: any) => (
                      <tbody>
                        <td>{job.tasks}</td>
                        <td>{job.status}</td>
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
                        <td>{job.car.nPlate}</td>
                      </tbody>
                    ))}
                  </table>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserDash;
