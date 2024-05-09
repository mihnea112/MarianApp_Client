import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./home/Navbar";
import Footer from "./home/Footer";
import Main from "./Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dash from "./dash/Dash";
import AddCar from "./dash/addCar";
import AddJob from "./dash/addJob";
import Car from "./dash/Car";
import EditData from "./dash/EditData";
import MecanicDash from "./mecanic/MecanicDash";
import JobDash from "./mecanic/JobDash";
import AdminDash from "./admin/AdminDash";
import AddChecklist from "./admin/AddChecklist";
import AddMecanic from "./admin/AddMecanic";
import UserDash from "./admin/UserDash";

export function getProxyy() {
  return process.env.REACT_APP_DEVPROXY;
}
function App() {
  const [user, setUser] = useState({ role: "", token: "" });
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  function logout() {
    setUserIsLoggedIn(false);
    setUser({ role: "", token: "" });
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  useEffect(() => {
    const lsToken = localStorage.getItem("token");

    if (user.role) {
      setUserIsLoggedIn(true);
    } else if (lsToken !== null) {
      fetch(getProxyy() + "/user?token=" + lsToken).then((response) => {
        if (response.status === 201) {
          setUserIsLoggedIn(true);
        } else {
          setUserIsLoggedIn(false);
        }
      });
    } else {
      setUserIsLoggedIn(false);
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/mecanic",
      element: <>{userIsLoggedIn ? <MecanicDash /> : <Login />}</>,
    },
    {
      path: "/dash",
      element: <>{userIsLoggedIn ? <Dash /> : <Login />}</>,
    },
    {
      path: "/addCar",
      element: <>{userIsLoggedIn ? <AddCar /> : <Login />}</>,
    },
    {
      path: "/addJob/:id",
      element: <>{userIsLoggedIn ? <AddJob /> : <Login />}</>,
    },
    {
      path: "/car/:id",
      element: <Car />,
    },
    {
      path: "/editData",
      element: <EditData />,
    },
    {
      path: "/jobDash/:id",
      element: <JobDash />,
    },
    {
      path: "/carAdmin",
      element:<>{userIsLoggedIn ? <AdminDash /> : <Login />}</>,
    },
    {
      path: "/userAdmin",
      element: <>{userIsLoggedIn ? <UserDash /> : <Login />}</>,
    },
    {
      path: "/addChecklist",
      element: <>{userIsLoggedIn ? <AddChecklist /> : <Login />}</>,
    },
    {
      path: "/addMecanic",
      element: <>{userIsLoggedIn ? <AddMecanic /> : <Login />}</>,
    },
  ]);
  return (
    <>
      <Navbar userIsLoggedIn={userIsLoggedIn} logout={logout}></Navbar>
      <RouterProvider router={router}></RouterProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
