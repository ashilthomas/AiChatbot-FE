import React from 'react';
import Home from './Pages/Home/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Credit from './Pages/Home/Credit';


function App(): JSX.Element {
  return (
    //creat a router
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;