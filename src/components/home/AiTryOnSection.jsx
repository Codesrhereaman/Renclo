import { useState } from 'react';
import { Upload, Sparkles, Camera, ArrowRight, Loader2 } from 'lucide-react';
import { FadeIn } from '../common/PageTransition';

const outfitData = {
  'Wedding Reception': {
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
    title: 'Premium Embellished Lehenga'
  },
  'Corporate Gala': {
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&h=1000&fit=crop',
    title: 'Midnight Sparkle Gala Gown'
  },
  'Beach Vacation': {
    image: '/relaxed_beach_man.png',
    title: 'Relaxed Tailored Beach Outfit'
  },
  'Date Night': {
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=1000&fit=crop',
    title: 'Satin Slip Midi Dress'
  },
  'Festive Party': {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop',
    title: 'Royal Tissue Saree'
  }
};

const occasions = Object.keys(outfitData);

export default function AiTryOnSection() {
  const [isHovering, setIsHovering] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState(occasions[0]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [previewGenerated, setPreviewGenerated] = useState(false);

  const simulateAi = () => {
    setIsSimulating(true);
    setPreviewGenerated(false);
    setTimeout(() => {
      setIsSimulating(false);
      setPreviewGenerated(true);
    }, 2500);
  };

  return (
    <section className="py-16 lg:py-20 bg-slate-50 relative overflow-hidden">
      {/* Light background with glowing meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-multiply">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn className="text-center mb-10 lg:mb-6">
          <h2 className="section-title text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6">
            Virtual <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Try-On</span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto">
            Upload your photo, select an occasion, and let our AI generate your perfect outfit instantly.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Left Side: Upload Interface */}
          <FadeIn delay={0.2}>
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl rounded-full"></div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 text-sm">1</span>
                <span>Select Occasion</span>
              </h3>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {occasions.map(occ => (
                  <button 
                    key={occ}
                    onClick={() => { setSelectedOccasion(occ); setPreviewGenerated(false); }}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                      selectedOccasion === occ 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg shadow-purple-500/20' 
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 text-sm">2</span>
                <span>Upload Your Photo</span>
              </h3>

              <div 
                className={`relative w-full h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${
                  isHovering || isSimulating || previewGenerated
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                }`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={!isSimulating ? simulateAi : undefined}
              >
                {!isSimulating && !previewGenerated && (
                   <div className="flex flex-col items-center text-center p-6 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                     <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-400 mb-4 shadow-sm group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors border border-slate-100">
                       <Upload className="w-8 h-8" />
                     </div>
                     <p className="text-slate-800 font-medium text-lg mb-1">Click to Upload Image</p>
                     <p className="text-slate-500 text-sm">PNG, JPG up to 10MB</p>
                   </div>
                )}
                
                {isSimulating && (
                  <div className="flex flex-col items-center text-center z-10 animate-pulse">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                    <p className="text-purple-700 font-bold text-lg">AI is styling you...</p>
                    <p className="text-slate-500 text-sm mt-2">Analyzing occasion: {selectedOccasion}</p>
                  </div>
                )}

                {previewGenerated && (
                  <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop" className="w-full h-full object-cover opacity-80" alt="Uploaded user" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent flex flex-col justify-end p-6">
                       <span className="inline-flex items-center gap-2 self-start py-1 px-3 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                         <Sparkles className="w-3 h-3" /> Image Uploaded Successfully
                       </span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </FadeIn>

          {/* Right Side: AI Generated Mockup */}
          <FadeIn delay={0.4}>
            <div className="relative">
              {/* Decorative wireframe/tech lines behind image */}
              <div className="absolute inset-[-20px] border border-slate-300 rounded-[48px] border-dashed animate-[spin_60s_linear_infinite] pointer-events-none opacity-50"></div>
              <div className="absolute inset-[-40px] border border-slate-200 rounded-full border-dashed animate-[spin_80s_reverse_linear_infinite] pointer-events-none opacity-50 hidden md:block"></div>

              <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[5/5] bg-slate-100 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(168,85,247,0.15)] border border-slate-200">
                {!previewGenerated ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
                    <div className="w-24 h-24 mb-6 relative">
                      <div className="absolute inset-0 border-r-2 border-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-l-2 border-pink-500 rounded-full animate-[spin_1.5s_reverse_linear_infinite]"></div>
                      <Camera className="absolute inset-0 m-auto text-slate-400 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Waiting for Input</h3>
                    <p className="text-sm text-slate-500">Upload an image to see the AI magic.</p>
                  </div>
                ) : (
                  <div className="absolute inset-0">
                    <img 
                       key={outfitData[selectedOccasion].image}
                       src={outfitData[selectedOccasion].image} 
                       alt={outfitData[selectedOccasion].title} 
                       className="w-full h-full object-cover transition-transform duration-1000 scale-100 animate-in fade-in zoom-in-50 hover:scale-[1.03]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-[-1px] left-[-1px] right-[-1px] bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent p-6 md:p-8 pt-32">
                      <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4 animate-[bounce_2s_infinite]">
                        Top Match Generated
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
                        {outfitData[selectedOccasion].title}
                      </h3>
                      <p className="text-gray-300 font-medium text-lg mb-6">
                        Perfectly styled for <span className="text-white font-bold">{selectedOccasion}</span>
                      </p>
                      
                      <div className="flex gap-4 items-center">
                        <button className="flex-1 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          Rent This Outfit
                        </button>
                        <button className="w-14 h-14 rounded-xl border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur-md">
                          <ArrowRight className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
