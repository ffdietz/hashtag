import React, { Component } from 'react'
import styled from 'styled-components'

export class Collective extends Component {

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

export default Collective

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
    margin-top: -5vh;
    padding: 0;
    text-align: justify;
    
    font-size: 1.4rem;
    line-height: 1.6rem;

    color: var(--font-color);

`
const Biography = 
    `Ultimaesperanza es un colectivo artístico dirigido por Sandra Ulloa y Nataniel Alvarez que nace en  2004 interesado en explorar a través de distintos lenguajes artísticos y  medios tecnológicos (análogos y digitales), las particularidades de la ruralidad magallánica; del territorio sub-antártico y su relación con la memoria colectiva, historia e identidad local. 

    El colectivo toma su nombre como un gesto de resistencia en alusión a la toponimia del lugar, intentando rescatar las denominaciones  de localidades como  Bahía Inútil, Ultima Esperanza, Bahía de la Desolación, Bahía Decepción, etc. que han condicionado la manera en que se observa el territorio que los rodea para ofrecer un cambio de signo a partir de proyectos artísticos interdisciplinarios.`