import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import CardPage from './Pages/CardPage';
import HomePage from './Pages/HomePage';
import LogInPage from './Pages/LogInPage'
import RegisterPage from './Pages/RegisterPage'
import ProductInfoPage from './Pages/ProductInfoPage';
import './StyleSheet/Layout.css'
import './StyleSheet/HomePage.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LogInPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/card' element={<CardPage />} />
      <Route path='/product' element={<ProductInfoPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
