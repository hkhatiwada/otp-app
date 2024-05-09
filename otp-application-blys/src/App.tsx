import { Route, Routes } from "react-router-dom";
import SuccessPage from "./pages/Success/Success";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
