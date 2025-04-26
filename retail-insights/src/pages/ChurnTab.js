import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';
import churnData from '../data/churn_data.json';

const ChurnTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(churnData);
  }, []);

  // Enrich with days_since
  const now = Date.now();
  const enriched = data.map(d => ({
    ...d,
    days_since: Math.floor((now - d.last_purchase) / (1000 * 60 * 60 * 24))
  }));

  // Bucket by recency
  const buckets = {
    '0–30d': [], '31–60d': [], '61–90d': [], '>90d': []
  };
  enriched.forEach(d => {
    if (d.days_since <= 30) buckets['0–30d'].push(d);
    else if (d.days_since <= 60) buckets['31–60d'].push(d);
    else if (d.days_since <= 90) buckets['61–90d'].push(d);
    else buckets['>90d'].push(d);
  });
  const churnByRecency = Object.entries(buckets).map(([bucket, arr]) => ({
    bucket,
    churn_rate: arr.length
      ? arr.filter(d => d.churned === 1).length / arr.length * 100
      : 0
  }));

  // Top 10 at-risk households (those who churned, sorted by visits)
  const atRisk = data
    .filter(d => d.churned === 1)
    .sort((a, b) => b.total_visits - a.total_visits)
    .slice(0, 10);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Churn Analysis</h2>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={churnByRecency}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bucket" />
            <YAxis unit="%" />
            <Tooltip formatter={value => `${value.toFixed(1)}%`} />
            <Bar dataKey="churn_rate" name="Churn Rate" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Top 10 At-Risk Households</h3>
      <table className="min-w-full mt-2 table-auto border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Household</th>
            <th className="px-4 py-2 border">Total Visits</th>
            <th className="px-4 py-2 border">Total Spend</th>
          </tr>
        </thead>
        <tbody>
          {atRisk.map(d => (
            <tr key={d.HSHD_NUM}>
              <td className="px-4 py-2 border">{d.HSHD_NUM}</td>
              <td className="px-4 py-2 border">{d.total_visits}</td>
              <td className="px-4 py-2 border">${d.total_spend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 space-y-4">
        <p>
          <strong>Insight:</strong> Customers with &gt;60 days since last purchase
          have the highest churn rates. High-frequency buyers who nevertheless churned
          suggest sudden disengagement.
        </p>
        <p>
          <strong>Retention Strategies:</strong>
          <ul className="list-disc ml-6">
            <li>Automated reminders at 30/60 days of inactivity.</li>
            <li>Personalized offers based on their most-purchased categories.</li>
            <li>Extra loyalty points for larger households (HH_SIZE ≥ 3).</li>
          </ul>
        </p>
      </div>
    </div>
  );
};

export default ChurnTab;
