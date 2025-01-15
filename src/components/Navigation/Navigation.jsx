import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import logo from "../../assets/tmbd.icon.png";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <section className={s.head}>
      <img src={logo} alt="TMDB Logo" className={s.logo} width={80} />
      <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </section>
  );
};

export default Navigation;
