import { TiThMenu } from "react-icons/ti";
import logo from "../store/logo.png";
import { Link } from "react-router-dom";

const Header = ({ showMenu, toogle }) => {
  return (
    <div className="header">
      <div>
        <TiThMenu
          size={40}
          style={{ display: "flex", float: "left", color: "white" }}
          onClick={() => {
            showMenu(toogle);
          }}
        />
      </div>
      <img src={logo} className="logo"></img>
      <div className="text-end">
        <Link
          to="/login"
          type="button"
          className="btn btn-outline-light me-2 btn-lg"
        >
          Login
        </Link>
        <Link to="/signup" type="button" className="btn btn-warning btn-lg">
          Sign-up
        </Link>
      </div>
    </div>
  );
};
export default Header;
