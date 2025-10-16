import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const HOST = import.meta.env.VITE_ORDER_QUERY_SERVER_HOST;
const PORT = import.meta.env.VITE_ORDER_QUERY_SERVER_PORT_OUT;
// const BASE_URL = `http://${HOST}:${PORT}`;
const BASE_URL = `http://myapp.order.query:9999`;

function OrderListQuery() {
  const [orders, setOrders] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data?.list) ? data.list : []);
        setElapsedTime(typeof data?.elapsedTime === "number" ? data.elapsedTime : null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Query API] 호출 실패:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h1 style={{ marginBottom: "1.5rem" }}>🕵️ 주문 목록 (Query Server)</h1>

      {elapsedTime !== null && (
        <p style={{ margin: 0, marginBottom: "1rem", color: "#9aa0a6" }}>
          서버 처리 시간: <span style={{ color: "#e8eaed" }}>{elapsedTime}</span> ms
        </p>
      )}

      {loading ? (
        <p style={{ color: "#aaa" }}>불러오는 중...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: "#bbb" }}>주문이 없습니다.</p>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#eee" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2c2c2c" }}>
              <th style={thStyle}>주문 ID</th>
              <th style={thStyle}>사용자</th>
              <th style={thStyle}>주문일</th>
              <th style={thStyle}>상품 개수</th>
              <th style={thStyle}>총 가격</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              const totalQuantity = order.items.reduce(
                (sum, i) => sum + i.quantity,
                0
              );
              const totalPrice = order.items.reduce(
                (sum, i) => sum + i.quantity * i.price,
                0
              );

              return (
                <React.Fragment key={order.orderId}>
                  <tr
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#262626" : "#1e1e1e",
                    }}
                  >
                    <td style={tdStyle}>{order.orderId}</td>
                    <td style={tdStyle}>
                      {order.userName} ({order.userId})
                    </td>
                    <td style={tdStyle}>
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td style={tdStyle}>{totalQuantity}개</td>
                    <td style={tdStyle}>{totalPrice.toLocaleString()}원</td>
                  </tr>

                  <tr>
                    <td
                      colSpan="5"
                      style={{ padding: 0, backgroundColor: "#1b1b1b" }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          margin: 0,
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: "#333" }}>
                            <th style={subThStyle}>상품 ID</th>
                            <th style={subThStyle}>상품명</th>
                            <th style={subThStyle}>수량</th>
                            <th style={subThStyle}>가격</th>
                            <th style={subThStyle}>합계</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, itemIdx) => (
                            <tr
                              key={itemIdx}
                              style={{
                                backgroundColor:
                                  itemIdx % 2 === 0 ? "#222" : "#191919",
                              }}
                            >
                              <td style={subTdStyle}>{item.productId}</td>
                              <td style={subTdStyle}>{item.productName}</td>
                              <td style={subTdStyle}>{item.quantity}</td>
                              <td style={subTdStyle}>
                                {item.price.toLocaleString()}원
                              </td>
                              <td style={subTdStyle}>
                                {(item.quantity * item.price).toLocaleString()}
                                원
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={5} style={{ height: "2rem" }}></td>
                  </tr>
                </React.Fragment>
              );
            })}
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
};

const subThStyle = {
  padding: "0.5rem",
  borderBottom: "1px solid #444",
  fontSize: "0.9rem",
  color: "#aaa",
  textAlign: "left",
};

const subTdStyle = {
  padding: "0.5rem",
  borderBottom: "1px solid #2a2a2a",
  fontSize: "0.9rem",
};

export default OrderListQuery;
