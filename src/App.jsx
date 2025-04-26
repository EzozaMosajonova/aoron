import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from './components/layout';
import Login from './pages/Login';

function App() {
  const token = localStorage.getItem('accesstoken');
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])
  return token ? <Layout><Outlet /></Layout>:<Login/>
}

export default App;
