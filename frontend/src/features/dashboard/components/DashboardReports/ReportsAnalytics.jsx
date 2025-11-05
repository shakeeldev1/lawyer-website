import { useState, useMemo } from "react";
import { BarChart3, Users, CalendarDays } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Constants
const STAGES = ["Main", "Appeal", "Cassation"];
const CHART_COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

const ReportsAnalytics = () => {
    // Sample data
    const [cases] = useState([
        { id: "C-101", client: "Ahmed Khan", stage: "Main", lawyer: "Ali Raza", status: "Pending", hearing: "2025-11-10" },
        { id: "C-102", client: "Sara Ahmed", stage: "Appeal", lawyer: "Mariam Tariq", status: "Completed", hearing: "2025-11-12" },
        { id: "C-103", client: "Bilal Shah", stage: "Cassation", lawyer: "Ali Raza", status: "Pending", hearing: "2025-11-15" },
        { id: "C-104", client: "Fatima Noor", stage: "Main", lawyer: "Mariam Tariq", status: "Completed", hearing: "2025-11-20" },
    ]);

    // Summary statistics
    const { totalCases, pendingCases, completedCases } = useMemo(() => ({
        totalCases: cases.length,
        pendingCases: cases.filter(c => c.status === "Pending").length,
        completedCases: cases.filter(c => c.status === "Completed").length,
    }), [cases]);

    // Cases per stage
    const casesPerStage = useMemo(() =>
        STAGES.map(stage => cases.filter(c => c.stage === stage).length),
        [cases]
    );

    // Cases by lawyer
    const casesByLawyer = useMemo(() => {
        const lawyers = [...new Set(cases.map(c => c.lawyer))];
        return lawyers.map(lawyer => ({
            lawyer,
            total: cases.filter(c => c.lawyer === lawyer).length,
            pending: cases.filter(c => c.lawyer === lawyer && c.status === "Pending").length,
            completed: cases.filter(c => c.lawyer === lawyer && c.status === "Completed").length,
        }));
    }, [cases]);

    // Bar chart configuration
    const barChartData = useMemo(() => ({
        labels: STAGES,
        datasets: [
            {
                label: "Cases per Stage",
                data: casesPerStage,
                backgroundColor: CHART_COLORS,
            },
        ],
    }), [casesPerStage]);

    const barChartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#1e293b",
                titleColor: "#f8fafc",
                bodyColor: "#f8fafc",
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: "500",
                    },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "#e2e8f0",
                },
            },
        },
    }), []);

    // Summary cards configuration
    const summaryCards = [
        {
            icon: BarChart3,
            iconColor: "text-amber-500",
            label: "Total Cases",
            value: totalCases,
        },
        {
            icon: CalendarDays,
            iconColor: "text-yellow-500",
            label: "Pending Cases",
            value: pendingCases,
        },
        {
            icon: Users,
            iconColor: "text-green-500",
            label: "Completed Cases",
            value: completedCases,
        },
    ];

    return (
        <div className="p-6 mt-24 max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-6">Reports & Analytics</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {summaryCards.map((card, index) => {
                    const IconComponent = card.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 transition-all duration-200 hover:shadow-xl"
                        >
                            <IconComponent size={32} className={card.iconColor} />
                            <div>
                                <p className="text-sm text-slate-500 font-medium">{card.label}</p>
                                <p className="text-2xl font-bold text-slate-800">{card.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cases per Stage Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Cases per Stage</h3>
                <div className="max-w-2xl mx-auto h-64">
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>

            {/* Cases by Lawyer */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Cases by Lawyer</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-700">Lawyer</th>
                                <th className="p-4 font-semibold text-slate-700">Total Cases</th>
                                <th className="p-4 font-semibold text-slate-700">Pending</th>
                                <th className="p-4 font-semibold text-slate-700">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {casesByLawyer.map((lawyer, index) => (
                                <tr
                                    key={lawyer.lawyer}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="p-4 font-medium text-slate-800">{lawyer.lawyer}</td>
                                    <td className="p-4 text-slate-600">{lawyer.total}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                                            {lawyer.pending}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                            {lawyer.completed}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upcoming Hearings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Upcoming Hearings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 font-semibold text-slate-700">Case ID</th>
                                <th className="p-4 font-semibold text-slate-700">Client</th>
                                <th className="p-4 font-semibold text-slate-700">Stage</th>
                                <th className="p-4 font-semibold text-slate-700">Lawyer</th>
                                <th className="p-4 font-semibold text-slate-700">Hearing Date</th>
                                <th className="p-4 font-semibold text-slate-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cases.map((caseItem) => (
                                <tr
                                    key={caseItem.id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                >
                                    <td className="p-4 font-medium text-slate-800">{caseItem.id}</td>
                                    <td className="p-4 text-slate-600">{caseItem.client}</td>
                                    <td className="p-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {caseItem.stage}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600">{caseItem.lawyer}</td>
                                    <td className="p-4 text-slate-600">{caseItem.hearing}</td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${caseItem.status === "Pending"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : "bg-emerald-100 text-emerald-800"
                                                }`}
                                        >
                                            {caseItem.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsAnalytics;    