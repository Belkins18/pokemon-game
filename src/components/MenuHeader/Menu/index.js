import { useState } from "react";
import cn from 'classnames';
import s from "./style.module.css";

const Menu = () => {
    const [isActive, setActive] = useState(false);

    const handleMenu = (e) => {
        console.log("handleMenu" + e);
        setActive(!isActive);
    }
  return (
    <div className={cn(s.menuContainer, {[isActive]: isActive})} onClick={handleMenu}>
      <div className={s.overlay}/>
      <div className={"menuItems"}>
        <ul>
          <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
