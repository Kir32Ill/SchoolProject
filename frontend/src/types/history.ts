import type { AnalyticsData } from "./analyticsData";
export interface HistoryItemData {
  id: string;
  fileName: string;
  timestamp: number;
  success: boolean;
  error?: string;
  data?: AnalyticsData;
}