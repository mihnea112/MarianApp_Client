import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import moment from "moment";
export default function JobDash() {
  const { id } = useParams();
  const [role, setRole] = useState(null);
  const [cars, setCars] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [history, setHistory] = useState([]);
  const [piese, setPiese] = useState("");
  const [feedback, setFeedback] = useState("");
  const [deadline, setDeadline] = useState("");
  const [checklist, setChecklist] = useState(false);
  const [inspection, setInspection] = useState([]);
  const lsToken = localStorage.getItem("token");

  async function updateData() {
    var carI = 0;
    const fetchData = async () => {
      await fetch(getProxyy() + `/jobs/` + id)
        .then((response) => response.json())
        .then((data) => {
          carI = data[0].carId;
          setJobs(data);
          setPiese(data[0].piese);
          setFeedback(data[0].feedback);
          setDeadline(data[0].deadline);
          if (data[0].status === "In Progress") {
            setChecklist(true);
          } else {
            setChecklist(false);
          }
          console.log(data[0].status);
        });
      await fetch(getProxyy() + `/job/` + carI)
        .then((response) => response.json())
        .then((data) => {
          setHistory(data);
        });
      await fetch(getProxyy() + `/car/` + carI)
        .then((response) => response.json())
        .then((data) => {
          setCars(data);
        });
      await fetch(getProxyy() + `/inspect/` + carI)
        .then((response) => response.json())
        .then((data) => {
          setInspection(data);
          console.log(data);
        });
      await fetch(getProxyy() + `/user?token=` + lsToken)
        .then((response) => response.json())
        .then((data) => {
          setRole((data as any).role);
        });
    };
    await fetchData();
  }
  async function handleChange(e: React.ChangeEvent<any>) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: (jobs as any)[0].id,
        token: lsToken,
        status: e.target.value,
        nPlate: (cars as any)[0].nPlate,
        uId: (cars as any)[0].userId,
      }),
    };
    await fetch(getProxyy() + "/status", options)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        if (data[0].status === "In Progress") {
          setChecklist(true);
        } else {
          setChecklist(false);
        }
      });
  }
  useEffect(() => {
    updateData();
  }, []);
  async function handleSlider(value: number, i: number) {
    const inspectionData = inspection;
    (inspectionData as any)[i].val = value;

    setInspection((prevData) => {
      var data = prevData as any;

      (data as any)[i].val = value;
      return data;
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: (inspectionData as any)[i].id,
        val: (inspectionData as any)[i].val,
        token: lsToken,
      }),
    };
    const response = await fetch(getProxyy() + "/inspection", options);
    updateData();
    console.log(response);
  }
  async function handleSave() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        piese: piese,
        token: lsToken,
      }),
    };
    const response = await fetch(getProxyy() + "/piese", options);
    console.log(response);
  }
  async function handleSaveD() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        id: id,
        token: lsToken,
        deadline: deadline,
        uId: (cars as any)[0].userId,
      }),
    };
    const response = await fetch(getProxyy() + "/deadline", options);
    console.log(response);
  }
  async function handleSavef() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        jobId: id,
        content: feedback,
        token: lsToken,
      }),
    };
    const response = await fetch(getProxyy() + "/feedback", options);
    console.log(response);
  }
  return (
    <section className="job">
      {cars != null && (
        <div className="container">
          <h1> Job Nr.#{id}</h1>
          <div className="row margin">
            <div className="col-md-6">
              <h5>Tasks:{(jobs as any)[0].tasks}</h5>
              <h5>Status:</h5>
              <select
                name="status"
                defaultValue={(jobs as any)[0].status}
                onChange={handleChange}
                className="form-select form-select-sm"
              >
                <option value="Waiting">Waiting</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="col-md-6">
              <h5>Nr. Inmatriculare: {(cars as any)[0].nPlate}</h5>
              <h5>Vin: {(cars as any)[0].VIN}</h5>
            </div>
            {checklist && (
              <div className="col-md-6 mx-auto">
                <h3>Approximate deadline</h3>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e: any) => {
                    setDeadline(e.target.value);
                  }}
                />
                <button className="btn btn-primary" onClick={handleSaveD}>
                  Save
                </button>
              </div>
            )}
          </div>
          {role == "2" && (
            <div className="row">
              <div className="col-md-6">
                <h3>Add Piese</h3>
                <input
                  type="text"
                  value={piese}
                  onChange={(e: any) => {
                    setPiese(e.target.value);
                  }}
                />
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
              <div className="col-md-6">
                <h3>Feedback Propietar</h3>
                <input
                  type="text"
                  value={feedback}
                  onChange={(e: any) => {
                    setFeedback(e.target.value);
                  }}
                />
                <button className="btn btn-primary" onClick={handleSavef}>
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="container">
            <div className="row">
              {inspection.map((item, i) => (
                <div key={i} className="col-md-3">
                  <h5>{(item as any).item_name}</h5>
                  <Slider
                    aria-label="Checklist"
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={1}
                    marks
                    min={0}
                    value={(item as any).val}
                    onChange={(_: any, val: any) => {
                      handleSlider(val, i);
                    }}
                    max={2}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="container">
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Istoricul Vehiculului</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <table>
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Tasks</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 && (
                      <>
                        {history.map((job: any, i) => (
                          <tr key={i}>
                            <td>{job.status}</td>
                            <td>{job.tasks}</td>
                            <td>
                              {moment(
                                (job.date as string).split("T", 1),
                                "YYYY-MM-DD"
                              )
                                .format("DD.MM.YYYY")
                                .toString()}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      )}
    </section>
  );
}
