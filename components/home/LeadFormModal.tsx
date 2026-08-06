"use client";

import React from "react";
import { Modal } from "@/components/common/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useLeadForm } from "@/hooks/useLeadForm";
import { User, Mail, Phone, Building2, Briefcase, Send, AlertCircle, CheckCircle2 } from "lucide-react";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string, type?: "success" | "error") => void;
}

const EMPLOYEE_OPTIONS = [
  { label: "1 - 50 Employees", value: "1-50" },
  { label: "51 - 200 Employees", value: "51-200" },
  { label: "201 - 500 Employees", value: "201-500" },
  { label: "500 - 1,000 Employees", value: "500-1000" },
  { label: "1,000+ Employees", value: "1000+" },
];

const DOMAIN_OPTIONS = [
  { label: "Generative AI & LLM Engineering", value: "Generative AI" },
  { label: "Leadership Development", value: "Leadership Development" },
  { label: "Tech & Data Science", value: "Tech & Data" },
  { label: "Operations Management", value: "Operations Management" },
  { label: "Product Innovation", value: "Product Innovation" },
  { label: "Digital Business", value: "Digital Business" },
  { label: "Fintech & Payments", value: "Fintech" },
];

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const handleSuccess = () => {
    onShowToast("Enquiry submitted successfully! Our Enterprise Team will contact you shortly.");
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const { form, onSubmit, isSubmitting, serverError, isSuccess, resetForm } =
    useLeadForm(handleSuccess);

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      title="Partner With Accredian"
      subtitle="Fill out the form below to request a tailored corporate curriculum or schedule an enterprise discovery call."
      maxWidth="xl"
    >
      {isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold text-slate-900">Thank You!</h4>
          <p className="text-slate-600 max-w-sm">
            Your enterprise inquiry has been received. One of our Senior Capability Advisors will reach out to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {serverError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Sarah Jenkins"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="s.jenkins@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              leftIcon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register("phone")}
            />

            <Input
              label="Company Name"
              placeholder="e.g. Acme Enterprises"
              leftIcon={<Building2 className="w-4 h-4" />}
              error={errors.company?.message}
              {...register("company")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Job Title / Designation"
              placeholder="e.g. VP of Learning & Development"
              leftIcon={<Briefcase className="w-4 h-4" />}
              error={errors.jobTitle?.message}
              {...register("jobTitle")}
            />

            <Select
              label="Organization Size"
              options={EMPLOYEE_OPTIONS}
              error={errors.employees?.message}
              {...register("employees")}
            />
          </div>

          <Select
            label="Domain of Interest"
            options={DOMAIN_OPTIONS}
            error={errors.domain?.message}
            {...register("domain")}
          />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lead-message"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 select-none"
            >
              Additional Notes / Requirements (Optional)
            </label>
            <textarea
              id="lead-message"
              rows={3}
              placeholder="Tell us about your team size, timeline, or key objectives..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:border-blue-600 focus:ring-blue-600/20"
              {...register("message")}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
              className="w-full justify-center"
            >
              Submit Enterprise Inquiry
            </Button>
          </div>

          <p className="text-[11px] text-center text-slate-400 pt-1">
            By submitting, you agree to Accredian&apos;s terms & privacy policy. We respect your confidentiality.
          </p>
        </form>
      )}
    </Modal>
  );
};
