import { Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";

const CaseStageChart = () => {
  const caseDistribution = [
    { name: "Main Case", value: 60, color: "#1c283c" },
    { name: "Appeal", value: 35, color: "#fe9a00" },
    { name: "Cassation", value: 15, color: "#6b7280" }, // muted gray for contrast
    { name: "Closed", value: 30, color: "#d1d5db" }, // light gray tone
  ];

  const lawyerPerformance = [
    { name: "Lawyer A", cases: 28 },
    { name: "Lawyer B", cases: 24 },
    { name: "Lawyer C", cases: 19 },
    { name: "Lawyer D", cases: 12 },
  ];

  return (
    <div className="bg-white mt-20 p-8 rounded-2xl shadow-md border border-gray-100 w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1c283c]">Managing Director Overview</h2>
        <button className="flex items-center gap-2 text-sm bg-[#1c283c] text-white hover:bg-[#fe9a00] px-4 py-2 rounded-lg transition-colors duration-300 shadow-sm">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-10 mt-6">
        {/* Left - Donut Chart */}
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1c283c] mb-4">Case Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={caseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {caseDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    color: "#1c283c",
                  }}
                />
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
                <span className="text-sm text-[#1c283c]">
                  {item.name} – <b>{item.value}</b>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Lawyer Performance */}
        <div className="bg-[#f9fafb] p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1c283c] mb-6">Lawyers Performance</h3>
          <div className="space-y-5">
            {lawyerPerformance.map((lawyer, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[#1c283c]">{lawyer.name}</span>
                  <span className="text-gray-600">
                    <CountUp end={lawyer.cases} duration={1.5} /> Cases
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(lawyer.cases / 30) * 100}%`,
                      background:
                        "linear-gradient(to right, #fe9a00, #1c283c)",
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
