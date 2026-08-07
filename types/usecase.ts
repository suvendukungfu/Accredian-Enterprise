export interface UseCase {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  tags: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  companyName: string;
  companyLogo?: string;
  avatarUrl?: string;
}
