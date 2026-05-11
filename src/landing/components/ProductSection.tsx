export default function ProductSection () {
  return (
    <section className="py-24 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Monitor and manage models, from small teams to massive scale
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 h-80 flex items-center justify-center group hover:border-slate-700 transition-all duration-300">
                <div className="w-32 h-32 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl"></div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 h-80 flex items-center justify-center group hover:border-slate-700 transition-all duration-300">
                <div className="w-32 h-32 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-500 rounded-xl"></div>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 h-80 flex items-center justify-center group hover:border-slate-700 transition-all duration-300">
                <div className="w-32 h-32 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-cyan-500 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center">
              <div className="text-8xl font-black text-slate-700 mb-6">01</div>
              <h3 className="text-2xl font-bold mb-6 text-white">Easy to Integrate</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Add two lines of code to your notebook or script and automatically start tracking code, hyperparameters, metrics, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl font-black text-slate-700 mb-6">02</div>
              <h3 className="text-2xl font-bold mb-6 text-white">Track and share experiments</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Monitor your experiments in real-time and share results with your team seamlessly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-8xl font-black text-slate-700 mb-6">03</div>
              <h3 className="text-2xl font-bold mb-6 text-white">Build your own visualizations</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Create custom dashboards and visualizations that fit your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};