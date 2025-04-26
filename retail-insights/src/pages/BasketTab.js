
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import basketData from '../data/basket_data.json';

const BasketTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {

    setData(basketData);
  }, []);


  const formatRule = rule => {
  
    const left   = rule.antecedents || rule.lhs   || rule.if || [];
    const right  = rule.consequents   || rule.rhs || rule.then || [];
    const a = Array.isArray(left)  ? left.join(', ')  : left;
    const b = Array.isArray(right) ? right.join(', ') : right;
    return `${a} → ${b}`;
  };

 
  const topBySupport = data
    .slice()
    .sort((a, b) => b.support - a.support)
    .slice(0, 10)
    .map(rule => ({
      rule: formatRule(rule),
      support: +(rule.support * 100).toFixed(1)
    }));

  
  const topByLift = data
    .slice()
    .sort((a, b) => b.lift - a.lift)
    .slice(0, 10)
    .map(rule => ({
      rule: formatRule(rule),
      support:    +(rule.support    * 100).toFixed(1),
      confidence: +(rule.confidence * 100).toFixed(1),
      lift:       +rule.lift.toFixed(2)
    }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Basket Analysis</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Top 10 Rules by Support</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart
              data={topBySupport}
              margin={{ top: 20, right: 20, left: 20, bottom: 80 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="rule"
                interval={0}
                height={80}
                angle={-45}
                textAnchor="end"
              />
              <YAxis unit="%" />
              <Tooltip formatter={value => `${value}%`} />
              <Bar dataKey="support" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Top 10 Rules by Lift</h3>
        <table className="min-w-full table-auto border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Rule</th>
              <th className="px-4 py-2 border">Support</th>
              <th className="px-4 py-2 border">Confidence</th>
              <th className="px-4 py-2 border">Lift</th>
            </tr>
          </thead>
          <tbody>
            {topByLift.map((r, i) => (
              <tr key={i}>
                <td className="px-4 py-2 border">{r.rule}</td>
                <td className="px-4 py-2 border">{r.support}%</td>
                <td className="px-4 py-2 border">{r.confidence}%</td>
                <td className="px-4 py-2 border">{r.lift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <p><strong>Interpretation Guide:</strong></p>
        <ul className="list-disc ml-6">
          <li><strong>Support:</strong> % of all transactions containing both items.</li>
          <li><strong>Confidence:</strong> % of antecedent buyers who also bought consequent.</li>
          <li><strong>Lift:</strong> how much more likely the pair is vs random ( &gt;1 significant ).</li>
        </ul>

        <p>
          <strong>Retail Question:</strong> What are the commonly purchased product
          combinations, and how can they drive cross‐selling?
        </p>

        <p><strong>Key Takeaways & Strategies:</strong></p>
        <ul className="list-disc ml-6">
          <li>
            <strong>High‐support pairs:</strong> Bundle these or colocate them in‐store/on‐site.
          </li>
          <li>
            <strong>High‐confidence rules:</strong> “Customers who bought X also bought Y”
            pop‐ups at checkout.
          </li>
          <li>
            <strong>High‐lift associations:</strong> Personalize email or loyalty offers.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BasketTab;
