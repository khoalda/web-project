import './App.css';
import './Login.css';
import About from './components/About';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import News from './components/News';
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
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
