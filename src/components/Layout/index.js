import cn from "classnames";
import s from "./style.module.css"

const Layout = ({
    title,
    desc,
    colorBg,
    urlBg, children
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
          <div className={cn(s.full, {[s.desc]: desc})}>
            {desc ? `${desc}` : ""}
          </div>
        </article>
        {children}
      </div>
    </section>
  );
};

export default Layout;
