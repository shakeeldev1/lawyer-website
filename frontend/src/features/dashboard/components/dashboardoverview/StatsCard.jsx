import { TrendingUp, Users, FileText, Calendar, Clock, ArrowUp, ArrowDown } from "lucide-react";

const StatsCard = () => {
    const statsData = [
        {
            title: "Total Cases",
            value: "142",
            change: "+12%",
            trend: "up",
            icon: <FileText className="text-blue-500" size={24} />,
            color: "bg-gradient-to-br from-blue-50 to-blue-100",
            borderColor: "border-l-blue-500",
            description: "Active cases"
        },
        {
            title: "Pending Approvals",
            value: "23",
            change: "+5%",
            trend: "up",
            icon: <Clock className="text-amber-500" size={24} />,
            color: "bg-gradient-to-br from-amber-50 to-amber-100",
            borderColor: "border-l-amber-500",
            description: "Awaiting review"
        },
        {
            title: "Upcoming Hearings",
            value: "8",
            change: "-2%",
            trend: "down",
            icon: <Calendar className="text-emerald-500" size={24} />,
            color: "bg-gradient-to-br from-emerald-50 to-emerald-100",
            borderColor: "border-l-emerald-500",
            description: "Next 7 days"
        },
        {
            title: "Active Clients",
            value: "89",
            change: "+8%",
            trend: "up",
            icon: <Users className="text-purple-500" size={24} />,
            color: "bg-gradient-to-br from-purple-50 to-purple-100",
            borderColor: "border-l-purple-500",
            description: "Engaged clients"
        }
    ];

    return (
        <div className="mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
                <div
                    key={index}
                    className={`bg-white rounded-2xl shadow-lg border-l-4 ${stat.borderColor} hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]`}
                >
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${stat.trend === 'up'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                {stat.change}
                            </div>
                        </div>

                        <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</p>
                        <p className="text-slate-500 text-sm">{stat.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCard;