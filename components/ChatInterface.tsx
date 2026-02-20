
import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, FileJson, Layers, Code, Paperclip, X, Eye, Sparkles, Cpu, ShieldCheck, ShieldAlert, Timer } from 'lucide-react';
import { ChatMessage, MessageRole, Attachment, AgentType } from '../types';

interface ChatInterfaceProps {
  history: ChatMessage[];
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  isProcessing: boolean;
  activeAgent?: AgentType;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ history, onSendMessage, isProcessing, activeAgent = 'architect' }) => {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [history, attachments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || attachments.length > 0) && !isProcessing) {
      onSendMessage(input, attachments);
      setInput('');
      setAttachments([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-nexus-darker relative overflow-hidden">
      <div className="absolute top-0 w-full p-4 bg-nexus-darker/90 backdrop-blur border-b border-slate-800 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${activeAgent === 'copywriter' ? 'bg-yellow-500' : activeAgent === 'visionary' ? 'bg-purple-500' : 'bg-nexus-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">MoA Channel: {activeAgent}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-16 pb-40 space-y-6 custom-scrollbar">
        {history.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 border shadow-xl transition-all ${msg.role === MessageRole.USER ? 'bg-nexus-600 text-white border-transparent' : 'bg-nexus-surface border-slate-700 text-slate-200'}`}>
              
              {/* Routing Info Pill */}
              {msg.routing && (
                <div className="flex items-center gap-3 mb-3 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase text-nexus-400 bg-nexus-900/40 px-2 py-0.5 rounded border border-nexus-500/20">
                        <Cpu size={10} /> {msg.routing.modelId.split('/').pop()}
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase text-slate-500">
                        <Timer size={10} /> {msg.routing.latency}ms
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase text-emerald-500">
                        <Sparkles size={10} /> {Math.round(msg.routing.confidence * 100)}% Match
                    </div>
                </div>
              )}

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
              
              {msg.artifacts && msg.artifacts.length > 0 && (
                <div className="mt-4 space-y-3">
                    {msg.artifacts.map((artifact, idx) => (
                        <div key={idx} className="bg-black/40 rounded-lg overflow-hidden border border-white/5 shadow-2xl">
                            <div className="flex items-center justify-between px-3 py-2 bg-black/20 border-b border-white/5">
                                <span className="text-[10px] font-bold uppercase font-mono text-nexus-400 flex items-center gap-2">
                                    <Code size={14}/> {artifact.title}
                                </span>
                                {artifact.securityPass !== undefined && (
                                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${artifact.securityPass ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {artifact.securityPass ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                                        {artifact.securityPass ? 'WP Security Pass' : 'Security Warning'}
                                    </div>
                                )}
                            </div>
                            <pre className="p-3 text-[11px] font-mono text-slate-400 overflow-x-auto custom-scrollbar">{artifact.content}</pre>
                            {!artifact.securityPass && artifact.securityIssues && (
                                <div className="p-3 bg-red-900/20 border-t border-red-500/20">
                                    <p className="text-[10px] font-bold text-red-400 uppercase mb-1">Detected Vulnerabilities:</p>
                                    <ul className="text-[10px] text-red-300/70 list-disc pl-4 space-y-0.5">
                                        {artifact.securityIssues.map((issue, i) => <li key={i}>{issue}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && <div className="p-4 bg-nexus-surface/50 border border-slate-800 rounded-2xl w-fit flex items-center gap-2"><div className="w-1.5 h-1.5 bg-nexus-500 rounded-full animate-bounce"></div><span className="text-[10px] font-mono text-slate-500">Routing Task...</span></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 w-full bg-nexus-darker/95 backdrop-blur-xl border-t border-slate-800 z-20 p-4">
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your WordPress task (Planning, Coding, or Style)..."
                className="w-full bg-nexus-surface/80 text-slate-200 placeholder-slate-500 rounded-2xl py-4 pl-4 pr-12 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-nexus-500/20"
                disabled={isProcessing}
            />
            <button type="submit" disabled={!input.trim() || isProcessing} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-nexus-600 text-white rounded-xl hover:bg-nexus-500 disabled:opacity-50 transition-all"><Send size={18} /></button>
        </form>
      </div>
    </div>
  );
};
