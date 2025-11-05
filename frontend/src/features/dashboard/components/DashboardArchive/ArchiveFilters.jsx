import { Search, Filter } from "lucide-react";

const ArchiveFilters = ({ filters, onFilterChange, onClearFilters, showFilters }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-lg p-4 mb-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search Client"
                        value={filters.searchClient}
                        onChange={(e) => onFilterChange("searchClient", e.target.value)}
                        className="w-full border border-slate-300 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search Case ID"
                        value={filters.searchCaseId}
                        onChange={(e) => onFilterChange("searchCaseId", e.target.value)}
                        className="w-full border border-slate-300 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <select
                    value={filters.stage}
                    onChange={(e) => onFilterChange("stage", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">All Stages</option>
                    <option value="Main">Main</option>
                    <option value="Appeal">Appeal</option>
                    <option value="Cassation">Cassation</option>
                </select>

                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange("status", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                    <option value="">All Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => onFilterChange("date", e.target.value)}
                    className="border border-slate-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                    onClick={onClearFilters}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default ArchiveFilters;