import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './Nav/Nav';
import Dashboard from './Pages/Dashboard/Dashboard';
import Income from './Pages/Income/Income';
import Expenses from './Pages/Expenses/Expenses';
import Members from './Pages/Members/Members';
import Settings from './Pages/Settings/Settings';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Add from './Pages/Add/Add';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Nav />}>
          <Route path='/' element={<Dashboard />} >
            <Route path='/add' element={<Add />} />
          </Route>
          <Route path='/income' element={<Income />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/members' element={<Members />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;