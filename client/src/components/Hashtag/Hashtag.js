import React, { Component } from 'react';
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
            quantity: 10,
            init: 0,
        }
    }

    // async componentDidMount(){
    //     const response = await axios.get(`http://localhost:5500/hashtag/${this.state.quantity}`)
    //     .then(response => { return response })
    //     .catch(error => console.log(error));
    //     this.setState({ 
    //         gallery: response.data.resources,
    //         init:1
    //     }) 
    // }

    async componentDidMount(){
        const response = await axios.get(`http://localhost:5500/hashtag`)
        .then(response => { return response })
        .catch(error => console.log(error));
        this.setState({ 
            gallery: response.data,
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



