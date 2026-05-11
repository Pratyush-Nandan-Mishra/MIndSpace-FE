import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from '../../context/AuthContext';
import {
  AudioOutlined, AudioMutedOutlined, CopyOutlined, SoundOutlined,
  MenuOutlined, StopOutlined, SendOutlined, CloseOutlined,
  PhoneOutlined, ClockCircleOutlined, EnvironmentOutlined, UserOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import ReactMarkdown from "react-markdown";
import Sidebar from '../../components/Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

// ─── Dummy professionals ─────────────────────────────────────────────────────
const PROFESSIONALS = [
  {
    name: "Dr. Kavya Sharma",
    title: "Clinical Psychologist",
    speciality: "Anxiety & Depression",
    city: "Mumbai",
    available: "Mon – Fri, 10 AM – 6 PM",
    phone: "+91 98201 44567",
    exp: "9 yrs",
    color: "from-violet-500 to-purple-600",
    bg: "#4c1d95",
    initials: "KS",
    tag: "Most booked",
    tagColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    name: "Dr. Arjun Mehta",
    title: "Counselling Psychologist",
    speciality: "Stress & Burnout",
    city: "New Delhi",
    available: "Tue – Sat, 11 AM – 7 PM",
    phone: "+91 98111 76543",
    exp: "7 yrs",
    color: "from-cyan-500 to-teal-600",
    bg: "#134e4a",
    initials: "AM",
    tag: "Online available",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    name: "Dr. Priya Nair",
    title: "Child & Adolescent Psychologist",
    speciality: "Trauma & Grief",
    city: "Bangalore",
    available: "Mon – Thu, 9 AM – 5 PM",
    phone: "+91 80561 23456",
    exp: "12 yrs",
    color: "from-pink-500 to-rose-500",
    bg: "#881337",
    initials: "PN",
    tag: "Top rated",
    tagColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  {
    name: "Dr. Rohan Verma",
    title: "CBT Specialist",
    speciality: "OCD & Phobias",
    city: "Pune",
    available: "Wed – Sun, 2 PM – 8 PM",
    phone: "+91 95522 87654",
    exp: "6 yrs",
    color: "from-amber-500 to-orange-500",
    bg: "#78350f",
    initials: "RV",
    tag: "Evening slots",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    name: "Dr. Sneha Iyer",
    title: "Trauma & Grief Counsellor",
    speciality: "Relationship & Family",
    city: "Chennai",
    available: "Mon – Fri, 9 AM – 3 PM",
    phone: "+91 94441 23789",
    exp: "10 yrs",
    color: "from-green-500 to-emerald-500",
    bg: "#14532d",
    initials: "SI",
    tag: "In-person & online",
    tagColor: "bg-green-500/20 text-green-300 border-green-500/30",
  },
  {
    name: "Dr. Aditya Kapoor",
    title: "Psychiatrist – Counselling",
    speciality: "Mood Disorders & PTSD",
    city: "Hyderabad",
    available: "Mon – Sat, 10 AM – 4 PM",
    phone: "+91 96304 56789",
    exp: "15 yrs",
    color: "from-indigo-500 to-violet-600",
    bg: "#1e1b4b",
    initials: "AK",
    tag: "Senior specialist",
    tagColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  },
];

// ─── Mock Web-Call Modal ──────────────────────────────────────────────────────
const CallModal = ({ professional: p, onClose }) => {
  const [phase, setPhase] = useState("calling"); // "calling" | "connected"
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPhase("connected"), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "connected") return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center"
      style={{ background: "rgba(5,5,16,0.97)" }}
    >
      {/* ambient color wash from professional's palette */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${p.bg} 0%, transparent 70%)` }}
      />

      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex flex-col items-center gap-7 text-center px-10 py-14 w-full max-w-sm"
      >
        {/* Pulsing rings while calling */}
        {phase === "calling" && (
          <>
            {[1.6, 1.35, 1.12].map((scale, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full bg-gradient-to-br ${p.color}`}
                style={{ width: 128, height: 128 }}
                animate={{ scale: [1, scale, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </>
        )}

        {/* Connected glow */}
        {phase === "connected" && (
          <motion.div
            className={`absolute rounded-full bg-gradient-to-br ${p.color} blur-2xl`}
            style={{ width: 180, height: 180, opacity: 0.25 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Avatar */}
        <motion.div
          className={`relative w-32 h-32 bg-gradient-to-br ${p.color} rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl z-10 border-4 border-white/10`}
          animate={phase === "connected" ? { boxShadow: ["0 0 0 0 rgba(139,92,246,0.4)", "0 0 0 18px rgba(139,92,246,0)", "0 0 0 0 rgba(139,92,246,0.4)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {p.initials}
        </motion.div>

        {/* Name & title */}
        <div className="z-10">
          <h2 className="text-2xl font-black text-white mb-1">{p.name}</h2>
          <p className="text-slate-400 text-sm">{p.title}</p>
          <p className="text-slate-500 text-xs mt-0.5">{p.city}</p>
        </div>

        {/* Status */}
        <div className="z-10 h-6">
          {phase === "calling" ? (
            <motion.p
              className="text-slate-400 text-sm tracking-wide"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              Calling…
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 text-sm font-bold tracking-wider"
            >
              {fmt(seconds)}
            </motion.p>
          )}
        </div>

        {/* Call controls */}
        <div className="flex items-center gap-6 z-10 mt-2">
          {/* Mute */}
          <button
            onClick={() => setMuted(m => !m)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 text-white ${
              muted
                ? "bg-red-500/30 border border-red-500/50 text-red-300"
                : "bg-white/10 border border-white/15 hover:bg-white/20"
            }`}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted
              ? <AudioMutedOutlined style={{ fontSize: 20 }} />
              : <AudioOutlined style={{ fontSize: 20 }} />
            }
          </button>

          {/* End call */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-18 h-18 w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 transition-all duration-200"
            title="End call"
          >
            <span className="text-white text-2xl" style={{ transform: "rotate(135deg)", display: "block" }}>
              <PhoneOutlined style={{ fontSize: 26 }} />
            </span>
          </motion.button>

          {/* Speaker */}
          <button
            onClick={() => setSpeakerOn(s => !s)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 text-white ${
              !speakerOn
                ? "bg-red-500/30 border border-red-500/50 text-red-300"
                : "bg-white/10 border border-white/15 hover:bg-white/20"
            }`}
            title={speakerOn ? "Speaker on" : "Speaker off"}
          >
            {speakerOn
              ? <CustomerServiceOutlined style={{ fontSize: 20 }} />
              : <SoundOutlined style={{ fontSize: 20 }} />
            }
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-slate-600 text-xs z-10 max-w-xs leading-relaxed">
          This is a simulated call UI. For real consultations, contact the professional directly.
        </p>
      </motion.div>
    </motion.div>
  );
};

// ─── Professionals List Modal ─────────────────────────────────────────────────
const ProfessionalsModal = ({ onClose, onCall }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#0d0d1f] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl shadow-violet-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🩺</span>
              <h2 className="text-xl font-black text-white">Find a Professional</h2>
            </div>
            <p className="text-slate-400 text-sm">
              Verified mental health professionals available for consultation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all duration-200 flex-shrink-0 ml-4 mt-0.5"
          >
            <CloseOutlined style={{ fontSize: 14 }} />
          </button>
        </div>

        {/* Cards */}
        <div className="overflow-y-auto max-h-[calc(85vh-130px)] p-6 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {PROFESSIONALS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              className="bg-white/[0.03] border border-white/8 hover:border-white/20 rounded-2xl p-5 flex gap-4 group transition-all duration-200 hover:bg-white/[0.06]"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${p.color} rounded-2xl flex items-center justify-center text-white font-black text-base flex-shrink-0 shadow-lg`}>
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-white font-bold text-base">{p.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>
                <p className="text-violet-300 text-sm font-medium mb-0.5">{p.title}</p>
                <p className="text-slate-500 text-xs mb-3">{p.speciality} · {p.exp} experience</p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><EnvironmentOutlined style={{ fontSize: 11 }} />{p.city}</span>
                  <span className="flex items-center gap-1.5"><ClockCircleOutlined style={{ fontSize: 11 }} />{p.available}</span>
                  <span className="flex items-center gap-1.5"><PhoneOutlined style={{ fontSize: 11 }} />{p.phone}</span>
                </div>
              </div>
              <div className="flex-shrink-0 self-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { onClose(); onCall(p); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200 whitespace-nowrap"
                >
                  <PhoneOutlined style={{ fontSize: 11 }} />
                  Contact
                </motion.button>
              </div>
            </motion.div>
          ))}

          <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl px-5 py-4 mt-2">
            <p className="text-amber-300 text-xs leading-relaxed">
              <strong>Disclaimer:</strong> MindSpace does not endorse or partner with any of the professionals listed. These are example listings for reference only. Always verify credentials before booking.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ─── Chat sub-components ──────────────────────────────────────────────────────
const ChatMessage = ({ role, text, onCopy, onSpeak, avatar }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={`flex items-end gap-2.5 ${role === "user" ? "justify-end" : "justify-start"}`}
  >
    {role === "assistant" && (
      <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow shadow-violet-500/30">
        🧠
      </div>
    )}
    <div
      className={`px-4 py-3 rounded-2xl max-w-[75%] ${
        role === "user"
          ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-br-sm shadow-lg shadow-violet-900/30"
          : "bg-white/5 backdrop-blur border border-white/10 text-slate-200 rounded-bl-sm"
      }`}
      style={{ wordBreak: "break-word" }}
    >
      <div className="prose prose-invert prose-sm max-w-none leading-relaxed">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
      {role === "assistant" && (
        <div className="flex gap-1.5 mt-2.5 pt-2 border-t border-white/10">
          <button onClick={() => onCopy(text)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-200" title="Copy">
            <CopyOutlined style={{ fontSize: 12 }} />
          </button>
          <button onClick={() => onSpeak(text)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-200" title="Read aloud">
            <SoundOutlined style={{ fontSize: 12 }} />
          </button>
        </div>
      )}
    </div>
    {role === "user" && (
      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center text-sm flex-shrink-0 border border-white/10">
        {avatar ? <img src={avatar} alt="you" className="w-full h-full rounded-xl object-cover" /> : "👤"}
      </div>
    )}
  </motion.div>
);

const TypingDots = () => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2.5">
    <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow shadow-violet-500/30">
      🧠
    </div>
    <div className="bg-white/5 backdrop-blur border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div key={i} className="w-1.5 h-1.5 bg-violet-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.4, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay, ease: "easeInOut" }} />
      ))}
    </div>
  </motion.div>
);

const QUICK_REPLIES = [
  "I'm feeling anxious 😰",
  "I need to vent 💬",
  "I'm stressed about work 😓",
  "I just feel empty 😶",
  "I can't sleep 🌙",
];

const WelcomeScreen = ({ onSend, onFindProfessional }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center justify-center h-full text-center px-8 gap-6">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-20 h-20 bg-gradient-to-br from-violet-600 to-pink-500 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-violet-900/50">
      🧠
    </motion.div>
    <div>
      <h2 className="text-2xl font-black text-white mb-2">How are you feeling today?</h2>
      <p className="text-slate-400 max-w-sm leading-relaxed">
        I'm here to listen, without judgment. Share what's on your mind — big or small.
      </p>
    </div>

    {/* Clickable quick replies */}
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {QUICK_REPLIES.map(s => (
        <motion.button
          key={s}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSend(s)}
          className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white rounded-full text-sm text-slate-400 transition-all duration-200 cursor-pointer"
        >
          {s}
        </motion.button>
      ))}
    </div>

    <button
      onClick={onFindProfessional}
      className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-violet-500/40 hover:bg-white/10 rounded-2xl text-slate-300 hover:text-white text-sm font-medium transition-all duration-200"
    >
      🩺 Need to speak to a real professional?
    </button>
  </motion.div>
);

// ─── Main ChatBox ─────────────────────────────────────────────────────────────
const ChatBox = ({ onMicClick }) => {
  const { user: authUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showProfessionals, setShowProfessionals] = useState(false);
  const [callingPro, setCallingPro] = useState(null);

  const conversationIdRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const abortControllerRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const setActiveConversation = (id) => {
    conversationIdRef.current = id;
    setCurrentChatId(id);
  };

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/conversations`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setChats(data.conversations.map(c => ({ id: c.id, title: c.title, lastMessage: c.lastMessage })));
      }
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
    }
  };

  useEffect(() => { fetchConversations(); inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typingText]);

  const stopGeneration = () => {
    abortControllerRef.current?.abort();
    if (typingIntervalRef.current) { clearInterval(typingIntervalRef.current); typingIntervalRef.current = null; }
    if (typingText) { setMessages(p => [...p, { role: "assistant", text: typingText }]); setTypingText(""); }
    setLoading(false);
  };

  const typeReply = (fullText) => {
    let i = 0;
    setTypingText("");
    typingIntervalRef.current = setInterval(() => {
      setTypingText(p => p + fullText[i]);
      i++;
      if (i >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages(p => [...p, { role: "assistant", text: fullText }]);
        setTypingText("");
      }
    }, 12);
  };

  // Accepts optional text override for quick-reply chips
  const sendMessage = async (textOverride) => {
    const text = typeof textOverride === "string" ? textOverride : input;
    if (loading) { stopGeneration(); return; }
    if (!text.trim() || isRateLimited) return;

    setMessages(p => [...p, { role: "user", text }]);
    setInput("");
    setTimeout(() => requestAnimationFrame(() => inputRef.current?.focus()), 0);

    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch(`${API_BASE_URL}/chat/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text, conversationId: conversationIdRef.current }),
        signal: abortControllerRef.current.signal,
      });

      if (res.status === 429) {
        const data = await res.json();
        setMessages(p => [...p, { role: "assistant", text: data.botResponse || "You've reached the message limit." }]);
        setIsRateLimited(true);
      } else {
        const data = await res.json();
        if (data.reply) {
          if (data.conversationId && !conversationIdRef.current) {
            setActiveConversation(data.conversationId);
            await fetchConversations();
          }
          typeReply(data.reply);
        } else {
          setMessages(p => [...p, { role: "assistant", text: "Sorry, I couldn't get a response." }]);
        }
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setMessages(p => [...p, { role: "assistant", text: "Error connecting to chat server." }]);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCopy = async (text) => { try { await navigator.clipboard.writeText(text); } catch { } };
  const handleSpeak = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9; u.pitch = 1; u.volume = 1;
      window.speechSynthesis.speak(u);
    }
  };

  const handleNewChat = () => { setActiveConversation(null); setMessages([]); };
  const handleSelectChat = async (chatId) => {
    if (chatId === conversationIdRef.current) return;
    setActiveConversation(chatId);
    try {
      const res = await fetch(`${API_BASE_URL}/chat/conversation/${chatId}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.conversation.messages.map(m => ({ role: m.role, text: m.content })));
      }
    } catch { }
  };
  const handleDeleteChat = async (chatId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/conversation/${chatId}`, { method: "DELETE", credentials: "include" });
      if (res.ok) { if (conversationIdRef.current === chatId) handleNewChat(); await fetchConversations(); }
    } catch { }
  };

  const showWelcome = messages.length === 0 && !loading && !typingText;

  return (
    <div className="flex h-screen bg-[#050510] overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div className="absolute top-0 left-1/3 w-96 h-96 bg-violet-800/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-800/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showProfessionals && (
          <ProfessionalsModal
            onClose={() => setShowProfessionals(false)}
            onCall={(pro) => setCallingPro(pro)}
          />
        )}
        {callingPro && (
          <CallModal professional={callingPro} onClose={() => setCallingPro(null)} />
        )}
      </AnimatePresence>

      {/* Sidebar toggle */}
      {!sidebarOpen && (
        <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-30 p-2.5 bg-white/5 backdrop-blur border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 shadow-lg">
          <MenuOutlined style={{ fontSize: 16 }} />
        </motion.button>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearHistory={async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/chat/conversations/clear`, { method: "DELETE", credentials: "include" });
            if (res.ok) { handleNewChat(); await fetchConversations(); return true; }
            return false;
          } catch { return false; }
        }}
      />

      {/* Main area */}
      <div className="relative z-10 flex flex-col flex-1 h-screen overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-base shadow shadow-violet-500/30">
            🧠
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">MindSpace</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs">here for you</span>
            </div>
          </div>

          <motion.button
            onClick={() => setShowProfessionals(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/10 rounded-xl text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200"
          >
            <UserOutlined style={{ fontSize: 13 }} />
            Find a Professional
          </motion.button>

          {authUser?.role === "admin" && (
            <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full font-bold ml-2">
              ADMIN
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {showWelcome ? (
            <WelcomeScreen onSend={sendMessage} onFindProfessional={() => setShowProfessionals(true)} />
          ) : (
            <>
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <ChatMessage key={i} {...m} onCopy={handleCopy} onSpeak={handleSpeak} avatar={authUser?.picture} />
                ))}
              </AnimatePresence>
              {loading && !typingText && <TypingDots />}
              {typingText && <ChatMessage role="assistant" text={typingText} onCopy={handleCopy} onSpeak={handleSpeak} />}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/20 backdrop-blur">
          {isRateLimited && (
            <div className="mb-3 text-center text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2">
              You've reached the message limit. Upgrade to continue.
            </div>
          )}
          <div className="flex items-end gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-4 py-3 focus-within:border-violet-500/50 focus-within:bg-white/[0.07] transition-all duration-200">
            <textarea
              ref={inputRef}
              value={input}
              rows={1}
              className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm resize-none focus:outline-none leading-relaxed max-h-32"
              placeholder={isRateLimited ? "Upgrade to continue…" : "Share what's on your mind…"}
              onChange={(e) => {
                if (!isRateLimited) {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }
              }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !isRateLimited) { e.preventDefault(); sendMessage(); } }}
              disabled={isRateLimited}
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={onMicClick} disabled={isRateLimited}
                className="p-2 text-slate-500 hover:text-violet-400 hover:bg-white/10 rounded-xl transition-all duration-200" title="Voice input">
                <AudioOutlined style={{ fontSize: 16 }} />
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={isRateLimited}
                className={`px-4 py-2 rounded-xl text-white font-semibold text-sm flex items-center gap-1.5 transition-all duration-200 ${
                  loading
                    ? "bg-red-500/80 hover:bg-red-500"
                    : "bg-gradient-to-r from-violet-600 to-pink-500 hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105"
                }`}
                title={loading ? "Stop" : "Send"}
              >
                {loading ? <><StopOutlined style={{ fontSize: 12 }} /> Stop</> : <><SendOutlined style={{ fontSize: 12 }} /> Send</>}
              </button>
            </div>
          </div>
          <p className="text-center text-slate-600 text-xs mt-2">
            MindSpace is an AI companion, not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
