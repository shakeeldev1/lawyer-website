import { Bell, Search, ChevronDown, Menu, Shield } from "lucide-react";
import { useState } from "react";

const Topbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="w-[1314px] ml-[260px] h-20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl border-b border-slate-700 flex items-center justify-between px-8 fixed top-0 right-0 z-50">
      {/* Left Section - Branding & Title */}
      <div className="flex items-center gap-4">
        
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'
            }`}>
            <input
              type="text"
              placeholder="Search cases, documents..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 backdrop-blur-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Search
              size={20}
              className={`absolute left-4 top-3.5 transition-colors duration-300 ${searchFocused ? 'text-amber-500' : 'text-slate-400'
                }`}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="text-right border-r border-slate-700 pr-6">
            <p className="text-sm text-slate-400">Active Cases</p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Today's Hearings</p>
            <p className="text-lg font-semibold text-white">3</p>
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200 group">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-lg animate-pulse">
            3
          </span>
          <div className="absolute -bottom-12 right-0 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <p className="text-white font-medium mb-2">Notifications</p>
            <div className="space-y-2">
              <div className="text-sm text-slate-300 p-2 rounded-lg bg-slate-700/50">
                New case assignment
              </div>
              <div className="text-sm text-slate-300 p-2 rounded-lg bg-slate-700/50">
                Hearing reminder in 2 hours
              </div>
            </div>
          </div>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://ui-avatars.com/api/?name=Director&background=amber-500&color=fff&bold=true&size=128"
                  alt="Director Avatar"
                  className="w-10 h-10 rounded-full border-2 border-amber-500 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-white">John Davidson</p>
                <p className="text-xs text-slate-400">Managing Director</p>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl py-3 z-50 backdrop-blur-sm">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-sm text-slate-400">Signed in as</p>
                <p className="font-semibold text-white">john.davidson@justicelaw.com</p>
              </div>

              <div className="py-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200 text-sm font-medium">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  My Profile
                </button>

                <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors duration-200 text-sm font-medium">
                  <div className="w-6 h-6 bg-slate-600 rounded-lg flex items-center justify-center">
                    <span className="text-xs">⚙️</span>
                  </div>
                  Account Settings
                </button>

                
              </div>

              <div className="border-t border-slate-700 pt-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 text-sm font-medium">
                  <div className="w-6 h-6 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-xs">🚪</span>
                  </div>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2.5 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200">
          <Menu size={22} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;