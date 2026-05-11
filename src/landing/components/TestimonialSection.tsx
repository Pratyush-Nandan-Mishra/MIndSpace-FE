import { useRef } from "react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote: "I used to spiral at 2am with no one to talk to. MindSpace was just there — calm, kind, and it actually helped me breathe again.",
    author: "Priya S.",
    role: "University student, Mumbai",
    avatar: "PS",
    color: "from-violet-500 to-purple-600",
    stars: 5,
  },
  {
    quote: "I was skeptical about talking to an AI about my anxiety. But MindSpace never made me feel judged — it just listened, every single time.",
    author: "Rahul M.",
    role: "Software engineer, Bangalore",
    avatar: "RM",
    color: "from-pink-500 to-rose-500",
    stars: 5,
  },
  {
    quote: "After my breakup I didn't want to burden my friends. MindSpace was the safe space I needed to process everything.",
    author: "Ananya K.",
    role: "Graphic designer, Delhi",
    avatar: "AK",
    color: "from-cyan-500 to-teal-500",
    stars: 5,
  },
  {
    quote: "What surprised me most is how it remembers things I've shared before. It actually feels like it knows me over time.",
    author: "Vikram T.",
    role: "School teacher, Pune",
    avatar: "VT",
    color: "from-amber-500 to-orange-500",
    stars: 5,
  },
  {
    quote: "Therapy is expensive and hard to schedule. MindSpace fills that gap beautifully — it's not a replacement, but it genuinely helps.",
    author: "Meera D.",
    role: "Nurse, Chennai",
    avatar: "MD",
    color: "from-green-500 to-emerald-500",
    stars: 5,
  },
  {
    quote: "I was going through burnout and didn't even realise it. Talking to MindSpace helped me see what was happening clearly.",
    author: "Arjun P.",
    role: "Product manager, Hyderabad",
    avatar: "AP",
    color: "from-indigo-500 to-violet-500",
    stars: 5,
  },
  {
    quote: "It noticed I kept mentioning sleep issues and gently suggested I might need rest. Such a small thing but it felt incredibly seen.",
    author: "Divya R.",
    role: "Marketing lead, Kolkata",
    avatar: "DR",
    color: "from-fuchsia-500 to-pink-500",
    stars: 5,
  },
  {
    quote: "Honestly I was just venting and didn't expect much. MindSpace gave me a completely new perspective on my relationship stress.",
    author: "Karan N.",
    role: "Freelance photographer, Jaipur",
    avatar: "KN",
    color: "from-sky-500 to-cyan-500",
    stars: 5,
  },
];

const doubled = [...testimonials, ...testimonials];

const Card = ({ quote, author, role, avatar, color, stars }: typeof testimonials[0]) => (
  <div className="flex-shrink-0 w-80 bg-white/[0.04] backdrop-blur border border-white/10 rounded-2xl p-6 mx-3 hover:border-violet-500/30 hover:bg-white/[0.07] transition-all duration-300 cursor-default">
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: stars }).map((_, i) => (
        <span key={i} className="text-amber-400 text-xs">★</span>
      ))}
    </div>
    <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">
      "{quote}"
    </p>
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
        {avatar}
      </div>
      <div>
        <p className="text-white font-bold text-sm">{author}</p>
        <p className="text-slate-500 text-xs">{role}</p>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 bg-[#050510] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 text-sm font-medium mb-5">
            What people say
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5">
            Real people.{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Real relief.
            </span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            People just like you found a little more peace with MindSpace by their side.
          </p>
        </motion.div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none" />

        <motion.div
          ref={trackRef}
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }}
          style={{ width: "max-content" }}
        >
          {doubled.map((t, i) => (
            <Card key={i} {...t} />
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-10">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${i < 3 ? "w-6 h-1.5 bg-violet-500" : "w-1.5 h-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
