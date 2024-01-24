import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Resepti from "./recipe2.js";
import Home from "./home.js";

function App() {
    return (
      <Router>
        <div>
          <nav>
            <ul className="linkit">
              <li className= "linkki">
                <Link className="linkkii" to="/home">Home</Link>
              </li>
              <li className="linkki">
                <Link className="linkkii" to="/recipe2">Kategoriat</Link>
              </li>
            </ul>
          </nav>
  
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/recipe2" element={<Resepti />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;