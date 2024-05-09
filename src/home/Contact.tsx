import React, { useState } from "react";
function Contact() {
  // useState => [variabila, functia de schimbare a variabilei]
  // useState[0], useState[1]()

  //const [variabila, seteazaVariabila] = useState("variabila")

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telefon: "",
    mesaj: "",
  });
  function handleChange(e: React.ChangeEvent<any>) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  function submit() {
    console.log(userData);
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="row con">
          <div className="col-md-4">
            <h1>Contacteaza-ne</h1>
          </div>
          <div className="col-md-8">
            <div className="row icon">
              <div className="col-md-4">
                <a href="">
                  <i className="fa fa-map-marker"></i> Calea Stan...
                </a>
              </div>
              <div className="col-md-4">
                <a href="">
                  <i className="fa fa-volume-control-phone"></i> +40-770-009-112
                </a>
              </div>
              <div className="col-md-4">
                <a href="">
                  <i className="fa fa-envelope"></i> demo@marianservice.ro
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  value={userData.name}
                  placeholder="Nume si Prenume"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={userData.email}
                  placeholder="Adresa de e-mail"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="telefon"
                  onChange={handleChange}
                  value={userData.telefon}
                  placeholder="Nr. de telefon"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="mesaj"
                  onChange={handleChange}
                  value={userData.mesaj}
                  placeholder="Mesaj"
                />
              </div>
              <button className="btn btn-primary" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </section>
  );
}
export default Contact;
