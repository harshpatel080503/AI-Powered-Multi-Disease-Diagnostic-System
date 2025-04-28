import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Diabetes from './pages/Diabetes';
import Heart from './pages/Heart';
import Parkinson from './pages/Parkinson';
import BreastCancer from './pages/BreastCancer';
import Tuberculosis from './pages/Tuberculosis';
import BrainTumor from './pages/BrainTumor';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diabetes" element={<Diabetes />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/parkinson" element={<Parkinson />} />
          <Route path="/breast-cancer" element={<BreastCancer />} />
          <Route path="/tuberculosis" element={<Tuberculosis />} />
          <Route path="/brain-tumor" element={<BrainTumor />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;