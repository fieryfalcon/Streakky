import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./Pages/Loading";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;