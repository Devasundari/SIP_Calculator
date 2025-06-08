import React from "react";
import { UserProvider, useUser } from "./context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MenuAppBar from "./pages/MenuBar";
import LoginForm from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SIPCalculator from "./pages/SIPCalculator";
import About from "./pages/About";
function App() {
  return (
    <UserProvider>
       
        <MenuAppBar/>
        <Routes>
          {/* <Route path="/" element={<MainApp />} />  */}
          <Route path="/" element={<Home />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/about" element={<About/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

    </UserProvider>
  );
}

function MainApp() {
  const { user } = useUser();
  
  // If user is authenticated, redirect to Dashboard (optional suggestion)
  return user ? <Register /> : <LoginForm />;
}

export default App;
