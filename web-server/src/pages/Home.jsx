// src/pages/Home.jsx
import { useUser } from "../contexts/UserContext";
import Layout from "../components/Layout";

function Home() {
  const { userId, setUserId } = useUser();

  return (
    <Layout>
      <h1>🏠 홈</h1>
      <p>
        사용할 <strong>사용자 ID</strong>를 입력해주세요.
      </p>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="예: user123"
        style={inputStyle}
      />
      {userId && (
        <p style={{ marginTop: "1rem" }}>
          현재 사용자 ID: <strong>{userId}</strong>
        </p>
      )}
    </Layout>
  );
}

const inputStyle = {
  marginTop: "1rem",
  padding: "0.5rem",
  fontSize: "1rem",
  width: "250px",
  backgroundColor: "#1f1f1f",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "4px",
};

export default Home;
