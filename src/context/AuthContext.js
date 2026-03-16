// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);

  // Load state from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem("sousscon_user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedUsers = localStorage.getItem("sousscon_users");
    let parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Ensure default Admin account exists immediately upon reading storage
    if (!parsedUsers.some(u => u.email === "admin@test.com")) {
      parsedUsers.push({ id: 1, name: "Super Admin", email: "admin@test.com", password: "123456", role: "admin" });
    }
    setUsers(parsedUsers);

    const storedLogs = localStorage.getItem("sousscon_admin_logs");
    if (storedLogs) setAdminLogs(JSON.parse(storedLogs));
  }, []);

  // Save users to localStorage whenever it changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("sousscon_users", JSON.stringify(users));
    }
  }, [users]);

  // Save logs to localStorage
  useEffect(() => {
    localStorage.setItem("sousscon_admin_logs", JSON.stringify(adminLogs));
  }, [adminLogs]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("sousscon_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("sousscon_user");
    }
  }, [user]);

  const login = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      return { success: true, role: existingUser.role };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = (name, email, password, role) => {
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }
    const newUser = { id: Date.now(), name, email, password, role };
    setUsers([...users, newUser]);
    setUser(newUser);
    
    // Add log
    if (user?.role === 'admin') {
      addLog(`Admin registered new user: ${name} (${role})`);
    }

    return { success: true, role: newUser.role };
  };

  const addLog = (message) => {
    const newLog = { id: Date.now(), message, timestamp: new Date().toISOString() };
    setAdminLogs(prev => [newLog, ...prev]);
  };

  const socialLogin = (provider) => {
    // Mock social login
    const email = `${provider.toLowerCase()}_user@test.com`;
    const name = `${provider} User`;
    const role = "client"; // Always assign 'client' role for social logins

    let existingUser = users.find((u) => u.email === email);
    
    if (!existingUser) {
      // Auto-register if user doesn't exist
      existingUser = { id: Date.now(), name, email, password: "social_auth_mock", role };
      setUsers([...users, existingUser]);
    }
    
    setUser(existingUser);
    return { success: true, role: existingUser.role };
  };

  const adminCreateUser = (name, email, password, role) => {
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already exists" };
    }
    const newUser = { id: Date.now(), name, email, password, role };
    setUsers([...users, newUser]);
    addLog(`Created new ${role} account for ${email}`);
    return { success: true, message: `User ${name} created successfully as ${role}` };
  };

  const deleteUser = (email) => {
    if (email === "admin@test.com") {
      return { success: false, message: "Cannot delete the super admin account" };
    }
    setUsers(users.filter((u) => u.email !== email));
    addLog(`Deleted account: ${email}`);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, adminLogs, login, register, socialLogin, adminCreateUser, deleteUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
