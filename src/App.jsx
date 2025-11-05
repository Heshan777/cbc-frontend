import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';
import { Toaster } from 'react-hot-toast'; 
import RegisterPage from "./pages/registerPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className='w-full h-[100vh] bg-red-600'>
        <Toaster position='top-right' />
        <Routes path='/'>
          
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage/>} />
          <Route path='/*' element={<HomePage/>} />
      
        </Routes>
      </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App; 