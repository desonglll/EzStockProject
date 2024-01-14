import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.31.91:8000";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
