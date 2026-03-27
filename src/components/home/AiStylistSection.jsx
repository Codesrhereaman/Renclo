import { Bot, Sparkles, Target, Zap, ArrowRight, UserCheck } from 'lucide-react';
import { FadeIn } from '../common/PageTransition';

export default function AiStylistSection() {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-purple-600" />,
      title: 'Body-Type Mapping',
      desc: 'Our AI precisely analyzes your silhouette to recommend cuts and fits that flatter you perfectly.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-pink-600" />,
      title: 'Color Palette Matching',
      desc: 'Discover hues that complement your skin tone, ensuring you always stand out.'
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: 'Real-Time Adaptation',
      desc: 'The stylist learns from your favorites, curating exclusively personalized dashboards.'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Decorative background vectors */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50/50 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-100/50 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Content */}
          <FadeIn>
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-bold text-sm mb-6">
                <Bot className="w-4 h-4" />
                Meet Your New Curator
              </div>
              <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Your Personal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  AI Stylist
                </span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">
                Gone are the days of endless scrolling. WardroWave's deeply integrated AI Stylist acts as your personal fashion curator—analyzing your preferences, body type, and the event you're attending to stitch together the ultimate lookbook.
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-lg transition-all group-hover:scale-110 duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-xl shadow-slate-900/20 group">
                  Build My Style Profile 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Right Visual Dashboard Mockup */}
          <FadeIn delay={0.2}>
            <div className="relative">
              {/* Floating Element 1 */}
              <div className="absolute -left-12 top-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-[float_4s_ease-in-out_infinite]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Style Match</p>
                    <p className="text-sm font-black text-slate-900">98% Compatibility</p>
                  </div>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -right-8 bottom-24 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 animate-[float_5s_ease-in-out_infinite_reverse]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Color Palette</p>
                    <div className="flex gap-1 mt-1">
                      <div className="w-4 h-4 rounded-full bg-rose-500"></div>
                      <div className="w-4 h-4 rounded-full bg-slate-900"></div>
                      <div className="w-4 h-4 rounded-full bg-emerald-700"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Card UI */}
              <div className="relative bg-slate-50 rounded-[40px] p-2 border border-slate-100 shadow-2xl">
                <div className="bg-white rounded-[32px] overflow-hidden">
                  <div className="h-64 bg-slate-100 relative overflow-hidden group">
                    <img 
                      src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&fit=crop" 
                      alt="AI styling preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-6">
                      <div className="w-fit px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-2 border border-white/30">
                        AI Recommended
                      </div>
                      <h3 className="text-2xl font-black text-white">The Minimalist Lookbook</h3>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">Curated For You</h4>
                        <p className="text-slate-500 text-sm">Based on your recent aesthetic choices</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center border border-purple-100">
                        <Bot className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    
                    {/* Skeleton loader aesthetics to simulate UI processing */}
                    <div className="space-y-3">
                      <div className="h-3 bg-slate-100 rounded-full w-full"></div>
                      <div className="h-3 bg-slate-100 rounded-full w-5/6"></div>
                      <div className="h-3 bg-slate-100 rounded-full w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
