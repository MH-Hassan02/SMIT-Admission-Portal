import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminSignup from "./Pages/AdminSignup";
import AdminLogin from "./Pages/AdminLogin";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminDashboard />} />
        <Route exact path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
