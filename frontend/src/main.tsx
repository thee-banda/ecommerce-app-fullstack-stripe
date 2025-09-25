import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import { LocaleProvider } from "./context/LocaleContext"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Shop from "./pages/Shop"
import Signup from "./pages/Signup"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="auth/login" element={<Login />} />
            <Route path="auth/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  </React.StrictMode>
)
