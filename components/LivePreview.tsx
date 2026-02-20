
import React, { useState } from 'react';
import { ExternalLink, RefreshCw, Smartphone, Monitor, Database, Palette, LayoutDashboard, Globe, Menu, Loader, Maximize, Minimize } from 'lucide-react';
import { GeneratedAppData, ProjectContext } from '../types';

interface LivePreviewProps {
  context: ProjectContext;
  isProcessing: boolean;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ context, isProcessing }) => {
  const [viewMode, setViewMode] = useState<'frontend' | 'admin'>('frontend');

  const generatedData = context.structure;

  if (!generatedData && !isProcessing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-100 rounded-xl border border-slate-300 text-slate-400 shadow-inner">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <LayoutDashboard size={40} className="text-slate-200" />
        </div>
        <h3 className="text-lg font-medium text-slate-600 mb-2">Ready to Build</h3>
        <p className="text-sm opacity-70">Describe your app to generate a preview.</p>
      </div>
    );
  }

  // Loading State
  if (isProcessing && !generatedData) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-nexus-dark/5 rounded-xl border border-slate-300 text-nexus-600 shadow-inner">
             <Loader size={32} className="animate-spin mb-4" />
             <p className="font-mono text-sm animate-pulse">Drafting Structure...</p>
        </div>
      );
  }

  // Guard clause for safety
  if (!generatedData) return null;

  // MERGE LOGIC: Prioritize specific KB updates from Copywriter/Visionary over the base structure
  const displaySiteName = context.copyDeck.headline || generatedData.siteName || "My New Site";
  const displayTagline = context.copyDeck.subheadline || generatedData.tagline || "Built with NexusWP";
  const displayDescription = context.copyDeck.bodyCopy || generatedData.description;
  const displayPrimaryColor = context.visuals.primaryColor || generatedData.colors?.primary || '#2563eb';
  const displaySecondaryColor = context.visuals.secondaryColor || generatedData.colors?.secondary || '#475569';
  
  // Elementor Layout Standards
  const contentWidth = context.visuals.contentWidth || generatedData.layoutSettings?.contentWidth || 1140;
  const pageLayout = context.visuals.pageLayout || generatedData.layoutSettings?.pageLayout || 'boxed';

  const { pluginName, cpts, features, taxonomies } = generatedData;

  return (
    <div className={`h-full flex flex-col bg-slate-200 rounded-xl overflow-hidden border border-slate-400 shadow-2xl relative transition-opacity duration-500 ${isProcessing ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Device Toolbar */}
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        
        {/* View Toggle */}
        <div className="bg-slate-900 rounded-lg p-1 flex text-xs font-medium">
            <button 
                onClick={() => setViewMode('frontend')}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all ${viewMode === 'frontend' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                title="View site frontend"
            >
                <Globe size={14} />
                Frontend
            </button>
            <button 
                onClick={() => setViewMode('admin')}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all ${viewMode === 'admin' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                title="View WP Admin Dashboard"
            >
                <LayoutDashboard size={14} />
                WP Admin
            </button>
        </div>

        <div className="flex items-center gap-3 text-slate-500">
            <div className="flex items-center gap-1 text-[10px] font-mono border-r border-slate-700 pr-3">
               {pageLayout === 'boxed' ? <Minimize size={12}/> : <Maximize size={12}/>}
               {contentWidth}px
            </div>
            <RefreshCw size={14} className="hover:text-white cursor-pointer" title="Refresh Preview"/>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 overflow-hidden bg-white relative">
         {isProcessing && (
             <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center">
                 <div className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-mono flex items-center gap-2">
                     <Loader size={12} className="animate-spin" /> Updating...
                 </div>
             </div>
         )}
         
         {/* --- FRONTEND VIEW --- */}
         {viewMode === 'frontend' && (
             <div className="h-full overflow-y-auto custom-scrollbar">
                 {/* WP Admin Bar Mock */}
                 <div className="h-8 bg-[#1d2327] w-full flex items-center px-4 justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-[11px] text-white/80 font-sans">
                        <span className="font-bold flex items-center gap-1"><span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[9px]">W</span> {displaySiteName}</span>
                        <span>Customize</span>
                        <span className="flex items-center gap-1"><RefreshCw size={10}/> New</span>
                        <span>Edit with Elementor</span>
                    </div>
                    <span className="text-[11px] text-white/80">Howdy, Admin</span>
                 </div>

                 {/* Hero Section */}
                 <header className="py-24 px-8 text-center relative overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
                     <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: displayPrimaryColor }}></div>
                     <div 
                        className="mx-auto" 
                        style={{ 
                            maxWidth: pageLayout === 'boxed' ? `${contentWidth}px` : '100%',
                            width: '100%'
                        }}
                     >
                         <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">{displaySiteName}</h1>
                         <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 font-light">{displayTagline}</p>
                         <div className="flex justify-center gap-4">
                            <button 
                                className="px-6 py-3 rounded-md font-semibold text-white shadow-lg hover:brightness-110 transition-all text-sm"
                                style={{ backgroundColor: displayPrimaryColor }}
                            >
                                Get Started
                            </button>
                            <button className="px-6 py-3 rounded-md font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all text-sm shadow-sm">
                                Learn More
                            </button>
                         </div>
                     </div>
                 </header>

                 <div 
                    className="p-8 mx-auto w-full space-y-16"
                    style={{ 
                        maxWidth: pageLayout === 'boxed' ? `${contentWidth}px` : '100%' 
                    }}
                 >
                     
                     {/* Description / Body Copy */}
                     {displayDescription && (
                       <div className="text-center max-w-3xl mx-auto">
                         <h2 className="text-2xl font-bold text-slate-800 mb-4">The Mission</h2>
                         <p className="text-slate-600 leading-relaxed text-lg">{displayDescription}</p>
                       </div>
                     )}

                     {/* CPTs Display */}
                     {cpts && cpts.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Recent Items</h3>
                                <div className="h-px flex-1 bg-slate-200"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cpts.map((cpt: string, idx: number) => (
                                    <div key={idx} className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300 flex flex-col">
                                        <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/10 transition-colors"></div>
                                            <Database className="text-slate-300 w-12 h-12" />
                                            <span className="absolute bottom-2 right-2 text-[10px] uppercase font-bold text-white px-2 py-0.5 rounded bg-black/50 backdrop-blur">
                                                {cpt}
                                            </span>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h4 className="text-lg font-bold mb-2 capitalize text-slate-800">Sample {cpt} {idx + 1}</h4>
                                            <p className="text-slate-500 text-xs mb-4 flex-1 line-clamp-3">
                                                This is a placeholder for a {cpt} entry. It would contain custom fields generated by the plugin.
                                            </p>
                                            <button 
                                                className="text-xs font-bold uppercase tracking-wide flex items-center gap-1 hover:underline mt-auto"
                                                style={{ color: displayPrimaryColor }}
                                            >
                                                Read More <ExternalLink size={10}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                     )}

                     {/* Feature List */}
                     {features && features.length > 0 && (
                         <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                 <Palette size={18} className="text-slate-400"/>
                                 Included Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: displayPrimaryColor }}></div>
                                        <span className="text-slate-700 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                         </div>
                     )}
                 </div>
                 
                 <footer className="bg-slate-900 text-slate-400 py-8 px-8 text-center mt-20 border-t border-slate-800">
                     <p className="text-sm font-medium text-slate-500">&copy; {new Date().getFullYear()} {displaySiteName}.</p>
                     <p className="text-xs text-slate-700 mt-2">Powered by NexusWP</p>
                 </footer>
             </div>
         )}

         {/* --- ADMIN VIEW --- */}
         {viewMode === 'admin' && (
             <div className="h-full flex bg-[#f0f0f1]">
                {/* Admin Sidebar */}
                <div className="w-40 bg-[#1d2327] text-white flex flex-col shrink-0 overflow-y-auto">
                    <div className="h-12 flex items-center px-3 border-b border-white/10 mb-2">
                        <span className="text-sm font-bold">Dashboard</span>
                    </div>
                    
                    {/* Standard Menu Items */}
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1">Posts</div>
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1">Media</div>
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1">Pages</div>
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1 mb-2">Comments</div>

                    <div className="h-px bg-white/10 mx-3 mb-2"></div>

                    {/* Generated Plugin Menu */}
                    {cpts && cpts.map(cpt => (
                         <div key={cpt} className="group relative">
                             <div className="px-3 py-2 text-[11px] font-semibold text-white bg-[#2271b1] cursor-pointer rounded-sm mx-1 flex items-center justify-between shadow-sm">
                                 <span className="capitalize">{cpt}s</span>
                             </div>
                             {/* Submenu Mock */}
                             <div className="pl-6 pr-2 py-1 space-y-1">
                                 <div className="text-[10px] text-white/60 hover:text-white cursor-pointer">All {cpt}s</div>
                                 <div className="text-[10px] text-white/60 hover:text-white cursor-pointer">Add New</div>
                                 {taxonomies && taxonomies.map(tax => (
                                     <div key={tax} className="text-[10px] text-white/60 hover:text-white cursor-pointer capitalize">{tax}</div>
                                 ))}
                             </div>
                         </div>
                    ))}
                    
                    <div className="h-px bg-white/10 mx-3 my-2"></div>
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1">Appearance</div>
                    <div className="px-3 py-2 text-[11px] text-white/70 hover:bg-[#2271b1] hover:text-white cursor-pointer rounded-sm mx-1">Plugins</div>
                </div>

                {/* Admin Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-medium text-[#1d2327] mb-6 flex items-center gap-4">
                        <span className="capitalize">{cpts ? cpts[0] : 'Plugin'} Dashboard</span>
                        <button className="text-xs border border-[#2271b1] text-[#2271b1] px-2 py-1 rounded hover:bg-[#2271b1] hover:text-white transition-colors">
                            Add New
                        </button>
                    </h2>

                    <div className="bg-white border border-[#c3c4c7] p-0 mb-6 shadow-sm">
                        <div className="flex items-center justify-between p-3 border-b border-[#c3c4c7] bg-slate-50">
                            <div className="flex gap-4 text-xs font-medium text-[#1d2327]">
                                <span className="text-black">All ({cpts ? '3' : '0'})</span>
                                <span className="text-[#2271b1]">Published (3)</span>
                            </div>
                            <div className="flex gap-2">
                                <input type="text" className="border border-[#8c8f94] px-2 py-0.5 text-sm w-32" placeholder="Search" />
                                <button className="border border-[#2271b1] text-[#2271b1] px-2 py-0.5 text-xs rounded">Search</button>
                            </div>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white text-sm text-[#1d2327]">
                                    <th className="p-2 border-b font-medium w-8"><input type="checkbox"/></th>
                                    <th className="p-2 border-b font-medium">Title</th>
                                    <th className="p-2 border-b font-medium">Author</th>
                                    {taxonomies && <th className="p-2 border-b font-medium capitalize">{taxonomies[0]}</th>}
                                    <th className="p-2 border-b font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map((i) => (
                                    <tr key={i} className="hover:bg-slate-50 text-sm">
                                        <th className="p-2 border-b w-8"><input type="checkbox"/></th>
                                        <td className="p-2 border-b text-[#2271b1] font-bold cursor-pointer">
                                            Sample {cpts ? cpts[0] : 'Item'} {i}
                                            <div className="text-[10px] font-normal text-slate-400 opacity-0 group-hover:opacity-100 flex gap-1 mt-1">
                                                <span>Edit</span> | <span>Quick Edit</span> | <span className="text-red-500">Trash</span>
                                            </div>
                                        </td>
                                        <td className="p-2 border-b">admin</td>
                                        {taxonomies && <td className="p-2 border-b text-[#2271b1]">General</td>}
                                        <td className="p-2 border-b text-slate-500">Published<br/>2024/05/2{i}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};
