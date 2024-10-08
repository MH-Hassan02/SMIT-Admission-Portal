import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Form from "./Pages/Form";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/register" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
