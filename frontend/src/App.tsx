import "bootstrap/dist/css/bootstrap.css";
import ListPage from "./pages/ListPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="*" Component={MenuBar}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
