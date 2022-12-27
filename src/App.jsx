import { BrowserRouter, Route, Routes } from "react-router-dom";
import Appointment from "./routes/Appointment";
import Scheduler from "./routes/Scheduler";

import Navbar from "./components/Navbar";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/agenda" element={<Scheduler />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
