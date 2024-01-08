import "bootstrap/dist/css/bootstrap.css";
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MenuBar from "./components/MenuBar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductList from "./components/ProductList.tsx";
function App() {
  return (
    <>
      <Router>
        {/* Control our web using Router */}
        <header>
          <nav>{/* <Link to={"/"}>Home</Link> */}</nav>
        </header>
        <MenuBar />
        <Routes>
          {/* <Route path="/" element={App()} /> */}
          <Route path="/" element={Dashboard()} />
          <Route path="/dashboard" element={Dashboard()} />
          <Route path="/list" element={ProductList()} />
          <Route path="/login" element={LoginPage()} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
