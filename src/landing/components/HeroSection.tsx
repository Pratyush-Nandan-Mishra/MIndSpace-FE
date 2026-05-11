import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

const messages = [
  { id: 0, from: "human", text: "I've been really stressed and I don't know why..." },
  { id: 1, from: "ai",    text: "That feeling is valid. I'm here with you 💙" },
  { id: 2, from: "human", text: "It just helps knowing someone's listening" },
  { id: 3, from: "ai",    text: "Always. You're never alone in this ✨" },
];

const floaters = [
  { emoji: "💙", top: "8%",  left: "-5%"  },
  { emoji: "✨", top: "75%", left: "-8%"  },
  { emoji: "🌸", top: "15%", left: "108%" },
  { emoji: "💫", top: "80%", left: "106%" },
  { emoji: "🤗", top: "48%", left: "112%" },
];

export default function HeroSection() {
  const [shown, setShown] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      let i = 0;
      const step = () => {
        if (cancelled) return;
        if (i < messages.length) {
          setShown((prev) => [...prev, i++]);
          setTimeout(step, 1400);
        } else {
          setTimeout(() => {
            if (!cancelled) { setShown([]); i = 0; setTimeout(step, 600); }
          }, 3200);
        }
      };
      setTimeout(step, 900);
    };
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-[#050510] pt-24 pb-16 overflow-hidden flex items-center">
      {/* Animated bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-24 left-1/4 w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-16 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.4, 0.25, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl"
          animate={{ x: [-60, 60, -60], y: [-40, 40, -40] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left — copy */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            Your mental health companion
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-6">
            You deserve
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              someone who
            </span>
            <br />
            truly listens
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
            MindSpace is your always-available AI companion for stress, anxiety, and emotional support — because no one should face hard days alone.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4">
            <a href={`${API_BASE_URL}/auth/google`}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-2xl text-lg hover:shadow-2xl hover:shadow-violet-500/40 hover:scale-105 transition-all duration-300 text-center">
              Start for free ✨
            </a>
            <a href="#how-it-works"
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-2xl text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-center">
              See how it works →
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-6 text-slate-400 text-sm">
            {["💙 Completely free", "🔒 100% private", "⚡ Available 24/7"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </motion.div>
        </div>

        {/* Right — animated chat card */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="relative">
          {/* floating emojis */}
          {floaters.map((f, i) => (
            <motion.span key={i} className="absolute text-2xl pointer-events-none select-none z-20"
              style={{ top: f.top, left: f.left }}
              animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
              transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
              {f.emoji}
            </motion.span>
          ))}

          {/* card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-violet-900/30">
            {/* header */}
            <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow shadow-violet-500/30">
                🧠
              </div>
              <div>
                <p className="text-white font-bold text-sm">MindSpace</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-medium">online now</span>
                </div>
              </div>
            </div>

            {/* messages */}
            <div className="space-y-3 min-h-[220px] flex flex-col justify-end">
              <AnimatePresence initial={false}>
                {messages.filter((_, i) => shown.includes(i)).map((msg) => (
                  <motion.div key={`${msg.id}-${shown.length}`}
                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex items-end gap-2 ${msg.from === "human" ? "justify-end" : "justify-start"}`}>
                    {msg.from === "ai" && (
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-sm flex-shrink-0">🤖</div>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[78%] leading-relaxed ${
                      msg.from === "human"
                        ? "bg-violet-600 text-white rounded-br-sm"
                        : "bg-white/10 text-slate-200 rounded-bl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.from === "human" && (
                      <div className="w-8 h-8 bg-slate-700 rounded-xl flex items-center justify-center text-sm flex-shrink-0">👤</div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* typing dots */}
              {shown.length > 0 && shown.length < messages.length && messages[shown.length].from === "ai" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-sm">🤖</div>
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full"
                        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: d }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* bottom badge */}
          <motion.div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <span className="bg-gradient-to-r from-violet-900/80 to-pink-900/80 backdrop-blur-sm border border-violet-500/30 rounded-full px-5 py-2 text-sm text-violet-300">
              💙 Real conversations, real support
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050510] to-transparent pointer-events-none" />
    </section>
  );
}
