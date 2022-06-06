import { BrowserRouter as Router } from "react-router-dom";
import React, { useState }from 'react';

import Navbar from './components/Navbar'
import Main   from './components/Main';
import Hashtag    from './components/Hashtag/Hashtag'

export default function App() {
  const [activeChart, setActiveChart] = useState(false);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main setChart={ isActive => setActiveChart(isActive) } />
        <Hashtag  activeChart={ activeChart }/>
      </Router>
    </div>
  );
}

