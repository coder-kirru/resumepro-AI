import React from "react";
import { ShieldCheck, Sparkles, Download, Layout, Eye, Smartphone, Gift, Award } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: "ATS-Friendly Templates",
      description: "Our layouts are rigorously tested against all major Applicant Tracking Systems (ATS) to ensure your application passes automated keyword screenings seamlessly.",
      badge: "Crucial"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-500" />,
      title: "AI Resume Writing Assistant",
      description: "Generate high-impact summaries, optimize bullet points with active verbs, and receive intelligent recommendations powered by state-of-the-art Gemini AI.",
      badge: "AI Powered"
    },
    {
      icon: <Download className="h-6 w-6 text-blue-500" />,
      title: "One-Click PDF Download",
      description: "Instantly export your resume to high-fidelity, selectable-text PDFs that preserve pixel-perfect typography and layouts across any reader.",
      badge: "Fast"
    },
    {
      icon: <Layout className="h-6 w-6 text-cyan-500" />,
      title: "8 Premium Layout Templates",
      description: "Select from a rich library of pre-designed professional templates including Modern, Minimalist, Corporate, Creative, Elegant, and Executive designs.",
      badge: "8 Styles"
    },
    {
      icon: <Eye className="h-6 w-6 text-pink-500" />,
      title: "Real-time Live Preview",
      description: "Watch your changes take effect instantly side-by-side as you type. Tweak padding, colors, fonts, and vertical margin spacings in real time.",
      badge: "Interactive"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-amber-500" />,
      title: "Fully Mobile Responsive",
      description: "Access and polish your professional credentials on any smartphone, tablet, or desktop with our beautifully unified and flexible UI layouts.",
      badge: "Fluid"
    },
    {
      icon: <Gift className="h-6 w-6 text-indigo-500" />,
      title: "Free & Premium Tiers",
      description: "Get started for free with full access to standard templates, then upgrade to unlocked premium layouts, smart ATS analysis, and deep AI-powered features.",
      badge: "Flexible"
    },
    {
      icon: <Award className="h-6 w-6 text-rose-500" />,
      title: "Smart Layout Sort Ordering",
      description: "Rearrange sections effortlessly using our custom layout re-order panels. Put skills or experience first based on your unique career path.",
      badge: "Smart"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 dark:text-white tracking-tight">
            Designed for Impact.{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Built for Success.
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to craft an extraordinary, stand-out professional resume and secure your dream career path with advanced AI tooling.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/45 hover:bg-white dark:hover:bg-gray-800/80 hover:border-purple-200 dark:hover:border-purple-900/40 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div className="p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-200">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-200/60 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 rounded uppercase tracking-wider">
                    {feat.badge}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white font-poppins">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic callout banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-500/5 border border-purple-100 dark:border-purple-950/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
              Double your callbacks in 10 minutes
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join thousands of students and experienced professionals currently working at Google, Meta, Stripe, and Apple.
            </p>
          </div>
          <div className="flex space-x-4 shrink-0 font-mono text-xs font-bold text-purple-600 dark:text-cyan-400 bg-white dark:bg-gray-950 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <span>✓ No CC required</span>
            <span>✓ Unlimited exports</span>
          </div>
        </div>

      </div>
    </section>
  );
}
