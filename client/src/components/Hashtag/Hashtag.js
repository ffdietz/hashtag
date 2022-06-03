import React, { 
  useState, 
  useEffect 
}from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HashtagChart from './HashtagChart';

export default function Hashtag() {
const [gallery, setGallery] = useState('');
const [loading, setLoading] = useState(true);

useEffect( () => {
  const getGallery = async() => {
    await axios.get(URL_REQUEST)
      .then(res => {
        setGallery(res.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }
  getGallery();
}, [] );

return (
  <VisualizationWrapper>
    { loading && <p>loading</p> }
    { !loading && <HashtagChart data={ gallery } /> }
  </VisualizationWrapper>
  )
}

const VisualizationWrapper = styled.div`
  margin-top: -50%;
  z-index: 1;
  /* z-index: 0; */
  position: static;
`

const URL_REQUEST =
"http://localhost:5500/cloudinary/all-assets";
// "http://localhost:5500/cloud-resources";
// "https://hashtag-ultimaesperanza.herokuapp.com/db-items";