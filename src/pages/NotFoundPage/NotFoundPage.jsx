import s from "./NotFoundPage.module.css";
import { FaRegGrimace } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className={s.not}>
      <FaRegGrimace className={s.icon} />
      <p className={s.text}>Not Found Page</p>
      <div className={s.return}>
        <Link to="/" className={s.link}>
          Home Page
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
