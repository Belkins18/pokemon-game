import { useState } from "react";
import cn from 'classnames';
import s from "./style.module.css";

const NavBar = () => {
    const [isActive, setActive] = useState(false);

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a className={cn(s.menuButton, {[isActive]: isActive})}>
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;