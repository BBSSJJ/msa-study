import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import Layout from "../components/Layout";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { userId } = useUser();

  useEffect(() => {
    fetch("http://localhost:8091/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("상품 목록 API 실패:", err);
        setLoading(false);
      });
  }, []);

  const handleAddClick = (productId) => {
    if (!userId) {
      alert("userId를 먼저 입력해주세요!");
      return;
    }
    setSelectedProductId(productId);
    setQuantity(1);
  };

  const handleSubmit = async (productId) => {
    if (!userId || quantity <= 0) {
      alert("userId가 없거나 수량이 잘못되었습니다.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8091/api/carts/users/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      if (res.ok) {
        alert("장바구니에 담았습니다.");
        setSelectedProductId(null);
      } else {
        alert("요청 실패: " + res.status);
      }
    } catch (e) {
      console.error(e);
      alert("서버와 통신 중 오류 발생");
    }
  };

  return (
    <Layout>
      <h1 style={{ color: "#fff", marginBottom: "1.5rem" }}>🛍️ 상품 목록</h1>

      {loading ? (
        <p style={{ color: "#aaa" }}>불러오는 중...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "#eee",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2c2c2c" }}>
              <th style={{ ...thStyle, width: "10%" }}>ID</th>
              <th style={{ ...thStyle, width: "30%" }}>상품명</th>
              <th style={{ ...thStyle, width: "15%" }}>가격</th>
              <th style={{ ...thStyle, width: "15%" }}>재고</th>
              <th style={{ ...thStyle, width: "30%" }}>액션</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#262626" : "#1e1e1e",
                }}
              >
                <td style={tdStyle}>{product.id}</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>
                  {Number.isFinite(product.price)
                    ? product.price.toLocaleString() + "원"
                    : "-"}
                </td>
                <td style={tdStyle}>{product.quantity}개</td>
                <td style={tdStyle}>
                  {selectedProductId === product.id ? (
                    <div style={actionWrapperStyle}>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={inputStyle}
                      />
                      <button
                        onClick={() => handleSubmit(product.id)}
                        style={confirmButtonStyle}
                      >
                        확인
                      </button>
                      <button
                        onClick={() => setSelectedProductId(null)}
                        style={cancelButtonStyle}
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      style={buttonStyle}
                      onClick={() => handleAddClick(product.id)}
                    >
                      장바구니 담기
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

const thStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #444",
  color: "#ccc",
  fontWeight: "bold",
  textAlign: "left",
};

const tdStyle = {
  padding: "0.75rem",
  borderBottom: "1px solid #333",
  overflowWrap: "break-word",
};

const inputStyle = {
  width: "60px",
  padding: "0.3rem",
  backgroundColor: "#2e2e2e",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "4px",
};

const actionWrapperStyle = {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  flexWrap: "wrap",
};

const buttonStyle = {
  padding: "0.4rem 0.8rem",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const confirmButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#2196f3",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#888",
};

export default ProductList;
