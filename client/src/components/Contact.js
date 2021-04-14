import React, { Component } from 'react'
import styled from 'styled-components'

export class Contact extends Component {
    render() {
        return (
            <ContactContainer className="contact">
                <ContactWrapper>
                    <h3>Contact</h3>

                    <InfoWrapper>
                        {/* <InfoTitle>Dirección</InfoTitle> */}
                        <InfoIcon className='fas fa-map-marker-alt'/>
                        <InfoText></InfoText>
                    </InfoWrapper>

                    <InfoWrapper>
                        {/* <InfoTitle>Telefono</InfoTitle> */}
                        <InfoIcon className='fas fa-phone-alt'/>
                        <InfoText>123456789</InfoText>
                    </InfoWrapper>

                    <InfoWrapper>
                        {/* <InfoTitle>Email</InfoTitle> */}
                        <InfoIcon className='fas fa-envelope'/>
                        <InfoText>ultimaesperanza@gmail.com</InfoText>
                    </InfoWrapper>

            {/* <div className="contact-form">
                <h3>Contact Form</h3>
            </div> */}


            {/* PAGINA OFICIAL */}

            {/* FORMULARIO CONTACTO */}
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
    font-size:1.7rem;
    display: flex;
    align-items: center;
    justify-content: center;

    /* border: 1px solid white; */

    /*
    border-radius: 10px;
    padding:auto; */
`

const ContactWrapper = styled.div `
    width: 65vh;
    height: 50vh;
    margin-top: 10vh;
    padding: 10px;

    /* border: 1px solid green; */
    border-radius: 20px;
    background: rgba(255,255,255,0.1);
`

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

`

const InfoTitle = styled.h5`

`

const InfoIcon = styled.i`

`

const InfoText = styled.p `
    margin-left: 15px;
`

