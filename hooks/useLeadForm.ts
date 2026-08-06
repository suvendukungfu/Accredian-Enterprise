"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormData } from "@/lib/zod";
import { submitLeadForm } from "@/lib/api";

export function useLeadForm(onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
      employees: "51-200",
      domain: "Generative AI",
      message: "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    setIsSuccess(false);

    try {
      const response = await submitLeadForm(data);
      if (response.success) {
        setIsSuccess(true);
        form.reset();
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setIsSuccess(false);
    setServerError(null);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    serverError,
    isSuccess,
    resetForm,
  };
}
