import React from "react";
import { Sparkles, Sun, Moon, LogIn, LayoutDashboard, UserCheck, Shield, LogOut, FileText } from "lucide-react";
import { UserProfile } from "../types";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (view?: "login" | "register") => void;
  onLogout: () => void;
  currentTab: string;
  onChangeTab: (tab: string) => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  currentUser,
  onOpenAuth,
  onLogout,
  currentTab,
  onChangeTab,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Branding */}
          <div 
            onClick={() => onChangeTab("landing")} 
            className="flex items-center space-x-2 cursor-pointer group"
            id="logo-brand"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold font-poppins bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                ResumePro
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 ml-1 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 rounded-md uppercase tracking-wider scale-90 inline-block font-mono">
                AI
              </span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex space-x-1">
            <button
              onClick={() => onChangeTab("landing")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === "landing"
                  ? "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              id="nav-home"
            >
              Home
            </button>
            
            {currentUser && (
              <button
                onClick={() => onChangeTab("dashboard")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === "dashboard" || currentTab === "builder"
                    ? "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                id="nav-dashboard"
              >
                Dashboard
              </button>
            )}

            {currentUser?.role === "admin" && (
              <button
                onClick={() => onChangeTab("admin")}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-colors ${
                  currentTab === "admin"
                    ? "bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                id="nav-admin"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              id="theme-toggle-btn"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-purple-600" />
              )}
            </button>

            {/* Auth Dropdown / Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-gray-100/50 dark:bg-gray-800/50 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col text-right hidden sm:block">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 block">
                    {currentUser.fullName}
                  </span>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium flex items-center justify-end space-x-1">
                    {currentUser.isPremium ? (
                      <span className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-1 rounded text-[10px] font-bold">
                        ★ PREMIUM
                      </span>
                    ) : (
                      <span className="text-[10px]">Free Plan</span>
                    )}
                  </span>
                </div>
                
                {/* Profile Avatar */}
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                  {currentUser.fullName.charAt(0)}
                </div>

                {/* Log out icon */}
                <button
                  onClick={onLogout}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-red-500 transition-colors"
                  title="Logout"
                  id="navbar-logout-btn"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors hidden sm:inline-block"
                  id="nav-login-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-200 flex items-center space-x-1.5"
                  id="nav-register-btn"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Start Free</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
