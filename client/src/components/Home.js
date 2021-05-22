import React, { Component } from 'react';
import styled from "styled-components";

export class Home extends Component {
    render() {
        return (
            <HomeContainer >
                <div>
                <Title>#GLACIARGREY</Title>
                <h2>¿pueden nuestros recuerdos fotográficos aportar al conocimiento y comportamiento de masas de hielo milenario?</h2>
                </div>
            </HomeContainer>
        )
    }
}

export default Home

const HomeContainer = styled.div `
    width: 100vw;
    height: 100vh;
    display: grid;
    align-items: center;
    justify-content: center;
    color: var(--font-color);
    background: transparent;
`;

const Title = styled.h1 `
    font-size: 8rem;
    color: var(--font-color);
    margin: 0;
    padding: 0;
`