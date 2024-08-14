import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/components/LandingPage";
import Signup from "./assets/components/Signup";
import Signin from "./assets/components/Signin";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  )
}



export default App
