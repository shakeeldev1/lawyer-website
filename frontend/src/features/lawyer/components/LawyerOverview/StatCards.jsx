import { FileText, CheckCircle, Clock, Calendar } from "lucide-react";
import { useLawyerDashboardStatsQuery } from "../../api/lawyerApi";

const StatCard = ({ icon, title, value, bgColor, borderColor, gradient, iconBg }) => (
  <div className={`relative ${bgColor} border ${borderColor} p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-slate-300 overflow-hidden`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    <div className="relative flex items-center gap-4">
      <div className={`p-3 rounded-xl ${iconBg} group-hover:bg-slate-200 transition-all duration-300 group-hover:scale-110 shadow-sm`}>
        {icon}
      </div>
      <div className="flex-1">
        <span className="text-slate-600 text-sm font-medium tracking-wide block mb-1">{title}</span>
        <div className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
          {value}
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-0 h-1 bg-slate-600 group-hover:w-full transition-all duration-500 ease-out" />
  </div>
);

const StatCards = () => {
  const { data, isLoading, isError } = useLawyerDashboardStatsQuery();
  const statsData = data?.data; // API returns { success: true, data: {...} }

  if (isLoading) return <p className="text-center text-slate-700">Loading stats...</p>;
  if (isError || !statsData) return <p className="text-center text-red-500">Failed to load stats.</p>;

  const stats = [
    {
      title: "Total Cases",
      value: statsData.totalAssigned ?? 0,
      icon: <FileText className="w-5 h-5 text-slate-700" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
      gradient: "from-slate-50 to-white",
      iconBg: "bg-slate-100",
    },
    {
      title: "Pending Memorandums",
      value: statsData.pendingMyApproval ?? 0,
      icon: <Clock className="w-5 h-5 text-slate-700" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
      gradient: "from-slate-50 to-white",
      iconBg: "bg-slate-100",
    },
    {
      title: "Awaiting Ragab Approval",
      value: statsData.pendingApproval ?? 0,
      icon: <CheckCircle className="w-5 h-5 text-slate-700" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
      gradient: "from-slate-50 to-white",
      iconBg: "bg-slate-100",
    },
    {
      title: "Upcoming Hearings",
      value: statsData.upcomingHearings?.length ?? 0,
      icon: <Calendar className="w-5 h-5 text-slate-700" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
      gradient: "from-slate-50 to-white",
      iconBg: "bg-slate-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default StatCards;
