import React, { Component } from 'react';
import styled from "styled-components";

export class Home extends Component {
    render() {
        return (
            <HomeContainer >
                <Title>HASHTAG</Title>
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
`;

const Title = styled.h1 `
    font-size: 5rem;
    color: var(--font-color);
`