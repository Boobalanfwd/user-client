import React, { useState } from 'react';

function Register() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! You can now login.');
      setError('');
      setIdentifier('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Connection failed. Please check if the server is running.');
      setSuccess('');
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Phone:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="5"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register; 