import "bootstrap/dist/css/bootstrap.css";
import ListPage from "./pages/ListPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import LoginPage from "./pages/LoginPage";
import DisplayPage from "./pages/DisplayPage";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="*" Component={MenuBar}></Route>
          <Route path="/login" Component={LoginPage}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
