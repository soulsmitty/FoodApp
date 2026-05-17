'use client';
import { create } from 'zustand';

export interface ScanResult {
  id?: string;
  foodName: string;
  category: string;
  healthGrade: string;
  gradeScore: number;
  gradeLabel: string;
  gradeSummary: string;
  badges: Array<{ label: string; type: 'positive' | 'negative' | 'neutral' }>;
  nutrition: {
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    fiber_g: number;
    sugar_g: number;
    sodium_mg: number;
  };
  hacks: {
    storage: string[];
    preservation: string[];
    warnings: string[];
    proTips: string[];
    shelfLife: Record<string, string>;
  } | null;
  qualityNote: string;
  confidence: number;
  imagePreview?: string;
}

interface ScanStore {
  currentScan: ScanResult | null;
  recentScans: ScanResult[];
  isScanning: boolean;
  scanMode: 'vision' | 'barcode';
  setScan: (result: ScanResult) => void;
  clearScan: () => void;
  setScanning: (v: boolean) => void;
  setScanMode: (mode: 'vision' | 'barcode') => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  currentScan: null,
  recentScans: [],
  isScanning: false,
  scanMode: 'vision',
  setScan: (result) =>
    set((state) => ({
      currentScan: result,
      recentScans: [result, ...state.recentScans.slice(0, 9)],
    })),
  clearScan: () => set({ currentScan: null }),
  setScanning: (v) => set({ isScanning: v }),
  setScanMode: (mode) => set({ scanMode: mode }),
}));
