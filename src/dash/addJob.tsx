import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
import { useParams } from "react-router-dom";

function AddJob() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    tasks: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const lsToken = localStorage.getItem("token");
      const options3 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: lsToken }),
      };
      const response12 = await fetch(getProxyy() + "/car", options3);
      if (response12.status === 201) {
        const data = await response12.json();
        setCars(data);
      } else {
        alert("An error occured on loading your tasks");
      }
    };
    const result = fetchData().catch(console.error);
    console.log(result);
  }, []);
  const [cars, setCars] = useState([]);
  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
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
      body: JSON.stringify({ carId: id, tasks: userData.tasks, token: lsToken }),
    };
    const response = await fetch(getProxyy() + "/jobs/add", options);
    console.log(response.status);

    if (response.status === 201) {  
      window.location.replace("/car/"+id);
    } else {
      const errresp = await response.json();
      alert(response.status + ": " + errresp.err);
    }
  }

  return (
    <>
      <section className="add">
        <div className="container">
          <div className="add-div">
            <h1>Add Job</h1>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="tasks"
                onChange={handleChange}
                value={userData.tasks}
                placeholder="Ce e de facut?"
              />
            </div>
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
export default AddJob;
