import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Dashboard from "./Dashboard";
import app from "./firebase/firebaseconfig";
import Signup from "./Signup";
import Signup_Additional from "./Signup_Additional";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signup_Additional" element={<Signup_Additional />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
