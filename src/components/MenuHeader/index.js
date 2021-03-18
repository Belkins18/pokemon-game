import React, { useState } from "react";

// Components
import Menu from "./Menu";
import NavBar from "./NavBar";

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  
  const handleClickHumburger = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Menu isOpen={isOpen}  onChangeParentState={handleClickHumburger} />
      <NavBar
        isOpen={isOpen}
        bgActive={bgActive}
        onClickHumburger={handleClickHumburger}
      />
    </React.Fragment>
  );
};

export default MenuHeader;
