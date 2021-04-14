import React, { Component } from 'react';
import styled from 'styled-components'
// import { Switch } from "react-router-dom";
import axios from 'axios';
import ImgChart from './ImgChart'

// Different draw schemas
// D3 merged to React   http://t.ly/HOvE http://t.ly/b3w5
// SVG canvas

export class Hashtag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            quantity: 600,
            init: 0,
        }
    }

    async componentDidMount(){
        const response = await axios.get(`http://localhost:5500/api/${this.state.quantity}`)
        .then(response => { return response })
        .catch(error => console.log(error));
        this.setState({ 
            gallery: response.data.resources,
            init:1
        }) 
    }

    render(){
        return (
            <HashtagContainer>
                {
                    this.state.init ?
                    <ImgChart data={ this.state.gallery } size={20}/>
                    :
                    <div>loading...</div>
                }
            </HashtagContainer>
        )
    }
}

export default Hashtag

const HashtagContainer = styled.div `
    color: var(--font-color);
    height: 100vh;
    left: 10vw;
`