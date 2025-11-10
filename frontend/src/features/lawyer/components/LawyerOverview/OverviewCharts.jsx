// src/components/lawyer/OverviewCharts.jsx
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const COLORS = ["#1e293b", "#475569", "#64748b", "#94a3b8"];

const caseStageData = [
  { name: "Main Case", value: 5 },
  { name: "Appeal", value: 3 },
  { name: "Cassation", value: 2 },
];

const casesByStatusData = [
  { status: "Pending Memorandum", count: 3 },
  { status: "Awaiting Ragab Approval", count: 2 },
  { status: "Approved", count: 5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg shadow-lg">
        <p className="text-white font-medium">{label || payload[0].name}</p>
        <p className="text-slate-200">
          {payload[0].dataKey === 'count' ? 'Count: ' : 'Value: '}
          <span className="text-white font-semibold ml-1">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const PieChartCard = ({ title, data }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            labelLine={false}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarChartCard = ({ title, data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#f1f5f9" 
            vertical={false} 
          />
          <XAxis 
            dataKey="status" 
            stroke="#64748b"
            fontSize={12}
            angle={-30}
            textAnchor="end"
            height={50}
            interval={0}
          />
          <YAxis 
            stroke="#64748b"
            fontSize={12}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#1e293b"
            radius={[4, 4, 0, 0]}
            barSize={50}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const OverviewCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <PieChartCard title="Cases by Stage" data={caseStageData} />
      <BarChartCard title="Cases by Status" data={casesByStatusData} />
    </div>
  );
};

export default OverviewCharts;