import './global.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Signup } from './pages/Signup';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <Toaster position="top-right" toastOptions={{ duration: 2000, }}/>

    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/login' element={<Login/>}/>

          <Route path='/signup' element={<Signup />} />

          <Route path='' element={<PrivateRoutes/>}>
          </Route>            

        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
  </React.Fragment>
);
