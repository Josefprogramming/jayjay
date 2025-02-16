import React, { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setError("");
    } catch (err) {
      setError("Nesprávné údaje");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Vítej, {user.email}!</h2>
          <button onClick={handleLogout}>Odhlásit se</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Přihlášení</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Přihlásit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default App;
