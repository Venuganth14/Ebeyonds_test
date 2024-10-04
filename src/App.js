// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsList from './pages/NewsList/NewsList';
import NewsDetail from './pages/NewsDetail/NewsDetail';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
   
        <Navbar />

   
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<NewsList />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/:id" element={<NewsDetail />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
