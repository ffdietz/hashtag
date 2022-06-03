import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar'
import Main   from './components/Main';
import Hashtag    from './components/Hashtag/Hashtag'

export default function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main/>
        <Hashtag/>
      </Router>
    </div>
  );
}
