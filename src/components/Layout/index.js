import s from "./style.module.css"

const Layout = ({
    title = "Layout",
    desc = "Layout Desk!",
    colorBg,
    urlBg
}) => {
  const style = {};
  if (urlBg) {style.backgroundImage = `url(${urlBg})`};
  if (colorBg) {style.backgroundColor = colorBg};
  return (
    <section className={s.root} style={style}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={s.desc, s.full}>
            <p>{desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
