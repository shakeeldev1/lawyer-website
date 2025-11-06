import { Bell, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-gradient-to-r from-[#1c283c] to-[#0d1a2b] shadow-xl border-b border-[#fe9a00]/20 flex items-center justify-end px-8 z-50 transition-all duration-300">
    

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Quick Stats */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="text-right border-r border-slate-700 pr-6">
            <p className="text-sm text-slate-400">Active Cases</p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Today’s Hearings</p>
            <p className="text-lg font-semibold text-white">3</p>
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative group">
          <button className="p-2.5 rounded-xl bg-[#1c283c]/80 hover:bg-[#24344f] text-slate-300 hover:text-white transition-all duration-200 relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 bg-[#fe9a00] text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg animate-pulse">
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          <div className="absolute right-0 mt-3 w-64 bg-[#1c283c]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#fe9a00]/20 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <p className="text-white font-semibold mb-2">Notifications</p>
            <div className="space-y-2">
              <div className="text-sm text-slate-300 p-2 rounded-lg bg-slate-700/50">
                New case assigned to you.
              </div>
              <div className="text-sm text-slate-300 p-2 rounded-lg bg-slate-700/50">
                Hearing reminder in 2 hours.
              </div>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-2xl bg-[#1c283c]/80 hover:bg-[#24344f] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://ui-avatars.com/api/?name=Director&background=fe9a00&color=fff&bold=true&size=128"
                  alt="Director Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#fe9a00] shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#1c283c] rounded-full"></div>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-white">John Davidson</p>
                <p className="text-xs text-slate-400">Managing Director</p>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-[#1c283c]/95 border border-[#fe9a00]/20 rounded-2xl shadow-2xl py-3 z-50 backdrop-blur-xl">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm text-slate-400">Signed in as</p>
                <p className="font-semibold text-white">
                  john.davidson@justicelaw.com
                </p>
              </div>

              <div className="py-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-[#24344f] hover:text-white transition-colors duration-200 text-sm font-medium">
                  <span className="text-[#fe9a00]">👤</span> My Profile
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-[#24344f] hover:text-white transition-colors duration-200 text-sm font-medium">
                  <span className="text-[#fe9a00]">⚙️</span> Account Settings
                </button>
              </div>

              <div className="border-t border-slate-700 pt-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 text-sm font-medium">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2.5 rounded-xl bg-[#1c283c]/80 hover:bg-[#24344f] text-slate-300 hover:text-white transition-all duration-200">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
