import "./App.css";
import "./Login.css";
import About from "./pages/About";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import Profile from "./pages/Profile";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import News1 from "./pages/news/News1";
import News2 from "./pages/news/News2";
import News3 from "./pages/news/News3";
import News4 from "./pages/news/News4";
import Detail from "./pages/Detail";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, updateInfo } from "./redux/slices/auth";
import { readMyInfo } from "./api/users";
import { loadCartSuccess } from "./redux/slices/cart";

function App() {
  const user = localStorage.getItem("user");
  const cart = localStorage.getItem("cart");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const userInfo = JSON.parse(user);
      dispatch(loginSuccess(userInfo));
      readMyInfo().then((res) => {
        dispatch(updateInfo(res.data));
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (cart) {
      const cartInfo = JSON.parse(cart);
      dispatch(loadCartSuccess(cartInfo));
    }
  }, [dispatch, cart]);

  const themeOptions = {
    palette: {
      mode: "dark",
      primary: {
        main: "#8e3200",
      },
      secondary: {
        main: "#ffebc1",
      },
      info: {
        main: "#0288d1",
      },
    },
    typography: {
      fontFamily: "Plus Jakarta Sans",
    },
  };

  const theme = createTheme(themeOptions);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <div
              style={{
                flex: 1,
              }}
            >
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/news" element={<News />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/product" element={<Product />}></Route>
                <Route path="/product/:id" element={<Detail />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/news/news1" element={<News1 />}></Route>
                <Route path="/news/news2" element={<News2 />}></Route>
                <Route path="/news/news3" element={<News3 />}></Route>
                <Route path="/news/news4" element={<News4 />}></Route>
                <Route
                  path="/admin/product"
                  element={<ManageProducts />}
                ></Route>
                <Route path="/admin/order" element={<ManageOrders />}></Route>
                <Route path="/admin/user" element={<ManageUsers />}></Route>
              </Routes>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
