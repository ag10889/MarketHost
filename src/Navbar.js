import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return(
        <>
        <Nav>
            <NavMenu>
                <NavLink to='/Mainpage' activeStyle>
                    Home Page

                </NavLink>
                <NavLink to='/Sell' activeStyle>
                    Sell a Listing
                    </NavLink>

                <NavLink to='/CurrentListings' activeStyle>
                    Current Listings 

                </NavLink>
            </NavMenu>
        </Nav>
        </>
    );
}
export default Navbar;