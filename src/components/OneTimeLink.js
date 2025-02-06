import React, { useState } from 'react';

function OneTimeLink() {
  const [identifier, setIdentifier] = useState('');
  const [link, setLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLink('');

    try {
      const response = await fetch('http://localhost:8080/api/request-login-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate link');
      }

      if (data.success && data.loginLink) {
        setLink(data.loginLink);
      } else {
        throw new Error('No login link in response');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Request One-Time Login Link</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email or Phone:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Get Login Link'}
        </button>
      </form>
      {link && (
        <div className="link-display">
          <p>Your one-time login link:</p>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
          <p className="expiry">
            (Link expires in 30 minutes)
          </p>
        </div>
      )}
    </div>
  );
}

export default OneTimeLink; 