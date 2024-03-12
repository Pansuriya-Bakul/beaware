import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Forgotpassword from "./components/forgotpassword";
import Passwordreset from "./components/passwordreset";


function App() {
  if (window.location.pathname === '/') {
    window.location.pathname = '/login';
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/passwordreset" element={<Passwordreset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
