import cn from "classnames";
import s from "./style.module.css";

const NavBar = ({isOpen, bgActive = false, onClickHumburger }) => {
  return (
    <nav className={cn(s.root, {
      [s.bgActive] : bgActive
    })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div
          className={cn(s.menuButton, {
            [s.isActive]: isOpen,
          })}
          onClick={onClickHumburger}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
