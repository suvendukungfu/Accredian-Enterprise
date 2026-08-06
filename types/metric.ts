export interface MetricStat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}
