import React, { Component } from 'react'
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ProjectDescription     from './ProjectDescription';
import Collective  from './Collective'
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
                            timeout={ 800 }
                            classNames="fade"
                            >
                            < Switch location={ location } >
                                <Route exact path= '/'  component={ Hashtag } />
                                <Route exact path= '/hashtag'   component={ ProjectDescription } />
                                <Route exact path= '/collective'    component={ Collective } />
                                <Route exact path= '/contact'   component={ Contact } />
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
    overflow: hidden;
`
