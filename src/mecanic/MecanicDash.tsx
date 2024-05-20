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

function MecanicDash() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
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
          <div className="row">
            <SearchCar
              search={search}
              setSearch={setSearch}
              options={cars.map((car: any) => car.nPlate)}
            ></SearchCar>
            {cars
              .filter((car: any) => car.nPlate.includes(search))
              .map((car, i) => (
                <>
                  {(car as any).jobs.length > 0 && (
                    <div key={i} className="col-md-4">
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls="panel1-content"
                          id="panel1-header"
                        >
                          <Typography>{(car as any).nPlate}</Typography>
                          <Typography className="ms-auto flex me-1">
                            {(car as any).jobs.length} Job/-s
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <table>
                            <thead>
                              <tr>
                                <th>Id</th>
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
                                  <td>{job.id}</td>
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
                  )}
                </>
              ))}
          </div>
        </div>
      </section>
    </>

    //job-uri+istoricul masinii
    //modificare status
    //checklist
  );
}
export default MecanicDash;
function SearchCar({
  options,
  search,
  setSearch,
}: {
  options: string[];
  search: string;
  setSearch: (str: string) => void;
}) {
  // const options = ['Option 1', 'Option 2'];

  //[string, React.Dispatch<React.SetStateAction<string>>]

  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="SearchCar">
      <Autocomplete
        value={search}
        onChange={(_: any, newValue: string | null) => {
          console.log(newValue);

          setSearch(newValue || "");
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="SearchCar"
        options={options}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />
    </div>
  );
}
