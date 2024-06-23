import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Protect from "./Components/Protect";
import Player from "./Pages/Player";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protect>
                <Home />
              </Protect>
            }
          />

          <Route
            path="/player/:id"
            element={
              <Protect>
                <Player />
              </Protect>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
