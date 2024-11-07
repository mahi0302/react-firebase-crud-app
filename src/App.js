import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './FirebaseDB/Home';
import Edit from './FirebaseDB/Edit';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:key' element={<Edit />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
