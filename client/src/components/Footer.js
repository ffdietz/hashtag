import React from "react";
import styled from 'styled-components'


export default function Footer() {
    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterRow>
                    <FooterColumn>
                        <h2>Colectivo<br/>UltimaEsperanza</h2>
                    </FooterColumn>
                    
                    {/* <FooterColumn>
                        <FooterMenu>
                            <li> <FooterLink to="/" >        home    </FooterLink></li>
                            <li> <FooterLink to="/hashtag" > hashtag </FooterLink></li>
                            <li> <FooterLink to="/collective" >   about   </FooterLink></li>
                        </FooterMenu>
                    </FooterColumn> */}
                    
                    <FooterColumn>
                        <FooterMenu>
                            <li> <FooterLink href="https://ultimaesperanza.org/"> 
                                    <i className="fas fa-globe"/> 
                                </FooterLink>
                            </li>
                            <li> <FooterLink href="https://www.facebook.com/colectivoultimaesperanza/"> 
                                    <i className="fab fa-facebook-square"/> 
                                </FooterLink>
                            </li>
                            <li> <FooterLink href="https://www.instagram.com/colectivoultimaesperanza/"> 
                                    <i className="fab fa-instagram"/> 
                                </FooterLink>
                            </li>
                        </FooterMenu>
                    </FooterColumn>
                </FooterRow>
                <hr />
                <FooterRow>
                    <p className="col-sm">
                        <b> 2021 </b>
                    </p>
                </FooterRow>
            </FooterWrapper>

            {/* <Logo className="fondart-logo">
                <img src="https://www.ivicon.net/imagenesweb/fondart-logo.png&" alt="fondart-logo" />
            </Logo> */}
        </FooterContainer>
    );
}


const FooterContainer = styled.footer `
    width: 100%;
    background-color: white;

    height: 20vh;
    bottom: 0;
    
    display: flex;
    margin-top: 0;
    margin-bottom: 0;
`

const FooterWrapper = styled.div `
    width: 95vw;
`

const FooterRow = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around;
    <margin-bottom></margin-bottom>: 0;
`

const FooterColumn = styled.div `

`

const FooterMenu = styled.ul `
    list-style-type: none;
    font-size: 1rem;
    margin: 0;
    padding: 0;
    display: flex;
    flex-flow: row;

    li {
    flex:auto;
    margin: 8px;
    }
`

const FooterLink = styled.a `
    color:grey;
    text-decoration: none;

    :hover{
    color:black;
    }

    i{
        color: black;
        font-size: 30px;
        margin: 10px;
    }
`


// const Logo = styled.div `
//     width: 10vw;
//     height: auto;
//     display: flex;
//     margin: auto;
//     justify-content: center;

//     img {
//         width: 110px;
//         height: 110px;
//         border: 1px solid;
//     }
// `
