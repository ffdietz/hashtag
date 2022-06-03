import React, { useEffect, useState }  from 'react'
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Project    from './Project';
import Collective from './Collective'
import Contact    from './Contact'
import Home       from './Home'

export default function Main({ setActiveChart }){

  return (
    <MainContainer>
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition
            key={ location.key }
            timeout={ 1000 }
            classNames="fade"
          >
            <Switch location = { location } >
              <Route exact path = '/'           component = { Home }/>
              <Route exact path = '/hashtag'    component = { Project } />
              <Route exact path = '/collective' component = { Collective } />
              <Route exact path = '/contact'    component = { Contact } />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </MainContainer>
  )
}

const MainContainer = styled.div `
    width: 100vw;
    height: 100vh;
    top: var(--navbar-height);
    background: transparent;
    left: 0;
    right: 0;
    overflow-y: hidden;
    
    z-index: 1;

    .fade-appear,
    .fade-enter {
        opacity: 0;
        z-index: 1;
    }
    .fade-appear-active,
    .fade-enter.fade-enter-active {
        opacity: 1;
        z-index: -1;
        transition: opacity 600ms linear 500ms;
    }
    .fade-exit {
        opacity: 1;
        z-index: -1;
    }
    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: opacity 400ms linear;
    }
`