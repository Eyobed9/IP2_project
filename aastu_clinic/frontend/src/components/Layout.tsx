import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";
import Footer from "./Footer/Footer";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Layout = () => {
  const { loggedIn, setLoggedIn, setRole } = useAuth();
  const [role, localRole] = useState<string>("");

  useEffect(() => {
    fetch(
      "http://localhost/ip2_project/aastu_clinic/backend/API/check_session.php",
      { method: "GET", credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) {
          setLoggedIn(true);
          setRole(data.role); // set global context role
          localRole(data.role); // set local state for Navbar
        } else {
          setLoggedIn(false);
          setRole("");
          localRole("");
        }
      });
  }, [loggedIn, setLoggedIn, setRole]);

  return (
    <div className="relative max-h-max min-h-screen overflow-x-clip">
      <div className="fixed backdrop-blur-3xl flex w-full">
        <Navbar role={role} />
      </div>
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
