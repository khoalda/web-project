import "./App.css";
import "./Login.css";
import About from "./pages/About";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import News1 from "./pages/news/News1";
import News2 from "./pages/news/News2";
import News3 from "./pages/news/News3";
import News4 from "./pages/news/News4";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/news/news1" element={<News1 />}></Route>
          <Route path="/news/news2" element={<News2 />}></Route>
          <Route path="/news/news3" element={<News3 />}></Route>
          <Route path="/news/news4" element={<News4 />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
