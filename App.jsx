import { useState, useEffect } from 'react';
import { fetchTransactions } from './api';
import { processTransactions } from './utils';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchTransactions();
        const processed = processTransactions(transactions);
        
        processed.sort((a, b) => b.totalPoints - a.totalPoints);
        
        setCustomers(processed);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load reward data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Calculating points...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-container" style={{ color: '#f85149' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <header className="app-header">
        <h1 className="app-title">Rewards Portal</h1>
        <p className="app-subtitle">Customer Points & Summaries</p>
      </header>

      <div className="cards-grid">
        {customers.map((customer) => (
          <div key={customer.id} className="customer-card">
            <div className="card-header">
              <h2 className="customer-name">{customer.name}</h2>
              <span className="customer-id">{customer.id}</span>
            </div>
            
            <div className="total-points-section">
              <div className="total-value">{customer.totalPoints}</div>
              <div className="total-label">Total Points Earned</div>
            </div>

            <div className="monthly-section">
              <h4>Monthly Breakdown</h4>
              <ul className="monthly-list">
                {Object.entries(customer.monthlyPoints)
                  .sort(([monthA], [monthB]) => {
                    const [mA, yA] = monthA.split('/');
                    const [mB, yB] = monthB.split('/');
                    if (yA !== yB) return Number(yA) - Number(yB);
                    return Number(mA) - Number(mB);
                  })
                  .map(([monthYear, pts]) => (
                    <li key={monthYear} className="monthly-item">
                      <span className="month-label">{monthYear}</span>
                      <span className="month-pts">+{pts} pts</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
