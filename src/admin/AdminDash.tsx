import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import moment from "moment";

function AdminDash() {
  const [cars, setCars] = useState([]);
  const [checklist, setChecklist] = useState([]);
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
    const response = await fetch(getProxyy() + "/cars/jobs", options);
    if (response.status === 201) {
      const data = await response.json();
      setCars(data);
    } else {
      alert("An error occured on loading your tasks");
    }
    const response2 = await fetch(getProxyy() + "/checklist", options);
    if (response2.status === 201) {
      const data = await response2.json();
      setChecklist(data);
    } else {
      alert("An error occured on loading your tasks");
    }
    const response3 = await fetch(getProxyy() + "/mecanic", options);
    if (response3.status === 201) {
      const data = await response3.json();
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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: lsToken, email: email }),
    };
    const response = await fetch(getProxyy() + "/mecanic/delete", options);
    if (response.status === 201) {
      updateData();
    }
  }
  return (
    <section className="admin">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1>Add/Edit Cars + Jobs</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                window.location.href = "/addCar";
              }}
            >
              Add Car
            </button>
            {cars.map((car, i) => (
              <div key={i}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{(car as any).nPlate}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h1>Edit Checklist</h1>
            <button
              className="btn btn-primary"
              onClick={() => {
                window.location.href = "/addChecklist";
              }}
            >
              Add Item
            </button>
            <table>
              <thead>
                <tr>
                  <th>Nume</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(checklist as any).map((check, i) => (
                  <CheckItem
                    key={i}
                    id={check.id}
                    checkItem={check.item as string}
                  />
                ))}
              </tbody>
            </table>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
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
    //add+edit cars + jobs
    //edit piese schimbate
    //edit checklist
    //add/edit mecanic
  );
}

export default AdminDash;
function CheckItem({ checkItem, id }: { checkItem: string; id: number }) {
  const [edit, setEdit] = useState(false);
  const [itemname, setItemname] = useState(checkItem);

  async function deleteCheck() {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch(
      getProxyy() + "/checklist/delete/" + id,
      options
    );
    if (response.status === 201) {
      window.location.href = "/carAdmin";
    }
  }
  console.log(checkItem);

  async function handleSave() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: lsToken, id: id, item: itemname }),
    };
    const response = await fetch(getProxyy() + "/checklist/edit", options);
    if (response.status === 201) {
      setEdit(false);
    }
  }

  return (
    <tr>
      {!edit ? (
        <td
          onClick={() => {
            setEdit(true);
          }}
        >
          {itemname}
        </td>
      ) : (
        <td>
          <input
            type="text"
            value={itemname}
            onChange={(e: any) => {
              setItemname(e.target.value);
            }}
          />
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </td>
      )}
      <td>
        <i className="bi bi-trash" onClick={deleteCheck}></i>
      </td>
    </tr>
  );
}
