import { motion } from "motion/react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const steps = [
  {
    number: "01",
    emoji: "👋",
    color: "from-violet-600 to-purple-500",
    glow: "shadow-violet-500/30",
    title: "Say hello",
    desc: "Open MindSpace and start talking. No sign-up form, no questionnaire — just a warm hello.",
  },
  {
    number: "02",
    emoji: "💬",
    color: "from-pink-600 to-rose-500",
    glow: "shadow-pink-500/30",
    title: "Share freely",
    desc: "Talk about whatever's on your mind. Stress, anxiety, loneliness, or just a rough day — everything is welcome.",
  },
  {
    number: "03",
    emoji: "💙",
    color: "from-cyan-600 to-teal-500",
    glow: "shadow-cyan-500/30",
    title: "Feel heard",
    desc: "MindSpace listens, reflects, and responds with genuine empathy. No scripts, no canned responses.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-[#050510] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-800/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium mb-5">
            Simple to start
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Three steps to feeling{" "}
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              better
            </span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            No onboarding maze. No complicated setup. Just open, talk, and feel supported.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-violet-600/0 via-violet-500/40 to-cyan-500/0 pointer-events-none" />

          {steps.map((step, i) => (
            <motion.div key={step.number}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center">
              {/* circle */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
                transition={{ duration: 0.4 }}
                className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex flex-col items-center justify-center mx-auto mb-7 shadow-xl ${step.glow} cursor-default`}>
                <span className="text-3xl">{step.emoji}</span>
                <span className="text-white/60 text-xs font-bold mt-1">{step.number}</span>
              </motion.div>

              <h3 className="text-white font-black text-2xl mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center">
          <a href={`${API_BASE_URL}/auth/google`}
            className="inline-block px-10 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-2xl text-lg hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300">
            Start your journey now ✨
          </a>
        </motion.div>
      </div>
    </section>
  );
}
