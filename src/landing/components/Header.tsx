import { useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4433/api';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-violet-500/30">
            🧠
          </div>
          <div>
            <p className="text-lg font-black text-white tracking-tight leading-none">MindSpace</p>
            <p className="text-xs text-violet-400">AI mental support companion</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a key={item.label} href={item.href}
              className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`${API_BASE_URL}/auth/google`}
            className="hidden sm:inline-block bg-gradient-to-r from-violet-600 to-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all duration-300">
            Get Started Free
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-all duration-300">
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-1">
          {nav.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}
              className="block py-3 px-2 text-slate-300 hover:text-white font-medium transition-colors">
              {item.label}
            </a>
          ))}
          <a href={`${API_BASE_URL}/auth/google`}
            className="mt-2 block text-center bg-gradient-to-r from-violet-600 to-pink-500 text-white px-5 py-3 rounded-xl font-bold">
            Get Started Free
          </a>
        </div>
      )}
    </header>
  );
}
