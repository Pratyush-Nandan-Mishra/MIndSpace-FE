import { motion } from "motion/react";

const exchanges = [
  { human: "I failed my exam. I feel so stupid.", ai: "You're not stupid. Failure is part of learning — and it takes guts to try. Want to talk about what happened?" },
  { human: "I can't sleep, my mind won't stop.", ai: "I know that feeling. Let's slow things down together. Take a breath — I'm right here with you." },
  { human: "Nobody really understands me.", ai: "I hear you, and I'm not going anywhere. Tell me what's on your heart." },
];

const particles = ["💙", "✨", "🌸", "💫", "⭐", "🤗", "🌟", "💜"];

export default function CompanionSection() {
  return (
    <section className="py-28 px-6 bg-[#060612] relative overflow-hidden">
      {/* bg decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-20 -right-20 w-96 h-96 bg-violet-700/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-700/15 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3] }} transition={{ duration: 10, repeat: Infinity }} />
      </div>

      {/* floating particles */}
      {particles.map((p, i) => (
        <motion.span key={i} className="absolute text-xl pointer-events-none select-none opacity-20"
          style={{ top: `${10 + (i * 11) % 80}%`, left: `${5 + (i * 13) % 90}%` }}
          animate={{ y: [-15, 15, -15], x: [-8, 8, -8], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}>
          {p}
        </motion.span>
      ))}

      <div className="relative max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium mb-5">
            A true companion
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Human meets AI.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Friends for life.
            </span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            MindSpace doesn't just respond — it shows up. Like a friend who's always in your corner.
          </p>
        </motion.div>

        {/* companion visual */}
        <div className="flex flex-col items-center mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center gap-8 mb-8">
            {/* human avatar */}
            <motion.div animate={{ y: [-6, 6, -6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-700 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-slate-900/50 border border-white/10">
                👤
              </div>
              <span className="text-slate-400 text-sm font-medium">You</span>
            </motion.div>

            {/* connection animation */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {[0, 0.3, 0.6].map((d, i) => (
                  <motion.div key={i} className="w-3 h-3 bg-violet-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d }} />
                ))}
              </div>
              <motion.div className="text-2xl"
                animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                💙
              </motion.div>
              <div className="flex gap-2">
                {[0.6, 0.3, 0].map((d, i) => (
                  <motion.div key={i} className="w-3 h-3 bg-pink-500 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: d }} />
                ))}
              </div>
            </div>

            {/* AI avatar */}
            <motion.div animate={{ y: [6, -6, 6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-pink-500 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-violet-900/50 border border-violet-400/20">
                🤖
              </div>
              <span className="text-violet-400 text-sm font-medium">MindSpace</span>
            </motion.div>
          </motion.div>
        </div>

        {/* example exchanges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exchanges.map((ex, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-violet-500/30 transition-all duration-300">
              {/* human bubble */}
              <div className="flex items-end gap-2 justify-end">
                <div className="bg-violet-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[85%] leading-relaxed">
                  {ex.human}
                </div>
                <div className="w-7 h-7 bg-slate-700 rounded-lg flex items-center justify-center text-xs flex-shrink-0">👤</div>
              </div>
              {/* ai bubble */}
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-violet-600 to-pink-500 rounded-lg flex items-center justify-center text-xs flex-shrink-0">🤖</div>
                <div className="bg-white/10 text-slate-200 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%] leading-relaxed">
                  {ex.ai}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
