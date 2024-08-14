import style from "./PageNotFound.module.css";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  document.addEventListener("DOMContentLoaded", function () {
    var body = document.notfound;
    setInterval(createStar, 100);
    function createStar() {
      var right = Math.random() * 500;
      var top = Math.random() * screen.height;
      var star = document.createElement("div");
      star.classList.add("star");
      body.appendChild(star);
      setInterval(runStar, 10);
      star.style.top = top + "px";
      function runStar() {
        if (right >= screen.width) {
          star.remove();
        }
        right += 3;
        star.style.right = right + "px";
      }
    }
  });

  return (
    <div className={style.notfound}>
      <div className={style.text}>
        <div>ERROR</div>
        <h1>404</h1>
        <hr />
        <div>Page Not Found</div>
        <Link to="/posts">Go To Home</Link>
      </div>

      <div className={style.astronaut}>
        <img
          src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
          alt=""
          className={style.src}
        />
      </div>
    </div>
  );
};

export default PageNotFound;
