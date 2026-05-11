import { motion } from "motion/react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const pillars = [
  { emoji: "🚫", title: "Never diagnoses", desc: "MindSpace is not a doctor. It never labels or diagnoses any condition." },
  { emoji: "💊", title: "No medication advice", desc: "We never suggest, recommend, or discuss medication of any kind." },
  { emoji: "🆘", title: "Crisis-aware", desc: "Detects distress signals and immediately surfaces real helplines." },
  { emoji: "🔒", title: "Private by default", desc: "Your data is auth-protected and never sold, shared, or used for ads." },
  { emoji: "🧾", title: "Full disclaimer", desc: "Always transparent that MindSpace is an AI companion, not clinical care." },
  { emoji: "❤️", title: "Human-first design", desc: "Every decision is made with your dignity, safety, and wellbeing first." },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-6 bg-[#050510] relative overflow-hidden">
      {/* subtle bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-5">
            Mandatory ethical safeguards
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Safe, ethical, and{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              responsible
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Mental health is serious. We built MindSpace with mandatory ethical safeguards so you can always trust what you're getting.
          </p>
        </motion.div>

        {/* pillars grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/10 hover:border-green-500/20 rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.05]">
              <span className="text-2xl mb-3 block">{p.emoji}</span>
              <h4 className="text-white font-bold text-sm mb-1.5">{p.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* disclaimer banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-violet-950/60 to-pink-950/60 backdrop-blur border border-violet-500/20 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="text-4xl flex-shrink-0">⚠️</div>
          <div>
            <p className="text-white font-bold mb-1">Important disclaimer</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              MindSpace is an AI mental health <strong className="text-slate-300">companion</strong>, not a licensed therapist or medical professional.
              It is designed for <strong className="text-slate-300">non-clinical emotional support only</strong>.
              If you are experiencing a mental health crisis, please contact a qualified mental health professional or a crisis helpline immediately.
            </p>
          </div>
          <a href={`${API_BASE_URL}/auth/google`}
            className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl text-sm hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-300 whitespace-nowrap">
            Start safely ✨
          </a>
        </motion.div>
      </div>
    </section>
  );
}
