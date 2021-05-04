import { BrowserRouter as Router } from "react-router-dom";

import Navbar from './components/Navbar'
import Main   from './components/Main';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main />
      </Router>
    </div>
  );
}


