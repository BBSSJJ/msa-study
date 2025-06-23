// src/components/Navigation.jsx
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? { borderBottom: "2px solid #fff", fontWeight: "bold" }
      : {};

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        backgroundColor: "#1f1f1f",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* 왼쪽 탭 */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <NavTab to="/" label="🏠 홈" isActive={isActive} />
        <NavTab to="/products" label="상품 목록" isActive={isActive} />
        <NavTab to="/orders" label="주문 목록" isActive={isActive} />
      </div>

      {/* 오른쪽 */}
      <NavTab to="/cart" label="🛒 장바구니" isActive={isActive} />
    </nav>
  );
}

function NavTab({ to, label, isActive }) {
  return (
    <Link
      to={to}
      style={{
        padding: "1rem 1.5rem",
        minWidth: "110px",
        textAlign: "center",
        textDecoration: "none",
        color: "#eee",
        ...isActive(to),
      }}
    >
      {label}
    </Link>
  );
}

export default Navigation;
