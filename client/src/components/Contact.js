import React, { Component } from 'react'
import styled from 'styled-components'

export class Contact extends Component {
    render() {
        return (
            <ContactContainer className="contact">
                <ContactWrapper>
                        <ContactLink href="mailto: ultimaesperanza@gmail.com"
                                        onClick={() => {
                                            navigator.clipboard.writeText("ultimaesperanza@gmail.com")}}
                                    > 
                                    <i className="fas fa-envelope"/> 
                                </ContactLink>
                        <ContactLink href="https://ultimaesperanza.org/"> 
                                    <i className="fas fa-globe"/> 
                                </ContactLink>
                        <ContactLink href="https://www.facebook.com/colectivoultimaesperanza/"> 
                                <i className="fab fa-facebook-square"/> 
                            </ContactLink>
                        <ContactLink href="https://www.instagram.com/colectivoultimaesperanza/"> 
                                <i className="fab fa-instagram"/> 
                            </ContactLink>
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
    color: var(--font-color);
    text-decoration: none;

    i{
        color: grey;
        font-size: 70px;
        margin: 10px;
    }
`