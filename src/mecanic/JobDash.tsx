import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
export default function JobDash() {
  const { id } = useParams();
  const [role, setRole] = useState(null);
  const [cars, setCars] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [piese, setPiese] = useState("");
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
      }),
    };
    await fetch(getProxyy() + "/status", options)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
      });
    if (e.target.value === "Done") {
      window.location.replace("/mecanic");
    }
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
    console.log(response);
    updateData();
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
  return (
    <section className="job">
      {cars != null && (
        <div className="container">
          <h1> Job Nr.#{id}</h1>
          <div className="row">
            <div className="col-md-6">
              <h5>Tasks:{(jobs as any)[0].tasks}</h5>
              <h5>Status</h5>
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
          </div>
          {role == "2" && (
            <div className="container">
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
          )}
          <div className="row">
            {inspection.map((item, i) => (
              <div key={i} className="col-md-3">
                <h5>{(item as any).item_name}</h5>
                <Slider
                  aria-label="Temperature"
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
      )}
    </section>
  );
}
