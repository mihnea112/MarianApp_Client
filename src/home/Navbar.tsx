import React, { useEffect, useState } from "react";
import { getProxyy } from "../App";
interface INavProps {
  userIsLoggedIn: boolean;
  logout: () => void;
}

export default function Navbar({ userIsLoggedIn, logout }: INavProps) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    fetch(getProxyy() + `/user?token=` + token)
      .then((response) => response.json())
      .then((data) => {
        setRole((data as any).role);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(role);
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-*">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="images/ITS-min.png"
            alt="Bootstrap"
            width="96"
            height="80"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          <span className="" role="button">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </span>
        </button>
        <div
          className={`navbar-collapse ${navbarOpen ? "" : "collapse"}`}
          id="navbarTogglerDemo02"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Acasa
              </a>
            </li>
            {role == "1" ? (
              <>
                <li className="nav-item">
                  <a className="btn nav-link" href="/mecanic">
                    My Jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn nav-link" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                {role == "2" ? (
                  <>
                    <li className="nav-item">
                      <a className="btn nav-link" href="/carAdmin">
                        Admin Dash
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="btn nav-link" href="/userAdmin">
                        User Dash
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="btn nav-link" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    {userIsLoggedIn ? (
                      <>
                        <li className="nav-item">
                          <a className="btn nav-link" href="/dash">
                            Masinile mele
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="btn nav-link" href="/user">
                            Contul Meu
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="btn nav-link" onClick={logout}>
                            Logout
                          </a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item">
                          <a className="nav-link" href="/#about">
                            Despre noi
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/#servicii">
                            Servicii
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="btn nav-link" href="/#contact">
                            Contact
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="btn nav-link" href="/login">
                            Masinile mele/Login
                          </a>
                        </li>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
