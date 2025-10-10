function Layout({ children }) {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#eee",
        minHeight: "100vh",
        paddingBottom: "5rem",
        paddingTop: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "0 1.5rem", // ✅ 양쪽 여백
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
