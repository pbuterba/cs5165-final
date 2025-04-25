import React, { useState } from 'react';
import './App.css';
import ChurnTab from './pages/ChurnTab';
import BasketTab from './pages/BasketTab';
import ClvTab from './pages/ClvTab';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'churn' | 'basket' | 'clv'>('churn');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Retail Insights Analysis Dashboard</h1>
      <div className="tabs">
        <button className={activeTab === 'churn' ? 'active' : ''} onClick={() => setActiveTab('churn')}>Churn</button>
        <button className={activeTab === 'basket' ? 'active' : ''} onClick={() => setActiveTab('basket')}>Basket</button>
        <button className={activeTab === 'clv' ? 'active' : ''} onClick={() => setActiveTab('clv')}>CLV</button>
      </div>
      <div className="tab-content">
        {activeTab === 'churn' && <ChurnTab />}
        {activeTab === 'basket' && <BasketTab />}
        {activeTab === 'clv' && <ClvTab />}
      </div>
    </div>
  );
};

export default App;
