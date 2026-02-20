
import React, { useState, useEffect } from 'react';
import { Box, Settings, Download, CheckCircle2, AlertTriangle, Layers, PenTool, Eye, BookOpen, FileText, Cpu, ShieldAlert, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatInterface } from './components/ChatInterface';
import { LivePreview } from './components/LivePreview';
import { SettingsPanel } from './components/SettingsPanel';
import { TutorialView } from './components/TutorialView';
import { PrdOverview, PrdFunctional } from './components/PrdContent';
import { ChatMessage, MessageRole, AppSettings, GeneratedAppData, Attachment, AgentType, ProjectContext, ProjectVersion, TaskCategory, RoutingStats, Artifact } from './types';

const DEFAULT_SETTINGS: AppSettings = {
  openRouterKey: '',
  model: 'gemini-3-flash-preview',
  useProOrchestrator: false,
  useProDesigner: false,
  useNanoBanana: true,
  integrations: {
    elementor: true,
    woocommerce: false,
    acf: true,
    gutenberg: true,
    divi: false,
    fluent_crm: false,
    fluent_forms: false,
    fluent_smtp: false,
  }
};

function App() {
  const [activeTab, setActiveTab] = useState<'builder' | 'settings' | 'tutorial' | 'prd'>('builder');
  const [activeAgent, setActiveAgent] = useState<AgentType>('architect');
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [projectContext, setProjectContext] = useState<ProjectContext>({
      structure: null,
      copyDeck: {},
      visuals: {},
      lastAgentUpdate: null
  });
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('nexus_settings');
    if (savedSettings) {
        try {
            const parsed = JSON.parse(savedSettings);
            setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        } catch (e) {
            setSettings(DEFAULT_SETTINGS);
        }
    }
    
    setChatHistory([{
      id: '1',
      role: MessageRole.AI,
      agent: 'architect',
      text: "Welcome to **WebPress Architect**, your specialized **Elementor-Native** AI workspace. \n\nI am your Lead Architect, and I deploy a specialized **Mixture of Agents (MoA)** designed to build apps and sites that are 100% compatible with Elementor. Every widget, template, and dynamic structure we generate is engineered to be fully editable in the Elementor builder—exactly as if you hand-crafted it from scratch.\n\n**Ready to build?** Describe the Elementor-powered project or plugin functionality you need today.",
      timestamp: Date.now()
    }]);
  }, []);

  const saveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('nexus_settings', JSON.stringify(newSettings));
  };

  const scanSecurity = (code: string): { pass: boolean; issues: string[] } => {
    const issues: string[] = [];
    if (code.includes('$_POST') && !code.includes('check_admin_referer') && !code.includes('wp_verify_nonce')) {
      issues.push("Potential CSRF: Missing Nonce validation on POST data.");
    }
    if (code.includes('echo') && !code.includes('esc_html') && !code.includes('esc_attr') && !code.includes('esc_url')) {
      issues.push("Potential XSS: Unescaped output found.");
    }
    if (code.includes('$wpdb->query') && !code.includes('$wpdb->prepare')) {
      issues.push("SQL Injection Risk: Use $wpdb->prepare() for queries.");
    }
    return { pass: issues.length === 0, issues };
  };

  const callOpenRouter = async (model: string, prompt: string, systemInstruction: string) => {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${settings.openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "WebPress Architect"
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "OpenRouter Request Failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const classifyIntent = async (text: string): Promise<{ category: TaskCategory, confidence: number }> => {
    // Orchestrator Choice
    const orchestratorModel = settings.useProOrchestrator ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: orchestratorModel,
      contents: `Classify this WordPress dev task into exactly one category: architecture, php_logic, frontend_css, security_review, or general. 
      Input: "${text}"
      Return ONLY valid JSON: {"category": "category", "confidence": 0.0 to 1.0}`,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{"category": "general", "confidence": 0.5}');
  };

  const handleSwitchAgent = (agent: AgentType) => {
    setActiveAgent(agent);
    setActiveTab('builder');
  };

  const handleSendMessage = async (text: string, attachments: Attachment[]) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role: MessageRole.USER, text: text, timestamp: Date.now(), attachments: attachments };
    setChatHistory(prev => [...prev, userMsg]);

    if (!settings.openRouterKey) {
      const setupMsg: ChatMessage = {
        id: Date.now().toString() + "-setup",
        role: MessageRole.AI,
        agent: 'system',
        text: `### 🚀 Let's Get Your Workspace Connected
To enable the **Elementor-Native Orchestration**, you need to provide your OpenRouter API key. This "Bring Your Own Key" (BYOK) model keeps your costs transparent and at raw provider rates.

1.  **OpenRouter Key** (Specialized Coding): Used to route coding tasks to high-performance models like Qwen 2.5 and Llama 3.1. [Get a key here](https://openrouter.ai/keys).

**Head to the Settings tab** to enter your key. Once connected, I can start generating full Elementor widgets and templates for you instantly.`,
        timestamp: Date.now()
      };
      setChatHistory(prev => [...prev, setupMsg]);
      return;
    }

    const startTime = Date.now();
    setIsProcessing(true);

    try {
        const { category, confidence } = await classifyIntent(text);
        
        let modelId = 'meta-llama/llama-3.1-8b-instruct:free';
        if (category === 'php_logic') modelId = 'qwen/qwen-2.5-7b-instruct:free';
        if (category === 'general') modelId = 'mistral/mistral-7b-instruct:free';
        
        let isUsingGeminiAgent = false;
        let geminiModelId = '';

        if (category === 'frontend_css' || activeAgent === 'visionary') {
            if (settings.useNanoBanana || settings.useProDesigner) {
                geminiModelId = settings.useProDesigner ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
                isUsingGeminiAgent = true;
            } else {
                modelId = 'google/gemma-2-9b-it:free';
            }
        }

        const systemInstruction = `You are a world-class WordPress and Elementor developer. 
        Focus: ${category.toUpperCase()}. 
        Goal: Generate code and layout definitions that are 100% compatible with Elementor standards.
        
        ELEMENTOR STANDARDS FOR LAYOUT:
        - Default Content Width: 1140px (Boxed).
        - Page Layouts: 'Elementor Full Width' (Header/Footer included) or 'Elementor Canvas' (Blank).
        - When updating KB for structure, include:
          "layoutSettings": { "contentWidth": 1140, "widgetsSpace": 20, "pageLayout": "boxed" | "full-width" }

        When generating PHP, output custom Elementor widgets or template data. 
        When generating styles, ensure they follow Elementor's theme style guidelines.
        Code must allow the user to edit the result within the Elementor Editor as if it was created there from scratch.
        Context: ${projectContext.structure ? JSON.stringify(projectContext.structure) : 'New Project'}.
        Ensure all code follows WP Coding Standards (Nonces, Sanitization, Escaping).`;

        let aiResponseText = '';
        if (isUsingGeminiAgent) {
            // Handle Pro Image key requirement if needed
            if (geminiModelId === 'gemini-3-pro-image-preview' && window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
                 await window.aistudio.openSelectKey();
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: geminiModelId,
                contents: text,
                config: { systemInstruction }
            });
            aiResponseText = response.text || '';
            modelId = geminiModelId;
        } else {
            try {
                aiResponseText = await callOpenRouter(modelId, text, systemInstruction);
            } catch (e) {
                const orchestratorModel = settings.useProOrchestrator ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const fallback = await ai.models.generateContent({
                    model: orchestratorModel,
                    contents: text,
                    config: { systemInstruction }
                });
                aiResponseText = fallback.text || '';
                modelId = `${orchestratorModel} (Fallback)`;
            }
        }

        const artifacts: Artifact[] = [];
        const codeBlocks = aiResponseText.match(/```(?:php|javascript|css|json|html|jsx)?\n([\s\S]*?)\n```/g) || [];
        
        codeBlocks.forEach(block => {
            const content = block.replace(/```[a-z]*\n/i, '').replace(/\n```/g, '');
            const scan = scanSecurity(content);
            artifacts.push({
                type: block.includes('json') ? 'json' : 'code',
                title: 'Generated Snippet',
                content: content,
                securityPass: scan.pass,
                securityIssues: scan.issues
            });
        });

        const jsonMatch = aiResponseText.match(/---KB_UPDATE---([\s\S]*?)---------------/) || aiResponseText.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && activeAgent === 'architect') {
            try {
              const data = JSON.parse(jsonMatch[1]);
              setProjectContext(prev => ({ ...prev, structure: data, lastAgentUpdate: 'architect' }));
            } catch(e) {}
        } else if (jsonMatch && activeAgent === 'visionary') {
            // Specific Visionary updates for layout/visuals
            try {
                const data = JSON.parse(jsonMatch[1]);
                if (data.layoutSettings) {
                    setProjectContext(prev => ({ 
                        ...prev, 
                        visuals: { 
                            ...prev.visuals, 
                            contentWidth: data.layoutSettings.contentWidth,
                            pageLayout: data.layoutSettings.pageLayout
                        } 
                    }));
                }
            } catch(e) {}
        }

        setChatHistory(prev => [...prev, {
            id: Date.now().toString(),
            role: MessageRole.AI,
            agent: isUsingGeminiAgent ? 'visionary' : activeAgent,
            text: aiResponseText.replace(/---KB_UPDATE---[\s\S]*?---------------/, '').trim(),
            timestamp: Date.now(),
            artifacts: artifacts,
            routing: {
                modelId,
                category,
                confidence,
                latency: Date.now() - startTime
            }
        }]);

    } catch (error: any) {
        setChatHistory(prev => [...prev, { id: Date.now().toString(), role: MessageRole.AI, agent: 'system', text: `Error: ${error.message}`, timestamp: Date.now() }]);
    } finally {
        setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-nexus-dark text-slate-200 font-sans selection:bg-nexus-500/30">
      <aside className="w-20 lg:w-64 bg-nexus-darker border-r border-slate-800 flex flex-col shrink-0 z-30">
        <div className="p-4 lg:p-6 border-b border-slate-800 flex items-center justify-center lg:justify-start gap-3">
          <div className="bg-nexus-600 p-2 rounded-lg shadow-lg shadow-nexus-600/20">
             <Box className="w-5 h-5 text-white" />
          </div>
          <div className="hidden lg:block">
            <span className="text-white font-bold text-lg tracking-tight block">WP Architect</span>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Elementor Native</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-2 relative overflow-y-auto no-scrollbar">
            <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:block">Orchestration</div>
            <NavBtn icon={<Layers size={20}/>} label="Architect" sub="MoA Planner" active={activeAgent === 'architect' && activeTab === 'builder'} onClick={() => handleSwitchAgent('architect')} color="text-nexus-500" />
            <NavBtn icon={<PenTool size={20}/>} label="Dan Kennedy" sub="Sales Agent" active={activeAgent === 'copywriter' && activeTab === 'builder'} onClick={() => handleSwitchAgent('copywriter')} color="text-yellow-500" />
            <NavBtn icon={<Eye size={20}/>} label="Nano Banana" sub="Designer" active={activeAgent === 'visionary' && activeTab === 'builder'} onClick={() => handleSwitchAgent('visionary')} color="text-purple-500" />

            <div className="px-3 mt-8 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:block">System</div>
            <NavBtn icon={<FileText size={20}/>} label="Project Spec" active={activeTab === 'prd'} onClick={() => setActiveTab('prd')} color="text-emerald-400" />
            <NavBtn icon={<Settings size={20}/>} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} color="text-nexus-400" />
            <NavBtn icon={<BookOpen size={20}/>} label="Tutorial" active={activeTab === 'tutorial'} onClick={() => setActiveTab('tutorial')} color="text-amber-400" />
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className={`rounded-xl p-3 text-[10px] border transition-all ${settings.openRouterKey ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${settings.openRouterKey ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="font-bold uppercase tracking-widest">{settings.openRouterKey ? 'System Ready' : 'Setup Required'}</span>
                </div>
            </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-nexus-dark">
        <header className="h-16 bg-nexus-surface/30 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
             <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                {activeTab === 'builder' ? (
                    <>
                        {activeAgent === 'architect' && <Layers size={16} className="text-nexus-500"/>}
                        {activeAgent.charAt(0).toUpperCase() + activeAgent.slice(1)} Channel
                    </>
                ) : activeTab === 'settings' ? 'System Settings' : activeTab === 'prd' ? 'Orchestration Logs' : activeTab === 'tutorial' ? 'System Manual' : 'Project Manual'}
             </h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-nexus-surface/50 border border-slate-800 rounded-full">
                 <div className={`w-1.5 h-1.5 rounded-full ${settings.useProOrchestrator ? 'bg-yellow-500' : 'bg-nexus-500'}`}></div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{settings.useProOrchestrator ? 'Pro MoA' : 'Flash MoA'}</span>
             </div>
             {activeTab === 'builder' && projectContext.structure && (
                 <button onClick={() => {}} className="flex items-center gap-2 text-xs font-bold bg-nexus-600 hover:bg-nexus-500 text-white px-4 py-2 rounded-xl transition-all shadow-xl">
                    <Download size={14} /> <span>Export Elementor Data</span>
                 </button>
             )}
          </div>
        </header>

        {activeTab === 'builder' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0 divide-x divide-slate-800/50">
            <ChatInterface history={chatHistory} onSendMessage={handleSendMessage} isProcessing={isProcessing} activeAgent={activeAgent} />
            <div className="hidden lg:block h-full bg-slate-900/40 p-4 overflow-hidden">
                 <LivePreview context={projectContext} isProcessing={isProcessing} />
            </div>
          </div>
        )}

        {activeTab === 'prd' && (
            <div className="flex-1 overflow-y-auto bg-nexus-dark p-8 custom-scrollbar">
                <div className="max-w-4xl mx-auto pb-20">
                    <PrdOverview />
                    <div className="my-10 border-t border-slate-800"></div>
                    <PrdFunctional />
                </div>
            </div>
        )}

        {activeTab === 'tutorial' && <TutorialView settings={settings} />}

        {activeTab === 'settings' && <SettingsPanel settings={settings} onSave={saveSettings} />}
      </main>
    </div>
  );
}

const NavBtn = ({ icon, label, sub, active, onClick, color }: any) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${active ? 'bg-white/5 text-white shadow-xl ring-1 ring-white/10' : 'text-slate-500 hover:text-slate-300'}`}>
    <div className={`${active ? color : 'group-hover:text-slate-300'} transition-colors`}>{icon}</div>
    <div className="hidden lg:block text-left">
        <div className="font-bold text-xs tracking-tight">{label}</div>
        {sub && <div className="text-[9px] opacity-40 font-mono tracking-tighter uppercase">{sub}</div>}
    </div>
  </button>
);

export default App;
