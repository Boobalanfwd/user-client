import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyLink({ onLogin }) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/verify-login-link/${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        localStorage.setItem('token', data.token);
        onLogin(data.token);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, navigate, onLogin]);

  if (verifying) {
    return <div className="verifying">Verifying link...</div>;
  }

  if (error) {
    return (
      <div className="auth-form">
        <h2>Link Verification Failed</h2>
        <div className="error">{error}</div>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    );
  }

  return null;
}

export default VerifyLink; 