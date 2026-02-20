
import React from 'react';

export type AgentType = 'architect' | 'copywriter' | 'visionary' | 'system' | 'security';

export enum MessageRole {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system'
}

export type TaskCategory = 'architecture' | 'php_logic' | 'frontend_css' | 'security_review' | 'general';

export interface RoutingStats {
    modelId: string;
    category: TaskCategory;
    confidence: number;
    latency?: number;
    securityScore?: number;
}

export interface Artifact {
  type: 'code' | 'preview' | 'json';
  title: string;
  content: string;
  language?: string;
  securityPass?: boolean;
  securityIssues?: string[];
}

export interface Attachment {
  type: 'image' | 'text';
  content: string; // Base64 for images, text string for text files
  mimeType: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  agent?: AgentType;
  artifacts?: Artifact[];
  attachments?: Attachment[];
  routing?: RoutingStats;
}

export interface AppSettings {
  openRouterKey: string;
  model: 'gemini-3-flash-preview' | 'gemini-3-pro-preview'; 
  useProOrchestrator: boolean;
  useProDesigner: boolean;
  useNanoBanana: boolean;
  integrations: {
    elementor: boolean;
    woocommerce: boolean;
    acf: boolean;
    gutenberg: boolean;
    divi: boolean;
    fluent_crm: boolean;
    fluent_forms: boolean;
    fluent_smtp: boolean;
  };
}

export interface ProjectVersion {
    id: string;
    timestamp: number;
    name: string;
    data: GeneratedAppData;
}

export interface ProjectContext {
    structure: GeneratedAppData | null;
    copyDeck: {
        headline?: string;
        subheadline?: string;
        bodyCopy?: string;
        cta?: string;
        fullMarkdown?: string;
    };
    visuals: {
        primaryColor?: string;
        secondaryColor?: string;
        fontPairing?: string;
        imageStyle?: string;
        contentWidth?: number;
        pageLayout?: 'boxed' | 'full-width';
    };
    lastAgentUpdate: AgentType | null;
}

export interface GeneratedAppData {
  pluginName: string;
  siteName: string;
  tagline: string;
  description?: string;
  cpts: string[];
  taxonomies?: string[];
  features?: string[];
  colors?: {
    primary: string;
    secondary: string;
  };
  layoutSettings?: {
    contentWidth: number; // Elementor standard default is 1140
    widgetsSpace: number; // Elementor standard default is 20
    pageLayout: 'boxed' | 'full-width';
  };
  adminMenuOrder?: string[];
  fluentForms?: Array<{ title: string; fields: string[] }>;
}
