import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminPage.jsx';
import HomePage from './pages/homePage.jsx';
import TestPage from './pages/test.jsx';
import LoginPage from './pages/loginPage.jsx';
import { Toaster } from 'react-hot-toast'; 

function App() {
  return (
    <BrowserRouter>
      <div className='w-full h-[100vh] bg-red-600'>
        <Toaster position='top-right' />
        <Routes path='/'>
          
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<h1>Register page</h1>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage/>} />
          <Route path='/*' element={<HomePage/>} />
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;