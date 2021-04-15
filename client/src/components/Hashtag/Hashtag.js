import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import HashtagChart from './HashtagChart'

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
            <>
                {
                    this.state.init ?
                    <HashtagChart data={ this.state.gallery } />
                    :
                    <div>loading...</div>
                }
            </>
        )
    }
}

export default Hashtag



