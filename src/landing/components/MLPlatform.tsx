export default function MLPlatformSection () {
  return (
    <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-sm uppercase tracking-widest text-purple-400 font-bold mb-6">
                  FOR ML PRACTITIONERS
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  The user experience that makes redundant work disappear
                </h3>
                <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                  Track every detail of your ML pipeline automatically. Visualize results with relevant context. 
                  Drag & drop analysis to uncover insights – your next best model is just a few clicks away.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                      Transforming the Financial Industry with Data
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      How AI is Revolutionizing Urban Planning
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      AI's Impact on Medical Diagnostics and Treatment
                    </h4>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 h-60 flex items-center justify-center hover:border-slate-700 transition-all duration-300">
                  <div className="w-20 h-20 bg-blue-500/20 border border-blue-500/30 rounded-2xl"></div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 h-60 flex items-center justify-center hover:border-slate-700 transition-all duration-300">
                  <div className="w-20 h-20 bg-purple-500/20 border border-purple-500/30 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-24">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 h-80 flex items-center justify-center hover:border-slate-700 transition-all duration-300">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-xl"></div>
                    <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-xl"></div>
                    <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/30 rounded-xl"></div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <p className="text-sm uppercase tracking-widest text-purple-400 font-bold mb-6">
                  FOR ML ENGINEERS  
                </p>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  The ML workflow co-designed with ML engineers
                </h3>
                <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                  Track every detail of your ML pipeline automatically. Visualize results with relevant context. 
                  Drag & drop analysis to uncover insights – your next best model is just a few clicks away.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-purple-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                      Advanced Model Tracking & Versioning
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      Real-time Collaboration Tools
                    </h4>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-all duration-300"></div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Automated Performance Monitoring
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              The leading ML platform that provides value to your entire team
            </h2>
          </div>
        </div>
      </section>
  );
};