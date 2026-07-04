import React, { useState } from "react";
import { X, Mail, Lock, User, Sparkles, Check, Chrome } from "lucide-react";
import { UserProfile } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserProfile) => void;
  initialView?: "login" | "register";
}

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialView = "login"
}: AuthModalProps) {
  const [view, setView] = useState<"login" | "register" | "forgot">(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (view !== "forgot" && !password) {
      setError("Please enter your password.");
      return;
    }

    if (view === "register" && !fullName) {
      setError("Please enter your full name.");
      return;
    }

    // Simulate successful authenticator flow
    if (view === "forgot") {
      setSuccessMsg("Password reset link has been dispatched to your email address!");
      return;
    }

    const mockUser: UserProfile = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email: email,
      fullName: view === "register" ? fullName : email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      role: email.toLowerCase() === "admin@resumepro.ai" || email.toLowerCase().startsWith("admin") ? "admin" : "user",
      isPremium: email.toLowerCase().includes("premium") || email.toLowerCase() === "kirruswork@gmail.com",
    };

    onAuthSuccess(mockUser);
    onClose();
  };

  const handleGoogleLogin = () => {
    // Simulate premium account for the developer/user
    const mockUser: UserProfile = {
      id: "usr_google_123",
      email: "kirruswork@gmail.com",
      fullName: "Alex Mercer",
      role: "admin",
      isPremium: true
    };
    onAuthSuccess(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 relative transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
        id="auth-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          id="auth-close-btn"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          {/* Header branding */}
          <div className="text-center space-y-2 mb-8">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white">
              {view === "login" && "Welcome Back"}
              {view === "register" && "Create Free Account"}
              {view === "forgot" && "Reset Password"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {view === "login" && "Enter your credentials to manage your resumes"}
              {view === "register" && "Build ATS-friendly resumes in minutes"}
              {view === "forgot" && "Enter your email to receive recovery instructions"}
            </p>
          </div>

          {/* Social login option */}
          {view !== "forgot" && (
            <div className="space-y-4 mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors font-medium text-sm flex items-center justify-center space-x-2.5 shadow-sm"
                id="google-login-btn"
              >
                <Chrome className="h-4.5 w-4.5 text-red-500" />
                <span>Continue with Google</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400 dark:text-gray-500 uppercase font-mono tracking-wider">
                  or use corporate email
                </span>
                <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
              </div>
            </div>
          )}

          {/* Core Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-600 dark:text-red-400 font-medium">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {successMsg}
              </div>
            )}

            {view === "register" && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>
            </div>

            {view !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Password</label>
                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs text-purple-600 hover:text-purple-500 font-semibold"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-purple-500/20 hover:shadow-purple-500/35 active:scale-[0.98]"
              id="auth-submit-btn"
            >
              {view === "login" && "Sign In"}
              {view === "register" && "Create Free Account"}
              {view === "forgot" && "Send Reset Link"}
            </button>
          </form>

          {/* Toggle View Links */}
          <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
            {view === "login" && (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="text-purple-600 hover:text-purple-500 font-semibold"
                  id="toggle-register-btn"
                >
                  Sign Up Free
                </button>
              </p>
            )}
            {view === "register" && (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="text-purple-600 hover:text-purple-500 font-semibold"
                  id="toggle-login-btn"
                >
                  Sign In
                </button>
              </p>
            )}
            {view === "forgot" && (
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-purple-600 hover:text-purple-500 font-semibold"
              >
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
