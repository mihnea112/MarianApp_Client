import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import moment from "moment";

function UserDash() {
  const [add, setAdd] = useState(false);
  const [jobs, setJobs] = useState([]);
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
      setJobs(data);
    } else {
      alert("An error occured on loading your tasks");
    }
    const response2 = await fetch(getProxyy() + "/mecanic", options);
    if (response2.status === 201) {
      const data = await response2.json();
      setUsers(data);
    } else {
      alert("An error occured on loading your tasks");
    }
  }

  useEffect(() => {
    updateData();
  }, []);

  async function handleAdd() {
    console.log(email);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: lsToken, email: email }),
    };
    const response = await fetch(getProxyy() + "/mecanic/add", options);
    if (response.status === 201) {
      updateData();
      setAdd(false);
      setEmail("");
    } else {
      alert("Email adress is not valid");
    }
  }
  async function deleteMecanic(email: any) {
    // const options = {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // };
    // const response = await fetch(
    //   getProxyy() + "/mecanic/delete/" + email,
    //   options
    // );
    // if (response.status === 201) {
    //   updateData();
    // }
  }

  return (
    <section className="admin">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Jobs without mecanic</h3>
            {jobs.map((car, i) => (
              <div key={i}>
                {(car as any).jobs.length > 0 && <h3>{(car as any).nPlate}</h3>}
                <table>
                  {(car as any).jobs.length > 0 && (
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Tasks</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                  )}
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
              </div>
            ))}
          </div>
          <div className="col-md-6">
            <h3>Mechanics</h3>
            {!add ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAdd(true);
                }}
              >
                Add Mecanic
              </button>
            ) : (
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                />
                <button className="btn" onClick={handleAdd}>
                  Add
                </button>
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Delete</td>
                </tr>
              </thead>
              {(users as any).map((user, i) => (
                <tbody key={i}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <i
                        className="bi bi-trash"
                        onClick={() => {
                          deleteMecanic(user.email);
                        }}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDash;
