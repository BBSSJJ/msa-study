// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState("");

  // 컴포넌트 마운트 시 localStorage에서 userId 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem("userId");
    if (savedId) {
      setUserId(savedId);
    }
  }, []);

  // userId가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
