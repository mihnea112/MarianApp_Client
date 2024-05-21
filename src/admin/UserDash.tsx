import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
            <>
              {users.jobs.length > 0 && (
                <div key={i} className="col-md-4">
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{users.name}</Typography>
                      <Typography className="ms-auto flex me-1">
                            {users.jobs.length} Job/-s
                          </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserDash;
