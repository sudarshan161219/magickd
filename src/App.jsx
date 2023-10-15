import { Routes, Route } from "react-router-dom";
import {
  Navbar, Footer, Blog,
  About,
  Contact,
  Portfolio,
  Register
} from "./components/export"
import Main from "./main/Main";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/ContactUs" element={<Contact />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App