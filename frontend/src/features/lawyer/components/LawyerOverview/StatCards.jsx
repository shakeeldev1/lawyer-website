import { FileText, CheckCircle, Clock, Calendar } from "lucide-react";
import { useLawyerDashboardStatsQuery } from "../../api/lawyerApi";

const StatCard = ({ icon, title, value, bgColor, borderColor }) => (
  <div
    className={`${bgColor} border ${borderColor} p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
  >
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-md bg-slate-100">{icon}</div>
      <div className="flex-1">
        <span className="text-slate-500 text-[11px] font-medium block">
          {title}
        </span>
        <div className="text-lg font-bold text-slate-800">{value}</div>
      </div>
    </div>
  </div>
);

const StatCards = () => {
  const { data, isLoading, isError } = useLawyerDashboardStatsQuery();
  const statsData = data?.data; // API returns { success: true, data: {...} }

  if (isLoading)
    return <p className="text-center text-slate-700">Loading stats...</p>;
  if (isError || !statsData)
    return <p className="text-center text-red-500">Failed to load stats.</p>;

  const stats = [
    {
      title: "Total Cases",
      value: statsData.totalAssigned ?? 0,
      icon: <FileText className="w-4 h-4 text-slate-600" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
    },
    {
      title: "Pending Memorandums",
      value: statsData.pendingMyApproval ?? 0,
      icon: <Clock className="w-4 h-4 text-slate-600" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
    },
    {
      title: "Awaiting Ragab Approval",
      value: statsData.pendingApproval ?? 0,
      icon: <CheckCircle className="w-4 h-4 text-slate-600" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
    },
    {
      title: "Upcoming Hearings",
      value: statsData.upcomingHearings?.length ?? 0,
      icon: <Calendar className="w-4 h-4 text-slate-600" />,
      bgColor: "bg-white",
      borderColor: "border-slate-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {stats.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default StatCards;
