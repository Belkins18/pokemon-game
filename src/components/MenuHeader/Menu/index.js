import cn from "classnames";
import s from "./style.module.css";
import menuList from "./menu.json";
import { Link } from "react-router-dom";

const Menu = ({ isOpen, onChangeParentState}) => {

  const handleClikToLink = () => {
    onChangeParentState && onChangeParentState(!isOpen);
  }

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
            menuList.map(({href, title}, index) => {
              return (
                <li key={index}>
                  <Link to={href} onClick={handleClikToLink}>{title}</Link>
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
