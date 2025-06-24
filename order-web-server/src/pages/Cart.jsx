import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import Layout from "../components/Layout";

function Cart() {
  const { userId } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetchCartItems();
  }, [userId]);

  const handleOrder = async () => {
    if (!userId || items.length === 0) {
      alert("주문할 항목이 없습니다.");
      return;
    }

    const orderPayload = {
      userId: Number(userId),
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const res = await fetch("http://localhost:8091/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        alert("주문이 완료되었습니다!");
        setItems([]); // 장바구니 비우기
      } else {
        alert("주문 실패: " + res.status);
      }
    } catch (e) {
      console.error("주문 요청 실패:", e);
      alert("서버와 통신 중 오류 발생");
    }
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8091/api/carts/users/${userId}`
      );
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error("장바구니 불러오기 실패:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await fetch(
        `http://localhost:8091/api/carts/users/${userId}/cart-items/${itemId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      await fetchCartItems();
    } catch (e) {
      console.error("수량 변경 실패:", e);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await fetch(
        `http://localhost:8091/api/carts/users/${userId}/cart-items/${itemId}`,
        {
          method: "DELETE",
        }
      );
      await fetchCartItems();
    } catch (e) {
      console.error("삭제 실패:", e);
    }
  };

  if (!userId) {
    return (
      <Layout>
        <p style={{ padding: "2rem" }}>userId를 먼저 입력해주세요.</p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <p style={{ padding: "2rem", color: "#aaa" }}>불러오는 중...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>🛒 장바구니</h1>

      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2c2c2c" }}>
              <th style={thStyle}>상품명</th>
              <th style={thStyle}>단가</th>
              <th style={thStyle}>수량</th>
              <th style={thStyle}>소계</th>
              <th style={thStyle}>액션</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const subtotal =
                typeof item.price === "number" &&
                typeof item.quantity === "number"
                  ? item.price * item.quantity
                  : 0;

              return (
                <tr key={item.id} style={{ backgroundColor: "#1e1e1e" }}>
                  <td style={tdStyle}>{item.productName}</td>
                  <td style={tdStyle}>
                    {Number.isFinite(item.price)
                      ? item.price.toLocaleString() + "원"
                      : "가격 없음"}
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      style={selectStyle}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={tdStyle}>{subtotal.toLocaleString()}원</td>
                  <td style={tdStyle}>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(item.id)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {items.length > 0 && (
        <div style={footerStyle}>
          <button style={orderButtonStyle} onClick={handleOrder}>
            🛒 주문하기
          </button>
        </div>
      )}
    </Layout>
  );
}

const thStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #444",
  color: "#ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #333",
};

const selectStyle = {
  padding: "0.3rem",
  fontSize: "1rem",
  backgroundColor: "#2e2e2e",
  color: "#fff",
  border: "1px solid #555",
  borderRadius: "4px",
};

const deleteButtonStyle = {
  padding: "0.4rem 0.8rem",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const footerStyle = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "#1a1a1a",
  padding: "1rem 2rem",
  borderTop: "1px solid #333",
  display: "flex",
  justifyContent: "flex-end",
  zIndex: 10,
};

const orderButtonStyle = {
  padding: "0.8rem 1.5rem",
  backgroundColor: "#4caf50",
  color: "#fff",
  border: "none",
  fontSize: "1.1rem",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Cart;
