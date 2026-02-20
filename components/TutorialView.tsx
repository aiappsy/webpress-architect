
import React from 'react';
import { 
  Layers, 
  PenTool, 
  Eye, 
  Cpu, 
  ShieldCheck, 
  Timer, 
  Sparkles, 
  Globe, 
  Code, 
  Zap, 
  DollarSign, 
  Terminal,
  ArrowRight,
  CheckCircle2,
  Copy,
  Layout,
  Star
} from 'lucide-react';
import { AppSettings } from '../types';

interface TutorialViewProps {
  settings?: AppSettings;
}

export const TutorialView: React.FC<TutorialViewProps> = ({ settings }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-nexus-dark p-8 text-slate-300 custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-16 pb-24">
        
        {/* Hero Section */}
        <header className="text-center space-y-6 pt-8 pb-12 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-nexus-500/10 border border-nexus-500/20 rounded-full text-nexus-400 text-xs font-bold uppercase tracking-widest mb-4">
             <Star size={14} className="text-yellow-500" /> Mixture of Agents (MoA) Architecture
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight">The Orchestrator's Manual</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            WebPress Architect isn't just one AI—it's a high-performance cluster. We route your tasks between **Standard Free Tiers** and **Paid Pro Tiers** to give you the ultimate balance of power and cost.
          </p>
        </header>

        {/* Section: Model Tiers Explanation */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-nexus-600/20 rounded-xl border border-nexus-500/30">
                    <Zap className="text-nexus-400" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">1. Understanding Model Tiers</h2>
                    <p className="text-slate-500 text-sm">How we handle cost vs. ability automatically.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-nexus-surface rounded-2xl border border-slate-700 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-nexus-400 uppercase mb-2 tracking-widest">Standard Tiers (Free)</div>
                    <h4 className="text-white font-bold mb-3">Rapid Prototyping</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Uses **Gemini 3 Flash**, **Llama 3.1 8B**, and **Qwen 2.5 7B**. Perfect for drafting site structures, simple PHP hooks, and responsive CSS.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500">
                        <CheckCircle2 size={12}/> Best for: Drafting & Low-cost testing.
                    </div>
                </div>

                <div className="p-6 bg-nexus-surface rounded-2xl border border-yellow-500/20 relative overflow-hidden group">
                    <div className="text-[10px] font-bold text-yellow-500 uppercase mb-2 tracking-widest">Pro Tiers (Paid)</div>
                    <h4 className="text-white font-bold mb-3">Agency-Grade Logic</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Upgrades to **Gemini 3 Pro** and **Pro Image**. Massive context window and superior reasoning for custom Elementor Widget APIs and security audits.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-yellow-500">
                        <Star size={12}/> Best for: Production-ready complex plugins.
                    </div>
                </div>
            </div>
        </section>

        {/* Section: Elementor Alignment */}
        <section className="space-y-8 p-8 bg-nexus-surface rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Layout size={80} />
            </div>
            <div className="relative space-y-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="text-nexus-400" /> 100% Elementor Alignment
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                    Our Pro Orchestrator is specifically trained to output code that communicates using Elementor's native JSON structure and PHP widget architecture.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                        <div className="text-xs font-bold text-white uppercase tracking-widest">Native Controls</div>
                        <p className="text-xs text-slate-500">The Pro tier excels at generating complex `register_controls()` blocks for the Elementor side-panel.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-xs font-bold text-white uppercase tracking-widest">Visual reasoning</div>
                        <p className="text-xs text-slate-500">Nano Banana maps your design vision directly to Elementor's CSS utility classes.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: BYOK Logic */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-600/20 rounded-xl border border-emerald-500/30">
                    <DollarSign className="text-emerald-400" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">2. Pro Cost Management</h2>
                    <p className="text-slate-500 text-sm">Transparent routing. No middleman markup.</p>
                </div>
            </div>

            <div className="p-6 bg-nexus-surface rounded-2xl border border-slate-700">
                <ul className="space-y-4">
                    <li className="flex gap-4">
                        <div className="p-2 bg-nexus-500/20 rounded-lg shrink-0 h-fit"><Globe size={16} className="text-nexus-400"/></div>
                        <div>
                            <h5 className="text-sm font-bold text-white">OpenRouter (Coding Models)</h5>
                            <p className="text-xs text-slate-500">We prioritize models labeled as **:free**. If you enable Pro coding, tokens are billed from your OpenRouter credit balance at raw rates.</p>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <div className="p-2 bg-yellow-500/20 rounded-lg shrink-0 h-fit"><Star size={16} className="text-yellow-400"/></div>
                        <div>
                            <h5 className="text-sm font-bold text-white">Google Gemini (Orchestrator)</h5>
                            <p className="text-xs text-slate-500">Standard Tier (Flash) is managed via our system variables. Pro Tier (Pro) requires you to follow the API selection prompt for billing.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        {/* Section 3: Step-by-Step Workflow */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-nexus-600/20 rounded-xl border border-nexus-500/30">
                    <Layers className="text-nexus-400" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">3. Building Your First Plugin</h2>
                    <p className="text-slate-500 text-sm">Recommended "Architectural" flow.</p>
                </div>
            </div>

            <div className="space-y-10 pb-10">
                <div className="flex gap-6 relative">
                    <div className="shrink-0 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-nexus-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-nexus-900/40 z-10">1</div>
                        <div className="w-px flex-1 bg-slate-800 my-2"></div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">The Backbone Pass (Free)</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Start in the **Architect** channel using the Standard Tier. Map out your CPTs and Taxonomies first.
                        </p>
                        <div className="bg-black/40 rounded-xl border border-slate-800 p-4 font-mono text-[11px] text-slate-400 flex justify-between items-center group">
                             <span>"Build a Real Estate CPT for Elementor."</span>
                             <button onClick={() => copyToClipboard("Build a Real Estate CPT for Elementor.", "c1")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                {copiedIndex === "c1" ? <CheckCircle2 size={12}/> : <Copy size={12}/>}
                             </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-6 relative">
                    <div className="shrink-0 flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-yellow-900/40 z-10">2</div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-white font-bold">The Refinement Pass (Pro)</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Switch to **Pro Orchestrator** in Settings. Ask for specialized AJAX filtering or security-hardened admin screens.
                        </p>
                        <div className="bg-black/40 rounded-xl border border-slate-800 p-4 font-mono text-[11px] text-slate-400 flex justify-between items-center group">
                             <span>"Add advanced AJAX multi-criteria search with Elementor controls."</span>
                             <button onClick={() => copyToClipboard("Add advanced AJAX multi-criteria search with Elementor controls.", "c2")} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                {copiedIndex === "c2" ? <CheckCircle2 size={12}/> : <Copy size={12}/>}
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
};
