// src/components/lawyer/StatCards.jsx
import React from "react";
import { FileText, CheckCircle, Clock, Calendar } from "lucide-react";

const statData = [
  { 
    title: "Total Cases", 
    value: 12, 
    icon: <FileText className="w-5 h-5 text-slate-700" />,
    bgColor: "bg-white",
    borderColor: "border-slate-200",
    gradient: "from-slate-50 to-white",
    iconBg: "bg-slate-100"
  },
  { 
    title: "Pending Memorandums", 
    value: 3, 
    icon: <Clock className="w-5 h-5 text-slate-700" />,
    bgColor: "bg-white",
    borderColor: "border-slate-200",
    gradient: "from-slate-50 to-white",
    iconBg: "bg-slate-100"
  },
  { 
    title: "Awaiting Ragab Approval", 
    value: 2, 
    icon: <CheckCircle className="w-5 h-5 text-slate-700" />,
    bgColor: "bg-white",
    borderColor: "border-slate-200",
    gradient: "from-slate-50 to-white",
    iconBg: "bg-slate-100"
  },
  { 
    title: "Upcoming Hearings", 
    value: 1, 
    icon: <Calendar className="w-5 h-5 text-slate-700" />,
    bgColor: "bg-white",
    borderColor: "border-slate-200",
    gradient: "from-slate-50 to-white",
    iconBg: "bg-slate-100"
  },
];

const StatCard = ({ icon, title, value, bgColor, borderColor, gradient, iconBg }) => (
  <div className={`relative bg-white border ${borderColor} p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-slate-300 overflow-hidden`}>
    {/* Background Gradient Effect */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    
    {/* Content */}
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
    
    {/* Bottom accent border on hover */}
    <div className="absolute bottom-0 left-0 w-0 h-1 bg-slate-600 group-hover:w-full transition-all duration-500 ease-out" />
  </div>
);

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statData.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  );
};

export default StatCards;