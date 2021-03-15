import React, { useState } from "react";

// Components
import Menu from "./Menu"
import NavBar from "./NavBar"

const MenuHeader = () => {
    const [isNavBarActive, setActive] = useState({
        className: 'isActive',
        status: false
    });

    const handleMenuOpen = () => {
        setActive({
            ...isNavBarActive,
            status: !isNavBarActive.status
        });
    }

    return (
        <React.Fragment>
            <Menu navState={isNavBarActive} onChangeMenuOpen={handleMenuOpen}/>
            <NavBar navState={isNavBarActive} onChangeMenuOpen={handleMenuOpen}/>
        </React.Fragment>
    )
}

export default MenuHeader;