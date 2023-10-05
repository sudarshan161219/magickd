import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/export"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Heloo world</h1>} />

      </Routes>
    </div>
  )
}

export default App