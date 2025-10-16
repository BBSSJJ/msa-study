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

  const extractList = (d) => {
    if (Array.isArray(d)) return d;
    if (!d || typeof d !== "object") return [];
    const candidates = [
      d.list,
      d.items,
      d.content,
      d.data?.list,
      d.data?.items,
      d.data,
      d.results,
    ];
    for (const c of candidates) if (Array.isArray(c)) return c;
    return [];
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        const list = extractList(data);
        setOrders(list);
        setElapsedTime(typeof data?.elapsedTime === "number" ? data.elapsedTime : null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[Query API] ?몄텧 ?ㅽ뙣:", err);
        setLoading(false);
      });
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <Layout>
      <h1 style={{ marginBottom: "1.5rem" }}>?빑截?二쇰Ц 紐⑸줉 (Query Server)</h1>

      {elapsedTime !== null && (
        <p style={{ margin: 0, marginBottom: "1rem", color: "#9aa0a6" }}>
          ?쒕쾭 泥섎━ ?쒓컙: <span style={{ color: "#e8eaed" }}>{elapsedTime}</span> ms
          <span style={{ float: "right", color: "#e8eaed" }}>총 {safeOrders.length}건</span>
        </p>
      )}

      {loading ? (
        <p style={{ color: "#aaa" }}>遺덈윭?ㅻ뒗 以?..</p>
      ) : safeOrders.length === 0 ? (
        <p style={{ color: "#bbb" }}>二쇰Ц???놁뒿?덈떎.</p>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse", color: "#eee" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#2c2c2c" }}>
              <th style={thStyle}>二쇰Ц ID</th>
              <th style={thStyle}>?ъ슜??/th>
              <th style={thStyle}>二쇰Ц??/th>
              <th style={thStyle}>?곹뭹 媛쒖닔</th>
              <th style={thStyle}>珥?媛寃?/th>
            </tr>
          </thead>
          <tbody>
            {safeOrders.map((order, idx) => {
              const items = Array.isArray(order?.items) ? order.items : [];
              const totalQuantity = items.reduce(
                (sum, i) => sum + i.quantity,
                0
              );
              const totalPrice = items.reduce(
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
                    <td style={tdStyle}>{totalQuantity}媛?/td>
                    <td style={tdStyle}>{totalPrice.toLocaleString()}??/td>
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
                            <th style={subThStyle}>?곹뭹 ID</th>
                            <th style={subThStyle}>?곹뭹紐?/th>
                            <th style={subThStyle}>?섎웾</th>
                            <th style={subThStyle}>媛寃?/th>
                            <th style={subThStyle}>?⑷퀎</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, itemIdx) => (
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
                                {item.price.toLocaleString()}??
                              </td>
                              <td style={subTdStyle}>
                                {(item.quantity * item.price).toLocaleString()}
                                ??
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

