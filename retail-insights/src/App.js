import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import ChurnTab          from './pages/ChurnTab';
import BasketTab         from './pages/BasketTab';
import ClvTab            from './pages/ClvTab';
import CombinedDataPage  from './pages/CombinedDataPage';

function App() {
  // login fields: username, email, password
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // which tab is active
  const [activeTab, setActiveTab] = useState('churn');

  // CLV data
  const [data, setData] = useState([]);
  const featureImportances = {
    frequency:      0.924,
    monetary_value: 0.074,
    recency:        0.002,
    T:              0.0005,
  };

  useEffect(() => {
    axios
      .get('/data/clv_data.json')
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    if (
      username === 'admin' &&
      email    === 'admin@admin.com' &&
      password === 'admin'
    ) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // show login form until authenticated
  if (!loggedIn) {
    return (
      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // once logged in, show the tabbed dashboard
  return (
    <div className="main-container">
      <h1>Retail Insights Analysis Dashboard</h1>

      <div className="tabs">
        <button
          className={activeTab === 'churn' ? 'active' : ''}
          onClick={() => setActiveTab('churn')}
        >
          Churn
        </button>
        <button
          className={activeTab === 'basket' ? 'active' : ''}
          onClick={() => setActiveTab('basket')}
        >
          Basket
        </button>
        <button
          className={activeTab === 'clv' ? 'active' : ''}
          onClick={() => setActiveTab('clv')}
        >
          CLV
        </button>
        <button
          className={activeTab === 'allData' ? 'active' : ''}
          onClick={() => setActiveTab('allData')}
        >
          All Data
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'churn'   && <ChurnTab />}
        {activeTab === 'basket'  && <BasketTab />}
        {activeTab === 'clv'     && (
          <ClvTab
            data={data}
            featureImportances={featureImportances}
          />
        )}
        {activeTab === 'allData' && <CombinedDataPage />}
      </div>
    </div>
  );
}

export default App;
