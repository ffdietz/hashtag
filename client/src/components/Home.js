import React from 'react';
// import { Link } from 'react-router-dom'
import styled from "styled-components";

export default function Home({ setChart }) {

  return (
    <HomeContainer >
      <Headline>
        <h1>#GLACIARGREY</h1>
        <p>
          ¿pueden nuestros recuerdos fotográficos <br/> 
          aportar al conocimiento y comportamiento de masas de hielo milenario?
        </p>
        <GoToButton onClick={()=> setChart(true)} >ir a la visualización</GoToButton>
      </Headline>
    </HomeContainer>
  )
}

const HomeContainer = styled.div `
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Headline = styled.div`
  padding-top: 5vh;
  color: var(--font-color);
  
  h1{
    font-size: 6rem;
    color: var(--font-color);
    margin: auto;
    padding: 0;
  }
  p{
    font-size: 1.5rem;
  }
`

const GoToButton = styled.button`
  position: absolute;
  background-color: transparent;
  border-radius: 5px;
  color: turquoise;
  text-transform: uppercase;
  padding: 25px 15px;
  text-decoration: none;
  
  :hover{
    background: rgba(0,255,255,0.2);
  }
`