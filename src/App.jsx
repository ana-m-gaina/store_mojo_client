import React from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Cart } from "./pages/Cart";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
import { Home } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Orders } from "./pages/Orders";
import { ProductDetail } from "./pages/ProductDetail";
import { Profile } from "./pages/Profile";
import { SearchPage } from "./pages/SearchPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { CheckoutFailed } from "./pages/CheckoutFailed";


function App() {
  const user = useSelector(state => state.user.currentUser);

  return (
    <Router
      sx={{
        backgroundColor: theme =>
          theme.palette.mode === "light"
            ? theme.palette.common.white
            : theme.palette.grey[800],
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <div id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signin" element={user ? <Home /> : <SignIn />} />
            <Route path="signup" element={user ? <Home /> : <SignUp />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout-success" element={<CheckoutSuccess />} />
            <Route path="checkout-failed" element={<CheckoutFailed />} />
            <Route path="account/:id" element={<Profile />} />
            <Route path="orders/:id" element={<Orders />} />
            <Route path="products/*" element={<SearchPage />} />
            <Route path="products/find/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
