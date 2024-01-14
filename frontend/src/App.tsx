import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import LoginPage from "./pages/LoginPage";

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
