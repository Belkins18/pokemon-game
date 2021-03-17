import cn from "classnames";
import s from "./style.module.css";

import menuList from "./menu.json";

const Menu = ({ isOpen }) => {
  return (
    <div
      className={cn(s.menuContainer, {
        [s.active]: isOpen === true,
        [s.deactive]: isOpen === false,
      })}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {
            menuList.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.href}>{item.title}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default Menu;
