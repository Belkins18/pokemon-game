import React from "react";

// Components
import Menu from "./Menu"
import NavBar from "./NavBar"

const MenuHeader = () => {
    return (
        <React.Fragment>
            <Menu/>
            <NavBar/>
        </React.Fragment>
    )
}

export default MenuHeader;