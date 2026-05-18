import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-icon">📊</div>

        <h1>Login Admin</h1>
        <p>Masuk untuk mengelola aplikasi akuntansi UMKM.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Masuk Dashboard</button>
        </form>

        <div className="login-demo">
          <span>Demo Login</span>
          <strong>admin / admin123</strong>
        </div>
      </div>
    </main>
  );
}

export default Login;