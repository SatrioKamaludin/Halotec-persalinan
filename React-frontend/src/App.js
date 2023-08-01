import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Correct the import statement
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import APITest from './Components/APITest';
import IbuDataList from './Components/IbuDatalist'; // Import the IbuDataList component
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/bayi-data-list" element={<APITest />} />
          <Route path="/ibu-data-list" element={<IbuDataList />} /> {/* Add a new route to the IbuDataList component */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
