import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    const [isActive, setActive] = useState(false);

    return (

        <NavBarContainer>
            <NavWrapper>
                <NavLogo to="/"> Colectivo<br/>UltimaEsperanza </NavLogo>

                <NavMenu className={ isActive ? 'nav-menu close' : 'nav-menu' }>
                    <li> <NavLinkItem exact path to="/" > home </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/hashtag" > hashtag </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/collective" > colectivo </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/contact" > contact </NavLinkItem> </li>
                </NavMenu>

                <NavIcon className={ isActive ? 'fas fa-bars active' : 'fas fa-times'}
                    onClick={ ()=> { setActive( !isActive ) } }
                />
            </NavWrapper>

        </NavBarContainer>
    )
}

export default NavBar;

const NavBarContainer = styled.nav `
    width: 100vw;
    height: var(--navbar-height);
    position: fixed;

    color: var(--font-color);
    background: transparent;

    display: flex;
    align-items: center;
    justify-content:center;
`

const NavWrapper = styled.div`
    width: 93vw;
    height: 6vh;
    margin-top: 2vh;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid white; */
`

const NavLogo = styled(NavLink) `
    color: var(--font-color);
    font-size: 1.5rem;
    text-decoration: none;
    justify-self: flex-start;
    display: flex;
    align-items: center;
    vertical-align: bottom;
`

const NavMenu = styled.ul `
    list-style: none;
    display: flex;
    align-items: center;
    margin-left: auto;
    background: transparent;
    opacity: 1;
    visibility: visible;
    transition: visibility 0s linear 0s, opacity 1s;

    &.close{
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s linear 300ms, opacity 1s;
        /* overflow: hidden; */
    }

`

const NavLinkItem = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.1rem;
    color: var(--text);

    margin-right: 20px;
    padding-bottom: 1.2vh;
    transition: border 0.3s;

    &:hover{
        border-bottom: 4px solid white;
    }

    &.active{
        border-bottom: 4px solid white;
    }
`

const NavIcon = styled.i`
    width: 0px;
    font-size: 1.5rem;
    cursor: pointer;
    transition: opacity 1s linear;
    opacity: 0.5;

    &.active{
        transition: opacity 1s;
        opacity: 0.3;
    }
`