'use client';
import { create } from 'zustand';

export interface MacroGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface FoodLogEntry {
  id: string;
  foodName: string;
  category: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  healthGrade: string;
  loggedAt: string;
}

interface MacroStore {
  goals: MacroGoals;
  todayLog: FoodLogEntry[];
  isLoading: boolean;
  fetchToday: () => Promise<void>;
  logFood: (entry: Omit<FoodLogEntry, 'id' | 'loggedAt'>) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  updateGoals: (goals: MacroGoals) => Promise<void>;
  totals: () => { calories: number; protein: number; carbs: number; fat: number; fiber: number };
}

export const useMacroStore = create<MacroStore>((set, get) => ({
  goals: { calories: 2800, protein: 200, carbs: 250, fat: 80, fiber: 35 },
  todayLog: [],
  isLoading: false,

  totals: () => {
    const log = get().todayLog;
    return log.reduce(
      (acc, e) => ({
        calories: acc.calories + e.calories,
        protein: acc.protein + e.protein,
        carbs: acc.carbs + e.carbs,
        fat: acc.fat + e.fat,
        fiber: acc.fiber + e.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
    );
  },

  fetchToday: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/macros');
      const data = await res.json();
      set({ todayLog: data.log ?? [], goals: data.goals ?? get().goals });
    } finally {
      set({ isLoading: false });
    }
  },

  logFood: async (entry) => {
    const res = await fetch('/api/macros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    const data = await res.json();
    if (data.entry) {
      set((state) => ({ todayLog: [...state.todayLog, data.entry] }));
    }
  },

  removeEntry: async (id) => {
    await fetch(`/api/macros?id=${id}`, { method: 'DELETE' });
    set((state) => ({ todayLog: state.todayLog.filter((e) => e.id !== id) }));
  },

  updateGoals: async (goals) => {
    await fetch('/api/macros/goals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goals),
    });
    set({ goals });
  },
}));
