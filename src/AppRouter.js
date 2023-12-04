import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MainPage from './App';
import ExtraPage from './Sell';

const AppRouter = () => {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/extra">Extra Page</Link>
            </li>
          </ul>
        </nav>
  
        <Routes>
          <Route path="/extra" element={<ExtraPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;