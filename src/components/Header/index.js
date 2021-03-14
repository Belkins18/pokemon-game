import s from "./style.module.css"

const Header = ({
    title="React Hacathon", 
    desk="Pokemon game!"
}) => {
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{desk}</p>
      </div>
    </header>
  );
};

export default Header;