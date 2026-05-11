

export default function Footer () {
  const footerLinks = {
    Product: ['Features', 'Integrations', 'Pricing', 'API'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Resources: ['Documentation', 'Help Center', 'Community', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies']
  };

  return (
    <footer className="py-16 px-6 bg-black border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-pink-500 rounded-2xl flex items-center justify-center text-2xl shadow shadow-violet-500/30">
                🧠
              </div>
              <div>
                <p className="text-xl font-black text-white tracking-tight leading-none">MindSpace</p>
                <p className="text-xs text-violet-400">AI mental support companion</p>
              </div>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Your always-available mental health companion. Because no one should face hard days alone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300">
                <span className="text-sm font-bold">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300">
                <span className="text-sm font-bold">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300">
                <span className="text-sm font-bold">gh</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-lg mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-slate-400 hover:text-white transition-colors duration-300 text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <p className="text-slate-400">© 2025 MindSpace. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-400 text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};