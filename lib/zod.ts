import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(100, { message: "Name is too long." }),
  email: z
    .string()
    .min(1, { message: "Work email is required." })
    .email({ message: "Please enter a valid work email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: "Please enter a valid phone number format.",
    }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  jobTitle: z
    .string()
    .min(2, { message: "Job title is required." }),
  employees: z.enum(
    ["1-50", "51-200", "201-500", "500-1000", "1000+"],
    {
      message: "Please select your organization size.",
    }
  ),
  domain: z.enum(
    [
      "Generative AI",
      "Leadership Development",
      "Tech & Data",
      "Operations Management",
      "Product Innovation",
      "Digital Business",
      "Fintech",
    ],
    {
      message: "Please select a domain of interest.",
    }
  ),
  message: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
