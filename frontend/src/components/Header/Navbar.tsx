import { NavLink } from "react-router-dom";
import logo from "../../assets/logo2.png";
import useAuth from "../../hooks/useAuth";
interface Props {
  role?: string;
}
const Navbar = ({ role }: Props) => {
  const { loggedIn, setLoggedIn } = useAuth();

  const handleAuthBtnClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/ip2_project/aastu_clinic/backend/API/logout.php",
        { method: "GET", credentials: "include" }
      );
      const data = await response.json();
      if (data.success) {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <header className="flex items-center font-sans justify-between md:w-screen md:pr-25 py-1 h-16">
      {/* logo */}
      <div className="w-[80px] ml-4 flex items-center h-full">
        <img src={logo} className="w-max" alt="AASTU logo" />
      </div>
      {/*navbar*/}
      <nav className="flex items-center h-full">
        <ul className="flex items-center flex-wrap *:opacity-80 *:duration-200 md:gap-x-2 xl:gap-x-8 [&_a.active]:opacity-100">
          <NavLink
            className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
            to={"/"}
          >
            Home
          </NavLink>
          {role == "doctor" && (
            <NavLink
              className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
              to={"/Doctor_dashboard"}
            >
              Dashboard
            </NavLink>
          )}
          {role == "Patient" && (
            <NavLink
              className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
          )}
          {role == "" && (
            <>
              <NavLink
                className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
                to={"/#services"}
              >
                Services
              </NavLink>
              <NavLink
                className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
                to={"/#about"}
              >
                About us
              </NavLink>
            </>
          )}

          <NavLink
            className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
            to={"/contact"}
          >
            Contact us
          </NavLink>
          {!loggedIn ? (
            <NavLink
              className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
              to={"/signin"}
            >
              Sign in
            </NavLink>
          ) : (
            <NavLink
              className="cursor-pointer text-[1.1rem] hover:text-blue-500 text-black hover:opacity-100"
              to={"/"}
            >
              <button onClick={handleAuthBtnClick}>Logout</button>
            </NavLink>
          )}
          {!loggedIn && (
            <NavLink
              className="cursor-pointer text-[1.1rem] py-0 md:ml-5 text-black hover:opacity-100"
              to={"/signup"}
            >
              <button className="border-none text-white hover:shadow-xl hover:scale-[1.1] bg-blue-700 py-2 px-3 rounded-2xl">
                Sign up
              </button>
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
