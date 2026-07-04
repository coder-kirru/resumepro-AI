import React, { useState } from "react";
import { Users, Layout, BarChart3, Receipt, Mail, ShieldAlert, Sparkles, UserX, Check, X, ShieldAlert as AlertIcon, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import { UserProfile, ContactMessage, AdminAnalytics } from "../types";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "templates" | "plans" | "messages">("analytics");

  // Mock initial users data
  const [users, setUsers] = useState<UserProfile[]>([
    { id: "usr_1", email: "kirruswork@gmail.com", fullName: "Alex Mercer", role: "admin", isPremium: true },
    { id: "usr_2", email: "sarah.connor@cyberdyne.com", fullName: "Sarah Connor", role: "user", isPremium: true },
    { id: "usr_3", email: "bruce.wayne@waynecorp.com", fullName: "Bruce Wayne", role: "user", isPremium: true },
    { id: "usr_4", email: "peter.parker@dailybugle.com", fullName: "Peter Parker", role: "user", isPremium: false },
    { id: "usr_5", email: "clark.kent@dailyplanet.com", fullName: "Clark Kent", role: "user", isPremium: false },
    { id: "usr_6", email: "tony.stark@starkark.com", fullName: "Tony Stark", role: "user", isPremium: true },
  ]);

  // Mock templates toggles
  const [templates, setTemplates] = useState([
    { id: "modern", name: "Modern Style", type: "Premium", enabled: true },
    { id: "professional", name: "Professional Corporate", type: "Free", enabled: true },
    { id: "executive", name: "Executive Serif", type: "Premium", enabled: true },
    { id: "minimal", name: "Minimalist Grid", type: "Free", enabled: true },
    { id: "creative", name: "Creative Sidebar", type: "Premium", enabled: true },
    { id: "ats-classic", name: "ATS Classic Strict", type: "Free", enabled: true },
    { id: "elegant", name: "Elegant Gold", type: "Premium", enabled: true },
    { id: "corporate", name: "Corporate Rigid", type: "Free", enabled: true },
  ]);

  // Mock messages
  const [messages, setMessages] = useState<ContactMessage[]>([
    { id: "msg_1", name: "Jane Foster", email: "jane@thor-lab.com", subject: "Custom CSS request", message: "Hi ResumePro team, is there any way to write custom CSS styles or override standard spacing rules manually? Your templates look great but our HR requested a very specific padding.", date: "2026-07-02" },
    { id: "msg_2", name: "John Connor", email: "john@tech-rebel.io", subject: "University Enterprise Package", message: "Hello, do you offer discount tiers or custom pricing models for high school or university student cohorts? Looking to purchase 500+ licenses.", date: "2026-07-03" },
    { id: "msg_3", name: "Selina Kyle", email: "selina@gotham-art.org", subject: "Offline backup options", message: "Really loving the premium templates! Is there a local desktop application or any automatic local storage backup sync besides exporting manual JSON? Thank you!", date: "2026-07-04" },
  ]);

  const [analytics, setAnalytics] = useState<AdminAnalytics>({
    totalUsers: 2405,
    totalResumes: 4892,
    premiumSubscriptions: 852,
    aiQueriesCount: 14205,
    conversionRate: "35.4%",
  });

  const togglePremium = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isPremium: !u.isPremium } : u));
    // Update premium analytics count
    setAnalytics(prev => ({
      ...prev,
      premiumSubscriptions: prev.premiumSubscriptions + (users.find(u => u.id === userId)?.isPremium ? -1 : 1)
    }));
  };

  const deleteUser = (userId: string) => {
    if (confirm("Are you sure you want to remove this user profile permanently?")) {
      setUsers(users.filter(u => u.id !== userId));
      setAnalytics(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    }
  };

  const toggleTemplate = (id: string) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Page Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h1 className="text-3xl font-extrabold font-poppins text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-purple-600 animate-pulse" />
          <span>ResumePro Administrative Suite</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monitor system metrics, coordinate templates, toggle global subscriptions, and dispatch contact inquiries.
        </p>
      </div>

      {/* Admin Nav Row */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800/80 pb-1.5">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors ${
            activeTab === "analytics"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>System Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors ${
            activeTab === "users"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          }`}
        >
          <Users className="h-4 w-4" />
          <span>User Profiles</span>
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors ${
            activeTab === "templates"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          }`}
        >
          <Layout className="h-4 w-4" />
          <span>Template Settings</span>
        </button>

        <button
          onClick={() => setActiveTab("plans")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors ${
            activeTab === "plans"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          }`}
        >
          <Receipt className="h-4 w-4" />
          <span>Premium Plans</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`px-4 py-2 text-sm font-semibold rounded-xl flex items-center space-x-2 transition-colors ${
            activeTab === "messages"
              ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
          }`}
        >
          <Mail className="h-4 w-4" />
          <span>Messages ({messages.length})</span>
        </button>
      </div>

      {/* TAB CONTENT SPACES */}

      {/* 1. ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Global Accounts</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white block font-mono">{analytics.totalUsers}</span>
              <span className="text-xs text-emerald-500 font-medium block mt-1">↑ 12% this week</span>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Resumes Hosted</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white block font-mono">{analytics.totalResumes}</span>
              <span className="text-xs text-emerald-500 font-medium block mt-1">↑ 18% this week</span>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Premium Subs</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white block font-mono">{analytics.premiumSubscriptions}</span>
              <span className="text-xs text-purple-500 font-medium block mt-1">35.4% share ratio</span>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">AI Generation Queries</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white block font-mono">{analytics.aiQueriesCount}</span>
              <span className="text-xs text-blue-500 font-medium block mt-1">Gemini 3.5 Active</span>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Trial-to-Paid Rate</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white block font-mono">{analytics.conversionRate}</span>
              <span className="text-xs text-emerald-500 font-medium block mt-1">↑ 2.4% target met</span>
            </div>
          </div>

          {/* Quick graphical visualization simulation */}
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white">Active Traffic and Generation Metrics</h3>
            <div className="space-y-4">
              {[
                { name: "ATS Compatibility Scan Engine", load: "74%", color: "bg-emerald-500" },
                { name: "Gemini Summary Optimizer API", load: "88%", color: "bg-purple-500" },
                { name: "PDF High Fidelity Export Renderers", load: "45%", color: "bg-blue-500" },
                { name: "Auth Sessions Token Vault", load: "31%", color: "bg-cyan-500" },
              ].map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <span>{metric.name}</span>
                    <span className="font-mono">{metric.load} Capacity</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${metric.color} rounded-full`} style={{ width: metric.load }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. USER PROFILES */}
      {activeTab === "users" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-950 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="p-4 pl-6">Profile Details</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Authorization Role</th>
                  <th className="p-4">Tier Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                {users.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-900/40 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs uppercase">
                          {usr.fullName.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{usr.fullName}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-xs text-gray-500 dark:text-gray-400">{usr.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${usr.role === "admin" ? "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400" : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"}`}>
                        {usr.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => togglePremium(usr.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-bold transition-all ${usr.isPremium ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                      >
                        {usr.isPremium ? (
                          <>
                            <ToggleRight className="h-4.5 w-4.5 text-amber-500" />
                            <span>Premium ★</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="h-4.5 w-4.5 text-slate-400" />
                            <span>Free Account</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => deleteUser(usr.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/25 text-red-500 transition-colors"
                        title="Delete User"
                      >
                        <UserX className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. TEMPLATES */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div key={tpl.id} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${tpl.type === "Premium" ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    {tpl.type}
                  </span>
                  <span className={`h-2.5 w-2.5 rounded-full ${tpl.enabled ? "bg-emerald-500" : "bg-red-400"}`}></span>
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white font-poppins">{tpl.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Comprehensive custom layout specifically aligned with latest recruiting and {tpl.id === "ats-classic" ? "robot parsing models." : "visual design trends."}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800/60">
                <span className="text-xs font-semibold text-gray-500">Global Registry Status</span>
                <button
                  onClick={() => toggleTemplate(tpl.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${tpl.enabled ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400" : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400"}`}
                >
                  {tpl.enabled ? "ACTIVE ENABLED" : "DISABLED"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. PLANS CONFIGURATION */}
      {activeTab === "plans" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Basic Starter Tier</span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">FREE</span>
            </h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="p-4 bg-slate-50 dark:bg-gray-950 rounded-xl space-y-1 border border-slate-100 dark:border-slate-900">
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Plan Description</span>
                <p className="font-semibold">Standard layout rendering with generic templates and local client storage capabilities.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Default Price</label>
                  <input type="text" value="$0.00" readOnly className="w-full bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Templates Unlocked</label>
                  <input type="text" value="4 standard templates" readOnly className="w-full bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-poppins text-gray-900 dark:text-white flex items-center gap-1.5">
              <span>Enterprise Premium Pro</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-500 text-white rounded">★ HOT</span>
            </h3>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="p-4 bg-slate-50 dark:bg-gray-950 rounded-xl space-y-1 border border-slate-100 dark:border-slate-900">
                <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Plan Description</span>
                <p className="font-semibold">Full access to 8 templates, complete Gemini AI cover letters, grammar checking, and smart ATS checks.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Default Monthly</label>
                  <input type="text" defaultValue="$12.00 / month" className="w-full bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Annual Price</label>
                  <input type="text" defaultValue="$96.00 / year" className="w-full bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CONTACT INBOX MESSAGES */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          {messages.length === 0 ? (
            <div className="p-16 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl text-center space-y-2 bg-white">
              <Mail className="h-10 w-10 text-gray-400 mx-auto" />
              <h4 className="text-base font-bold text-gray-800 dark:text-white">Inbox is completely clear!</h4>
              <p className="text-xs text-gray-400">All customer inquiries have been successfully addressed and resolved.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm space-y-3 relative">
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="absolute right-4 top-4 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/25 text-red-400 hover:text-red-600 transition-colors"
                    title="Dismiss message"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>

                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white font-poppins">{msg.subject}</h4>
                      <p className="text-xs text-gray-500">
                        From <span className="font-semibold text-gray-700 dark:text-gray-300">{msg.name}</span> ({msg.email})
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{msg.date}</span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-slate-50 dark:bg-gray-950 p-4 rounded-xl border border-slate-100 dark:border-slate-900/50">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
