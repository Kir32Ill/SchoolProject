export interface AnalyticsData {
  total_spend_galactic: number; 
  rows_affected: number;    
  average_spend_galactic: number;
  big_spent_civ: string;      
  less_spent_civ: string;    
  big_spent_value: number;     
  less_spent_value: number;
  big_spent_day: number;      
  less_spent_day: number;      
  big_spent_at?: string;      
  less_spent_at?: string;     
}