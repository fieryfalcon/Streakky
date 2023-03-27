import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Loading from "./Pages/Loading";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;