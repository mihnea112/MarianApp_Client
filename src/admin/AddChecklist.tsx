import React, { useState } from "react";
import { getProxyy } from "../App";

function AddChecklist() {
  const [checklistData, setChecklistData] = useState({
    item: "",
  });
  function handleChange(e: React.ChangeEvent<any>) {
    setChecklistData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    const lsToken = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        item: checklistData.item,
        token: lsToken
      }),
    };
    const response = await fetch(getProxyy() + "/checklist/add", options);
    console.log(response.status);
    window.location.replace("/carAdmin");
  }
  return <>
   <section className="add">
        <div className="container">
          <div className="add-div">
            <h1>Add Job</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="item"
                onChange={handleChange}
                value={checklistData.item}
                placeholder="Checklist item"
              />
            </div>
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </section></>;
}

export default AddChecklist;
