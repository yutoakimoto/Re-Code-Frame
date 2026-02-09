import React from 'react';
import { EstimateOption } from './types';
import { 
  Globe, Smartphone, Layout, 
  Database, ShieldCheck, CreditCard, Bot, 
  Search, Users, Mail, BarChart3,
  RefreshCw, Palette, ShoppingBag, Server, FileCode, Layers
} from 'lucide-react';

export const BASE_PRICES: Record<string, number> = {
  web: 400000,      // Webシステム
  app: 700000,      // スマホアプリ
  migration: 500000, // システム刷新
  ui_ux: 250000,    // UI/UX改善
  lp: 100000,       // LP/サイト制作
  ec: 450000,       // EC/ポータル
};

// Scale multipliers (based on screen/page count)
export const SCALE_MULTIPLIERS = {
  small: 1.0,
  medium: 1.6,
  large: 2.5,
};

export const DESIGN_COST = 300000; // Fixed cost if design needs to be created from scratch

export const PROJECT_TYPES = [
  { 
    id: 'web', 
    label: 'Web System', 
    icon: <Globe className="w-6 h-6" />, 
    desc: '業務システム・SaaS・マッチングサイト等、ブラウザで動く機能開発。' 
  },
  { 
    id: 'app', 
    label: 'Native App', 
    icon: <Smartphone className="w-6 h-6" />, 
    desc: 'iOS / Androidアプリ開発。プッシュ通知やカメラ連携など。' 
  },
  { 
    id: 'migration', 
    label: 'System Renewal', 
    icon: <RefreshCw className="w-6 h-6" />, 
    desc: '古いシステムの言語刷新、クラウド移行、セキュリティ強化。' 
  },
  { 
    id: 'ui_ux', 
    label: 'UI/UX Redesign', 
    icon: <Palette className="w-6 h-6" />, 
    desc: '機能はそのままに、見た目と使い勝手だけを現代風に改善。' 
  },
  { 
    id: 'ec', 
    label: 'EC / Portal', 
    icon: <ShoppingBag className="w-6 h-6" />, 
    desc: 'ECサイト、メディア、ポータルサイトなどのコンテンツ重視型。' 
  },
  { 
    id: 'lp', 
    label: 'Corp Site / LP', 
    icon: <Layout className="w-6 h-6" />, 
    desc: 'コーポレートサイトや販促用ランディングページ制作。' 
  },
];

export const PROJECT_SCALES = [
  { id: 'small', label: '小規模 (~10画面)', desc: 'LP、MVP、シンプルな管理ツールなど', multiplier: 1.0 },
  { id: 'medium', label: '中規模 (10~30画面)', desc: '一般的なWebサービス、コーポレートサイト', multiplier: 1.6 },
  { id: 'large', label: '大規模 (30画面~)', desc: '多機能なプラットフォーム、複雑な業務システム', multiplier: 2.5 },
];

export const FEATURES: EstimateOption[] = [
  // Basic Logic
  { id: 'auth', label: '会員管理・認証', price: 60000, category: 'feature', icon: 'ShieldCheck', description: 'ログイン、会員ランク、権限管理' },
  { id: 'db', label: 'DB設計・構築', price: 80000, category: 'feature', icon: 'Database', description: '顧客・商品データの複雑な管理' },
  
  // Business Logic
  { id: 'payment', label: '決済・サブスク', price: 120000, category: 'feature', icon: 'CreditCard', description: 'Stripe/カード連携、継続課金' },
  { id: 'search', label: '検索・絞り込み', price: 70000, category: 'feature', icon: 'Search', description: 'キーワード検索、フィルタリング' },
  
  // Modern Tech
  { id: 'ai', label: '生成AI連携 (LLM)', price: 250000, category: 'feature', icon: 'Bot', description: 'ChatGPT API活用、自動応答' },
  { id: 'analytics', label: '分析・KPI', price: 80000, category: 'feature', icon: 'BarChart3', description: 'ダッシュボード、ログ解析' },

  // Admin & Ops
  { id: 'admin', label: '管理画面開発', price: 150000, category: 'feature', icon: 'Users', description: '運営者用CMS、データ編集画面' },
  { id: 'form', label: '高度なフォーム', price: 40000, category: 'feature', icon: 'Mail', description: '条件分岐、ファイル添付、自動通知' },

  // Infra & Migration (Renewal specific)
  { id: 'migration', label: 'データ移行', price: 200000, category: 'feature', icon: 'Layers', description: '旧システムからのデータ移管・整形' },
  { id: 'infra', label: 'クラウド構築', price: 100000, category: 'feature', icon: 'Server', description: 'AWS/GCP環境構築、冗長化' },
  { id: 'legacy', label: 'レガシー解析', price: 150000, category: 'feature', icon: 'FileCode', description: '仕様書がない既存コードの解析' },
  { id: 'api', label: 'API開発連携', price: 90000, category: 'feature', icon: 'Globe', description: '外部システムやアプリとの連携API' },
];

export const MAINTENANCE_COST = 30000; // Monthly