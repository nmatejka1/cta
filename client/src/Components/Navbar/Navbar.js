import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'
import logo from './../../Images/logo.jpg'

const Navigation = () => {
    return (
        <Nav>
            <NavLink to = "/">
                <img src = {logo} alt=""/>
            </NavLink>
            <Bars/>
            <NavMenu>
                <NavLink to = "/about" activeStyle>
                    About
                </NavLink>
                <NavLink to = "/services" activeStyle>
                    Services
                </NavLink>
                <NavLink to = "/contact" activeStyle>
                    Contact Us
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to ='/contractor-portal'>
                    Contractor Portal 
                </NavBtnLink>
            </NavBtn>
        </Nav>
    )
}

export default Navigation;