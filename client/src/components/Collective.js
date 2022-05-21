import React from 'react'
import styled from 'styled-components'

export default function Collective () {
    return (
      <AboutContainer>
        <BiographyText>
            `Ultimaesperanza es un colectivo artístico 
            dirigido por Sandra Ulloa y Nataniel Alvarez 
            que nace en  2004 interesado en explorar a través 
            de distintos lenguajes artísticos y  medios tecnológicos 
            (análogos y digitales), las particularidades 
            de la ruralidad magallánica; del territorio 
            sub-antártico y su relación con la memoria colectiva, 
            historia e identidad local. 
            <br/>
            <br/>
            El colectivo toma su nombre como un gesto de 
            resistencia en alusión a la toponimia del lugar, 
            intentando rescatar las denominaciones 
            de localidades como  Bahía Inútil, Ultima 
            Esperanza, Bahía de la Desolación, Bahía 
            Decepción, etc. que han condicionado la 
            manera en que se observa el territorio que 
            los rodea para ofrecer un cambio de signo a 
            partir de proyectos artísticos interdisciplinarios.`
        </BiographyText>
      </AboutContainer>
    )
}

const AboutContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5vh;
    color: var(--font-color);
`
const BiographyText = styled.p `
    width: clamp(400px, 50vh, 900px);
    height: clamp(400px, 50vh, 700px);
    text-align: justify;
    
    font-size: clamp(10px, 1.6rem, 20px);
    line-height: clamp(11px, 1.8rem, 22px);
    color: var(--font-color);
`
