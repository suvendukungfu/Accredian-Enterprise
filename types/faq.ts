export type FAQCategory = "About the Course" | "About the Delivery" | "Miscellaneous";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}
