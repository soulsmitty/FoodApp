'use client';
import { create } from 'zustand';

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  healthGrade: string;
  gradeScore: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  addedAt: string;
  expiresAt?: string;
  imageUrl?: string;
}

interface PantryStore {
  items: PantryItem[];
  isLoading: boolean;
  fetchItems: () => Promise<void>;
  addItem: (item: Omit<PantryItem, 'id' | 'addedAt'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
}

export const usePantryStore = create<PantryStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchItems: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/pantry');
      const data = await res.json();
      set({ items: data.items ?? [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    const res = await fetch('/api/pantry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (data.item) {
      set((state) => ({ items: [data.item, ...state.items] }));
    }
  },

  removeItem: async (id) => {
    await fetch(`/api/pantry/${id}`, { method: 'DELETE' });
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  updateQuantity: async (id, quantity) => {
    await fetch(`/api/pantry/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }));
  },
}));
