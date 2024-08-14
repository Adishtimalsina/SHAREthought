import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>

      <ul className="menu">
        <li className="menu__item">
          <Link className="menu__link" to="/posts">
            Home
          </Link>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            About
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Services
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="#">
            Team
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="/contact">
            Contact us
          </a>
        </li>
      </ul>
      <p>&copy;2024 SHAREthought | All Rights Reserved</p>
    </footer>
  );
};
export default Footer;
