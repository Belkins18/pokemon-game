import cn from "classnames";
import s from "./style.module.css";

const NavBar = ({navState, onChangeMenuOpen }) => {
  console.log('navState: ', navState);

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a
          className={cn(s.menuButton, {
            [s[`${navState.className}`]]: navState.status,
          })}
          onClick={onChangeMenuOpen}
        >
          <span />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
