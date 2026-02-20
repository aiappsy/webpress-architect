
import React from 'react';
import { Shield, Settings, Zap, Database, Globe, Layers, ArrowRight, Layout, Maximize } from 'lucide-react';

export const PrdOverview: React.FC = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="p-8 bg-nexus-surface rounded-2xl border border-slate-700 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-nexus-600/20 rounded-xl border border-nexus-500/30">
            <Layout className="text-nexus-400" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">1. Executive Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-nexus-500 uppercase tracking-widest">Product Name</span>
            <p className="text-xl text-white font-semibold">WebPress Architect (Elementor Edition)</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-nexus-500 uppercase tracking-widest">Core Mission</span>
            <p className="text-slate-300">Generate Elementor-native code that maintains 100% builder editability.</p>
          </div>
      </div>

      <div className="p-4 bg-nexus-darker rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={14} className="text-yellow-500"/> Vision
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed">
            Eliminate the gap between AI code generation and visual page builders. WebPress Architect ensures that every PHP function or CSS block is wrapped in the Elementor Widget API, making AI-built sites accessible to non-technical editors.
          </p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-nexus-surface rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe size={18} className="text-emerald-400"/> Primary Objective
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed">
            Create a "Lovable" experience for WordPress agencies where complex dynamic functionality can be prototyped in seconds and refined within the Elementor Editor.
        </p>
      </div>
      <div className="p-6 bg-nexus-surface rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield size={18} className="text-nexus-400"/> Success Metric
        </h3>
        <div className="flex items-center justify-between p-3 bg-nexus-darker rounded-lg border border-slate-800">
            <span className="text-sm text-slate-400">Editability</span>
            <span className="text-emerald-400 font-bold">100% Native</span>
        </div>
      </div>
    </div>
  </div>
);

export const PrdFunctional: React.FC = () => (
  <div className="space-y-8">
    <div className="p-8 bg-nexus-surface rounded-2xl border border-slate-700 shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-600/20 rounded-xl border border-emerald-500/30">
            <Settings className="text-emerald-400" size={24} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">2. Generation Layering</h2>
      </div>
      
      <div className="space-y-12">
        <section>
          <h3 className="text-lg font-bold text-white mb-4">2.1 Elementor Widget Logic</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="text-nexus-500 mb-2 uppercase font-bold text-[10px]">Layer 1: Widget PHP</div>
                <pre className="text-slate-400">
{`class My_Widget extends \Elementor\Widget_Base {
    public function get_name() { return 'ai_widget'; }
    protected function register_controls() {
        // AI generated controls here
    }
}`}
                </pre>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="text-purple-500 mb-2 uppercase font-bold text-[10px]">Layer 2: Layout JSON</div>
                <pre className="text-slate-400">
{`{
  "settings": { "title": "Section A" },
  "elements": [{
    "elType": "column",
    "settings": { "_column_size": 50 }
  }]
}`}
                </pre>
              </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Maximize size={18} className="text-nexus-500" />
            2.2 Page Standards (Elementor Alignment)
          </h3>
          <div className="p-6 bg-nexus-darker rounded-xl border border-slate-800 space-y-4">
            <p className="text-sm text-slate-400 leading-relaxed">
              Every generation adheres to **Site Settings -> Layout** standards. This ensures the design scales correctly across themes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-nexus-surface rounded-lg border border-slate-700">
                <div className="text-[10px] font-bold text-nexus-500 uppercase mb-1">Content Width</div>
                <div className="text-white font-bold">1140px</div>
                <div className="text-[9px] text-slate-500">Standard Boxed Default</div>
              </div>
              <div className="p-4 bg-nexus-surface rounded-lg border border-slate-700">
                <div className="text-[10px] font-bold text-nexus-500 uppercase mb-1">Widgets Space</div>
                <div className="text-white font-bold">20px</div>
                <div className="text-[9px] text-slate-500">Gutter/Spacing Baseline</div>
              </div>
              <div className="p-4 bg-nexus-surface rounded-lg border border-slate-700">
                <div className="text-[10px] font-bold text-nexus-500 uppercase mb-1">Page Layout</div>
                <div className="text-white font-bold">Native</div>
                <div className="text-[9px] text-slate-500">Full-Width / Canvas</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);
