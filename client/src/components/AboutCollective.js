import React, { Component } from 'react'
import styled from 'styled-components'

export class AboutCollective extends Component {

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
                <Title>
                    <h2>About Collective</h2>
                    <p>By Valentina Montero</p>
                </Title>
                <BiographyText>
                    {this.paragraph(Biography)}
                </BiographyText>
            </AboutContainer>
        )
    }
}

export default AboutCollective

const AboutContainer = styled.div`
    width: 100vw;  
    height: 100vh; 
    padding: 2vw; 
    display: flex;
    font-size:1.4rem;

    align-items: center;
    justify-content: space-between;
    
    color: var(--font-color);
`

const Title = styled.div `
    margin: 0 4rem;
    position: absolute;
    
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    
    h1, p{
        color: var(--font-color);
    }
`

const BiographyText = styled.p `
    height: 70vh;
    overflow: auto;
    text-align: justify;
    line-height: 1.3;

    color: var(--font-color);
    
    width:55%;
    padding: 0 3rem;
    margin: 0 auto;
`
const Biography = 
    `UltimaEsperanza es un colectivo artístico dirigido por Sandra Ulloa y Nataniel Alvarez que nace en  2004 interesado en explorar a través de distintos lenguajes artísticos y  medios tecnológicos (análogos y digitales), las particularidades de la ruralidad magallánica; del territorio sub-antártico y su relación con la memoria colectiva, historia e identidad local. El colectivo toma su nombre como un gesto de resistencia en alusión a la toponimia del lugar, intentando rescatar las denominaciones  de localidades como  Bahía Inútil, Ultima Esperanza, Bahía de la Desolación, Bahía Decepción, etc. que han condicionado la manera en que se observa el territorio que los rodea para ofrecer un cambio de signo a partir de proyectos artísticos interdisciplinarios.'\n\n
    Desde el campo artístico probablemente sea la literatura más que cualquier otra disciplina la que ha construido un imaginario para estas australes zonas. Escritores como Francisco Coloane, Rolando Cárdenas, han descrito la inconmensurabilidad de su territorio contribuyendo a mantener su lejanía en el relato de la tragedia o del mito.  Es por ello que al colectivo le interesó generar un relato visual y un acercamiento transdisciplinario en la observación de esta “última frontera”.\n\n
    Sus primeros trabajos consistían en dar visibilidad y ofrecer re-lecturas sobre la vida comunitaria en zonas rurales, rescatando las voces y recuerdos de sus habitantes y el legado indígena silenciado por la historia oficial. En los últimos años su trabajo se basa en expediciones a lugares extremos a los que convocan a artistas, científicos, historiadores. Desde 2011 realizan expediciones a glaciares y ventisqueros, no sólo con la intención de documentar la inmensidad e inédita belleza de estas zonas, sino también para plantear preguntas y reflexiones sobre la dimensión patrimonial, geopolítica, afectiva y estética de estos lugares para la comunidad magallánica y para la historia de la humanidad en general. Los artistas del colectivo, en cada expedición, actualizan la figura de los primeros exploradores naturalistas, combinando de manera poética recursos científicos y tecnológicos para la captura de datos visuales y sonoros,  interviniendo por medio de macro y micro-proyecciones el paisaje, generando un contraste entre los agentes humanos y no humanos del territorio.   Todo esto va construyendo lo  que el colectivo ha denominado un “glaciar virtual” que está  siendo constantemente alimentado por datos estadísticos, definiciones, imágenes,  narrativas etc. el cual se expone y comparte en distintos formatos a través de conciertos, instalaciones, charlas.\n\n
    Estableciendo redes con artistas de otros puntos del país y del extranjero, Ultimaesperanza organiza desde 2013 “Lumen, Encuentro Internacional de arte contemporáneo y nuevos medios”, actividad auto-gestionada que permite descentralizar las prácticas mediales de sus circuitos tradicionales combinando presentaciones y talleres de arte sonoro, performance, mapping, entre otras, permitiendo generar un diálogo con el territorio y la comunidad austral.\n\n
    `