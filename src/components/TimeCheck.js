import React, { useState, useEffect } from 'react';

function TimeCheck({ token }) {
  const [serverTime, setServerTime] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const checkServerTime = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/time', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to get server time');
      }

      const data = await response.json();
      setServerTime(data.serverTime);
      setError('');
    } catch (err) {
      setError(err.message);
      setServerTime(null);
      
      if (err.message.includes('Invalid token') || err.message.includes('kicked out')) {
        localStorage.removeItem('token');
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      checkServerTime();
      const interval = setInterval(checkServerTime, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <div className="time-check">
      <h3>Server Time Check</h3>
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {serverTime && (
        <div className="server-time">
          Server Time: {new Date(serverTime).toLocaleString()}
        </div>
      )}
      <button 
        onClick={checkServerTime} 
        disabled={loading}
      >
        Refresh Time
      </button>
    </div>
  );
}

export default TimeCheck; 