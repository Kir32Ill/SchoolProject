import { create } from 'zustand';

interface HistoryItem {
  id: string;
  filename: string;
  date: string;
  status: 'success' | 'error';
  data?: {
    rows_affected: number;
    total_spend_galactic: number;
    average_spend_galactic?: number;
  };
  error?: string;
}

interface HistoryState {
  history: HistoryItem[];
  addHistoryItem: (item: Omit<HistoryItem, 'id'>) => void;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

const loadFromLocalStorage = (): HistoryItem[] => {
  const stored = localStorage.getItem('analysisHistory');
  return stored ? JSON.parse(stored) : [];
};

const saveToLocalStorage = (history: HistoryItem[]) => {
  localStorage.setItem('analysisHistory', JSON.stringify(history));
};

export const useHistoryStore = create<HistoryState>((set) => ({
  history: loadFromLocalStorage(),

  addHistoryItem: (item) =>
    set((state) => {
      const newHistory = [...state.history, { ...item, id: Date.now().toString() }];
      saveToLocalStorage(newHistory);
      return { history: newHistory };
    }),

  deleteItem: (id) =>
    set((state) => {
      const newHistory = state.history.filter((item) => item.id !== id);
      saveToLocalStorage(newHistory);
      return { history: newHistory };
    }),

  clearAll: () => {
    localStorage.removeItem('analysisHistory');
    return set({ history: [] });
  },
}));