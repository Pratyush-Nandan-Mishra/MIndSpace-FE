import { motion } from "motion/react";

const features = [
  {
    emoji: "💬",
    color: "from-violet-600 to-purple-600",
    glow: "shadow-violet-500/20",
    border: "hover:border-violet-500/40",
    tag: "Core Feature",
    title: "Conversational Support",
    desc: "Always-available emotional support for stress, anxiety, burnout, loneliness, and low mood — like a caring friend who never gets tired of listening.",
  },
  {
    emoji: "🔍",
    color: "from-amber-500 to-orange-500",
    glow: "shadow-amber-500/20",
    border: "hover:border-amber-500/40",
    tag: "Smart Detection",
    title: "Stress Detection",
    desc: "MindSpace automatically recognises stress and distress signals in your words and responds with extra gentleness, grounding techniques, and care.",
  },
  {
    emoji: "🆘",
    color: "from-pink-600 to-rose-500",
    glow: "shadow-pink-500/20",
    border: "hover:border-pink-500/40",
    tag: "Crisis Support",
    title: "Resource Suggestions",
    desc: "When you need more than a conversation, MindSpace connects you with real counselors and verified helplines — iCall, Vandrevala, NIMHANS, and more.",
  },
  {
    emoji: "🛡️",
    color: "from-cyan-600 to-teal-500",
    glow: "shadow-cyan-500/20",
    border: "hover:border-cyan-500/40",
    tag: "Ethical Safeguard",
    title: "Safe Responses Only",
    desc: "Every response is non-clinical, empathetic, and carefully scoped. MindSpace never diagnoses, never prescribes, and never gives harmful advice.",
  },
  {
    emoji: "⚖️",
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
    border: "hover:border-indigo-500/40",
    tag: "Mandatory Safeguard",
    title: "Ethical by Design",
    desc: "No medical advice. No manipulation. No judgment. MindSpace is built from the ground up with your safety and dignity as the #1 priority.",
  },
  {
    emoji: "🔒",
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/20",
    border: "hover:border-green-500/40",
    tag: "Privacy Protection",
    title: "100% Private",
    desc: "Your conversations are yours alone. Auth-protected, stored securely, never sold or shared. Crisis messages are never saved to long-term memory.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 px-6 bg-[#060612]">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-sm font-medium mb-5">
            What MindSpace offers
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Built around{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              your safety
            </span>
            {" "}and wellbeing
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Every feature exists to make you feel heard, safe, and supported — with ethical safeguards built in from day one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group bg-white/[0.03] backdrop-blur border border-white/10 ${f.border} rounded-2xl p-7 cursor-default transition-all duration-300 hover:bg-white/[0.06] hover:shadow-xl ${f.glow}`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg ${f.glow}`}>
                  {f.emoji}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400`}>
                  {f.tag}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
