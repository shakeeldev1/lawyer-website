import { Download, Briefcase, CheckCircle2, Clock, Users } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const CaseStageChart = () => {
  const summaryData = [
    { label: "Total Cases", value: 125, icon: <Briefcase size={20} />, color: "bg-blue-500" },
    { label: "Closed Cases", value: 30, icon: <CheckCircle2 size={20} />, color: "bg-green-500" },
    { label: "Pending Approvals", value: 12, icon: <Clock size={20} />, color: "bg-amber-500" },
    { label: "Active Lawyers", value: 8, icon: <Users size={20} />, color: "bg-indigo-500" },
  ];

  const caseDistribution = [
    { name: "Main Case", value: 60, color: "#3b82f6" },
    { name: "Appeal", value: 35, color: "#f59e0b" },
    { name: "Cassation", value: 15, color: "#10b981" },
    { name: "Closed", value: 30, color: "#22c55e" },
  ];

  const lawyerPerformance = [
    { name: "Lawyer A", cases: 28 },
    { name: "Lawyer B", cases: 24 },
    { name: "Lawyer C", cases: 19 },
    { name: "Lawyer D", cases: 12 },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-200 w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Managing Director Overview</h2>
        <button className="flex items-center gap-2 text-sm bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryData.map((stat, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center gap-3 hover:shadow-md transition`}
          >
            <div className={`${stat.color} text-white p-3 rounded-lg`}>
              {stat.icon}
            </div>
            <div>
              <h4 className="text-slate-600 text-sm">{stat.label}</h4>
              <p className="text-lg font-semibold text-slate-800">
                <CountUp end={stat.value} duration={2} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Left - Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Case Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={caseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {caseDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-y-2">
            {caseDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600">
                  {item.name} – <b>{item.value}</b>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Lawyer Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Lawyers Performance
          </h3>
          <div className="space-y-5">
            {lawyerPerformance.map((lawyer, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">{lawyer.name}</span>
                  <span className="text-slate-600">{lawyer.cases} Cases</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(lawyer.cases / 30) * 100}%`,
                      background: "linear-gradient(to right, #6366f1, #3b82f6)",
                      boxShadow: "0 0 8px #6366f140",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStageChart;
