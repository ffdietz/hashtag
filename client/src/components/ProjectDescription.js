import React, { Component } from 'react'
import styled from 'styled-components'

export class AboutProject extends Component {

    paragraph(p) {
        return ( 
            p.split('\n\n').map((paragraph,index) =>
                <p key={index}>
                    {paragraph.split('\n')
                    .reduce((total, line) => [total, <br />, line])}
                </p>
            )
        )
    }

    render() {
        return (
            <AboutContainer>
                <AboutWrapper>
                    <BiographyText>
                        {this.paragraph(Biography)}
                    </BiographyText>
                </AboutWrapper>
            </AboutContainer>
        )
    }
}

export default AboutProject


const AboutContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--font-color);
`

const AboutWrapper = styled.div`
    width: 75vw;
    height: 60vh;

    display:flex;
    flex-direction: row;
    /* align-items: flex-start; */
    align-items: center;
    justify-content: space-around;
    
`

// const Title = styled.h2 `
//     border: 1px solid green;
//     margin: 0;
//     padding: 0;
// `

const BiographyText = styled.p `
    height: 50vh;
    width: 50vh;
    margin: 0;
    margin-top: -12vh;
    padding: 0;
    text-align: justify;
    
    font-size:1.4rem;
    line-height: 1.5;

    color: var(--font-color);

`
const Biography = 
    `¿Puede una obra de artes mediales servir como herramienta científica?, ¿puede un cúmulo de fotografías de carácter turístico entregar información del calentamiento global? ¿pueden nuestros recuerdos fotográficos aportar al conocimiento y comportamiento de masas de hielo milenario?. 
    Con estas preguntas como punto de partida se genera la idea central de este proyecto denominado Hashtag Glaciar Grey, una base de datos que reflexiona sobre el calentamiento global. El presente proyecto toma como fuente o base, la información visual referente a las fotografías que los miles de turistas que transitan por el Parque Nacional Torres del Paine, realizan en torno al glaciar Grey. A través del motor de búsqueda #glaciargrey se construye esta obra que se alimenta de estos datos permitiendo de esta manera poder visualizar el comportamiento del Glaciar a modo de “Proxy” virtual. `