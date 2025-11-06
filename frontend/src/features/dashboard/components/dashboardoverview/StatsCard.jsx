import { TrendingUp, Users, FileText, Calendar, Clock, ArrowUp, ArrowDown } from "lucide-react";

const StatsCard = () => {
  const statsData = [
    {
      title: "Total Cases",
      value: "142",
      change: "+12%",
      trend: "up",
      icon: <FileText className="text-[#fe9a00]" size={22} />,
      description: "Active cases",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "+5%",
      trend: "up",
      icon: <Clock className="text-[#fe9a00]" size={22} />,
      description: "Awaiting review",
    },
    {
      title: "Upcoming Hearings",
      value: "8",
      change: "-2%",
      trend: "down",
      icon: <Calendar className="text-[#fe9a00]" size={22} />,
      description: "Next 7 days",
    },
    {
      title: "Active Clients",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: <Users className="text-[#fe9a00]" size={22} />,
      description: "Engaged clients",
    },
  ];

  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          style={{
            borderLeft: `4px solid #fe9a00`,
            height: "150px", // reduced height for sleek look
          }}
        >
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#1c283c]/10">{stat.icon}</div>
                <h3 className="text-sm font-medium text-[#1c283c]">{stat.title}</h3>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {stat.change}
              </div>
            </div>

            <div className="mt-3">
              <p className="text-2xl font-bold text-[#1c283c]">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
