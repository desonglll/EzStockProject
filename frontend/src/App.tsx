import "bootstrap/dist/css/bootstrap.css";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
function App() {
  return (
    <>
      <Router>
        {/* Control our web using Router */}
        <header>
          <nav>
            <Link to={"/"}>Home</Link>
          </nav>
        </header>
        <Routes>
          {/* <Route path="/" element={App()} /> */}
          <Route path="/" element={MainPage()} />
          <Route path="/login" element={LoginPage()} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
