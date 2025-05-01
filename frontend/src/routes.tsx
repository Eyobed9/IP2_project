import {createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSignup from "./pages/AdminSignup";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Contact from "./pages/Contact"
import About from "./components/Home/About";
import Services from "./components/Home/Services";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";


const routes = createBrowserRouter([
    {
        path: "",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/services", element: <Services/>},
            {path: "/about", element: <About/>},
            {path: "/contact", element: <Contact/>},
            {path: "/signup", element: <Signup/>},
            {path: "/signin", element: <Signin/>},
            {path: "/cliniccontrol", element: <AdminSignup/>},
            {path: "/dashboard", element: <PatientDashboard/>},
            {path: "/Doctor_dashboard", element: <DoctorDashboard/>},
            {path: "/admins_dashboard", element: <AdminDashboard/>},

        ]
    }
])

export default routes;