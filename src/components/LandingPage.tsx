import React from "react";
import { motion } from "motion/react";
import { Sparkles, CheckCircle, FileText, ArrowRight, Star, Cpu, Award, Zap, ShieldAlert, Monitor } from "lucide-react";
import { UserProfile } from "../types";

interface LandingPageProps {
  currentUser: UserProfile | null;
  onGetStarted: () => void;
  onOpenTemplates: () => void;
  onOpenAuth: (view?: "login" | "register") => void;
}

export default function LandingPage({
  currentUser,
  onGetStarted,
  onOpenTemplates,
  onOpenAuth,
}: LandingPageProps) {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-gray-950 text-slate-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Immersive background decoration */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[40px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-cyan-400 px-4 py-1.5 rounded-full text-xs font-semibold self-center lg:self-start border border-blue-200/50 dark:border-blue-900/40 shadow-inner"
            >
              <Sparkles className="h-4.5 w-4.5 text-blue-600 dark:text-cyan-400 animate-spin" />
              <span className="tracking-wide uppercase font-mono">Next-Generation Resume Intelligence</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins tracking-tight leading-tight"
            >
              Create a Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                Resume in Minutes
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Leverage the power of the industry's most advanced AI models to generate premium, ATS-friendly resumes optimized for top tech, finance, and creative enterprise positions. Ensure absolute compatibility and double your interview callback rates instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer group"
                id="hero-build-btn"
              >
                <span>Build Resume Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTemplates}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-2xl font-semibold border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                id="hero-templates-btn"
              >
                <FileText className="h-5 w-5 text-purple-600" />
                <span>View 8 Premium Templates</span>
              </button>
            </motion.div>

            {/* Trust badge / reviews */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start space-x-6 pt-6 text-sm text-gray-500 dark:text-gray-400 font-medium"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-[10px] text-white font-bold uppercase">
                    {["M", "J", "A", "S"][i-1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-500 items-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                  <span className="ml-1 text-gray-800 dark:text-gray-200 font-bold">4.9/5</span>
                </div>
                <p className="text-xs">Trusted by 20,000+ professionals worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Right Visual (Interactive Animated Resume Card Showcase) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-[420px] rounded-3xl p-6 glass-panel shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden group"
            >
              {/* Floating tech accents */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-gray-800/80 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex items-center space-x-1 bg-purple-100 dark:bg-purple-950/50 px-2.5 py-1 rounded-full text-[10px] text-purple-700 dark:text-purple-300 font-bold font-mono">
                  <Cpu className="h-3.5 w-3.5 animate-bounce" />
                  <span>ATS SCORE: 98%</span>
                </div>
              </div>

              {/* Resume Preview mockup body */}
              <div className="space-y-4 font-mono text-[11px] text-gray-600 dark:text-gray-400">
                <div className="space-y-1">
                  <div className="h-5 w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md"></div>
                  <div className="h-3.5 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>

                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800/80 pt-3">
                  <div className="h-3 w-1/4 bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold rounded px-1.5 py-0.5 inline-block text-[9px] tracking-wider uppercase">
                    Professional Summary
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-2.5 w-[90%] bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-2.5 w-[85%] bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>

                <div className="space-y-3 border-t border-gray-100 dark:border-gray-800/80 pt-3">
                  <div className="h-3 w-1/4 bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold rounded px-1.5 py-0.5 inline-block text-[9px] tracking-wider uppercase">
                    Work Experience
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <div className="h-3 w-2/5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-2.5 w-1/5 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>
                    <div className="h-2 w-[95%] bg-gray-100 dark:bg-gray-800/50 rounded"></div>
                    <div className="h-2 w-[85%] bg-gray-100 dark:bg-gray-800/50 rounded"></div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-gray-100 dark:border-gray-800/80 pt-3">
                  <div className="h-3 w-1/4 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold rounded px-1.5 py-0.5 inline-block text-[9px] tracking-wider uppercase">
                    Core Competencies
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["TypeScript", "React 19", "System Architecture", "AI Engineering", "Vite"].map((sk) => (
                      <span key={sk} className="text-[9px] bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 px-2 py-0.5 rounded text-gray-500 dark:text-gray-300 font-sans font-medium">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Float micro-badge elements */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -left-6 bottom-16 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-lg flex items-center space-x-2 text-xs font-semibold"
              >
                <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100">ATS Checked</p>
                  <p className="text-[10px] text-gray-400 font-medium">100% compliant</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-6 top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-lg flex items-center space-x-2 text-xs font-semibold"
              >
                <div className="h-6 w-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Zap className="h-4 w-4 animate-bounce" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-gray-100">AI Powered</p>
                  <p className="text-[10px] text-gray-400 font-medium">Auto-write summary</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
