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
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:5500/hashtag/resources`)
        .then(response => { return response })
=======
        const response = await axios.get(`https://hashtag-ultimaesperanza.herokuapp.com/hashtag/resources`)
        .then(response => { console.log(response); return response })
>>>>>>> e56ff95d0848573609f37998fb1f6743b9baf22c
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



