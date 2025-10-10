// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/OrderList";
import OrderListQuery from "./pages/OrderListQuery";
import Cart from "./pages/Cart";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/query" element={<OrderListQuery />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
