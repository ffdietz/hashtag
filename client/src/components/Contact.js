import React, { Component } from 'react'
import styled from 'styled-components'

export class Contact extends Component {
    render() {
        return (
            <ContactContainer className="contact">
                <ContactWrapper>
                    {/* <InfoWrapper> */}
                        <ContactLink href="https://ultimaesperanza.org/"> 
                                    <i className="fas fa-globe"/> 
                                </ContactLink>
                        <ContactLink href="https://www.facebook.com/colectivoultimaesperanza/"> 
                                <i className="fab fa-facebook-square"/> 
                            </ContactLink>
                        <ContactLink href="https://www.instagram.com/colectivoultimaesperanza/"> 
                                <i className="fab fa-instagram"/> 
                            </ContactLink>
                    {/* </InfoWrapper> */}
                </ContactWrapper>
            </ContactContainer>
        )
    }
}

export default Contact


const ContactContainer = styled.div `
    color: var(--font-color);
    width: 100vw;
    height: 100vh;
    font-size:1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContactWrapper = styled.div `
    width: 65vh;
    height: 50vh;
    margin-top: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const ContactLink = styled.a `
    color:grey;
    text-decoration: none;

    :hover{
    color:black;
    }

    i{
        color: grey;
        font-size: 80px;
        margin: 10px;
    }
`