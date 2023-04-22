import './App.css';
import './Login.css';
import About from './pages/About';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import News from './pages/News';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";



function App() {
  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={< Home />}></Route>
            <Route path='/about' element={< About />}></Route>
            <Route path='/news' element={< News />}></Route>
            <Route path='/login' element={< Login />}></Route>
            <Route path='/register' element={< Register />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
