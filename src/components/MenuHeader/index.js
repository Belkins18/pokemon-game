import React, { useState } from "react";

// Components
import Menu from "./Menu"
import NavBar from "./NavBar"

const MenuHeader = ({bgActive, onClickLink}) => {
    const [isOpen, setOpen] = useState(null);
    console.log(onClickLink);
    const handleClickHumburger = () => {
        setOpen(prevState => !prevState);
    }

    return (
        <React.Fragment>
            <Menu isOpen={isOpen}/>
            <NavBar isOpen={isOpen} bgActive={bgActive} onClickHumburger={handleClickHumburger}/>
        </React.Fragment>
    )
}

export default MenuHeader;