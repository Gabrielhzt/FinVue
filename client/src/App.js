import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
