import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Home     from './Home.js';
import AboutCollective  from './AboutCollective'
import Hashtag  from './Hashtag/Hashtag'
import Contact  from './Contact'
// import AboutProject     from './AboutProject'

export class Main extends Component {
    render() {
        return (
            <MainContainer>
                <Route render={({location}) => ( 
                    <TransitionGroup>
                        <CSSTransition
                            key={ location.key }
                            timeout={ 400 }
                            classNames="fade"
                            >
                            <Switch location={ location }>
                                <Route exact path= '/'          component={ Home } />
                                <Route exact path= '/hashtag'   component={ Hashtag } />
                                <Route exact path= '/about'     component={ AboutCollective } />
                                <Route exact path= '/contact'   component={ Contact } />
                                {/* <Route exact path= '/about-project' component={ AboutProject } /> */}
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
            </MainContainer>
        )
    }
}

export default Main

const MainContainer = styled.div `
    height: 100vh;
    top: var(--navbar-height);
    left: 0;
    right: 0;

    .fade-appear,
    .fade-enter {
        opacity: 0;
        z-index: 1;
    }
    .fade-appear-active,
    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity 600ms linear 150ms;
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: opacity 150ms linear;
    }

`