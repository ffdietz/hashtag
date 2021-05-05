import React, { Component } from 'react';
import axios from 'axios';
import HashtagChart from './HashtagChart'

export class Hashtag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gallery: [],
            quantity: 1,
            init: 0,
        }
    }

    async componentDidMount(){
        const response = await axios.get(`https://hashtag-ultimaesperanza.herokuapp.com/hashtag/resources`)
        .then(response => { console.log(response); return response })
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
                    <div></div>
                }
            </>
        )
    }
}

export default Hashtag



