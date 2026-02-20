
import React, { useState } from 'react';
import { Key, Save, ExternalLink, ShieldCheck, Cpu, Eye, EyeOff, Globe, Info, CreditCard, CheckCircle2, Zap, Star, AlertCircle } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsPanelProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = React.useState<AppSettings>(settings);
  const [saved, setSaved] = React.useState(false);
  const [showORKey, setShowORKey] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSetting = (key: keyof AppSettings) => {
    setFormData({ ...formData, [key]: !formData[key] });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-nexus-dark p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3"><ShieldCheck className="text-nexus-500" /> System Configuration</h2>
            <p className="text-slate-400 leading-relaxed">
                Configure your Mixture of Agents (MoA) preferences. Switch between **Free/Standard** tiers for rapid prototyping and **Pro** tiers for agency-grade complex logic.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-nexus-surface/30 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-nexus-400 font-bold text-xs uppercase"><Zap size={14}/> Standard Tiers</div>
                <p className="text-[11px] text-slate-500">Fast, cost-efficient models (Gemini Flash, Llama 3.1 8B). Perfect for layout drafts and basic PHP hooks.</p>
            </div>
            <div className="p-4 bg-nexus-surface/30 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase"><Star size={14}/> Pro Tiers</div>
                <p className="text-[11px] text-slate-500">High-reasoning models (Gemini Pro, Qwen 2.5 72B). Essential for deep security audits and custom Elementor widget logic.</p>
            </div>
        </div>
        
        <form onSubmit={handleSave} className="space-y-8 pb-12">
          {/* External Routing Keys */}
          <div className="bg-nexus-surface border border-slate-700 rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe size={16} className="text-purple-500"/> OpenRouter API Key
                    </label>
                    <a href="https://openrouter.ai/keys" target="_blank" className="text-[10px] font-bold uppercase text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                        Get OpenRouter Key <ExternalLink size={10}/>
                    </a>
                </div>
                <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                        type={showORKey ? "text" : "password"} 
                        value={formData.openRouterKey} 
                        onChange={(e) => setFormData({...formData, openRouterKey: e.target.value})} 
                        className="w-full bg-nexus-darker border border-slate-600 rounded-xl py-3 pl-10 pr-10 text-sm font-mono focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 outline-none transition-all" 
                        placeholder="sk-or-v1-..."
                    />
                    <button type="button" onClick={() => setShowORKey(!showORKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                        {showORKey ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                </div>
            </div>
          </div>

          {/* Gemini Model Tiers */}
          <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Gemini Orchestration Tiers</h3>
              
              <div className="grid grid-cols-1 gap-4">
                  {/* Pro Orchestrator */}
                  <div className={`p-5 rounded-2xl border transition-all ${formData.useProOrchestrator ? 'bg-nexus-900/10 border-nexus-500/40 shadow-lg shadow-nexus-500/5' : 'bg-nexus-surface/50 border-slate-700'}`}>
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${formData.useProOrchestrator ? 'bg-nexus-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                  <Cpu size={20} />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-white text-sm">Pro Orchestrator</h4>
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase">Paid Tier</span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-1">Switches 'Architect' brain to **Gemini 3 Pro**. Superior reasoning for complex project structures.</p>
                              </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => toggleSetting('useProOrchestrator')}
                            className={`w-12 h-6 rounded-full transition-all relative ${formData.useProOrchestrator ? 'bg-nexus-500' : 'bg-slate-700'}`}
                          >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.useProOrchestrator ? 'left-7' : 'left-1'}`}></div>
                          </button>
                      </div>
                      <div className="bg-black/20 p-2 rounded-lg text-[10px] text-slate-500 flex items-start gap-2">
                          <Info size={12} className="shrink-0 mt-0.5" />
                          <span>Standard tier uses **Gemini 3 Flash** (Free). Pro is recommended for deep multi-agent planning.</span>
                      </div>
                  </div>

                  {/* Pro Designer (Nano Banana) */}
                  <div className={`p-5 rounded-2xl border transition-all ${formData.useProDesigner ? 'bg-purple-900/10 border-purple-500/40 shadow-lg shadow-purple-500/5' : 'bg-nexus-surface/50 border-slate-700'}`}>
                      <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${formData.useProDesigner ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                                  <Star size={20} />
                              </div>
                              <div>
                                  <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-white text-sm">Pro Designer Mode</h4>
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase">Paid Tier</span>
                                  </div>
                                  <p className="text-[11px] text-slate-400 mt-1">Switches 'Visionary' agent to **Gemini 3 Pro Image**. 4K design reasoning.</p>
                              </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => toggleSetting('useProDesigner')}
                            className={`w-12 h-6 rounded-full transition-all relative ${formData.useProDesigner ? 'bg-purple-500' : 'bg-slate-700'}`}
                          >
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.useProDesigner ? 'left-7' : 'left-1'}`}></div>
                          </button>
                      </div>
                      <div className="bg-black/20 p-2 rounded-lg text-[10px] text-slate-500 flex items-start gap-2">
                          <AlertCircle size={12} className="shrink-0 mt-0.5 text-yellow-500" />
                          <span>Requires selection of a paid GCP project key via the system dialog when triggered.</span>
                      </div>
                  </div>
              </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-nexus-600 hover:bg-nexus-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-nexus-900/40 flex items-center justify-center gap-2 group"
          >
            {saved ? <CheckCircle2 size={20}/> : <Save size={20} className="group-hover:scale-110 transition-transform"/>}
            {saved ? 'Configuration Saved' : 'Commit Model Selections'}
          </button>

          <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <h4 className="text-blue-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                <CreditCard size={14}/> Usage Policy
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By enabling Pro Tiers, you acknowledge that tokens will be billed directly to your account. WebPress Architect does not charge a subscription, but we recommend monitoring your Google Cloud and OpenRouter usage dashboards regularly.
              </p>
          </div>
        </form>
      </div>
    </div>
  );
};
