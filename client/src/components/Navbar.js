import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const NavBar = () => {
    const [isActive, setActive] = useState(false);

    return (

        <NavBarContainer>
            <NavWrapper>
                <NavLogo to="/"> Colectivo<br/>UltimaEsperanza </NavLogo>

                <NavMenu className={ isActive ? 'nav-menu active' : 'nav-menu close' }>
                    <li> <NavLinkItem exact path to="/" > home </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/hashtag" > hashtag </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/collective" > colectivo </NavLinkItem> </li>
                    <li> <NavLinkItem exact path to="/contact" > contact </NavLinkItem> </li>
                </NavMenu>

                <NavIcon className={ isActive ? 'fas fa-times' : 'fas fa-bars active'}
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
    margin-top: 3vh;
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

    &.close{
    overflow: hidden;
    background: transparent;
    opacity: 0;
    top: -100%;    
    transition: all 5s opacity 10s;
    }

    &.active{
    list-style: none;
    display: flex;
    align-items: center;
    margin-left: auto;
    opacity: 1;
    transition: all 5s opacity 10s;
    top: 0;
    }

`

const NavLinkItem = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.1rem;
    color: var(--text);

    margin: 0 30px;
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
    font-size: 1.5rem;
    cursor: pointer;
    transition: opacity 1s linear;
    opacity: 0.3;

    &.active{
        transition: opacity 1s;
        opacity: 1;
    }
`