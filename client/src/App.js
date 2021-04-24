import { BrowserRouter as Router } from "react-router-dom";

import Navbar from './components/Navbar'
import Main   from './components/Main';
import Footer from './components/Footer.js';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main />
        {/* <Footer /> */}
      </Router>
    </div>
  );
}


