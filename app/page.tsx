"use client";

/**
 * Accredian Enterprise Main Platform Page
 * Next.js App Router Page Layout
 */
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { AccredianEdge } from "@/components/home/AccredianEdge";
import { Programs } from "@/components/home/Programs";
import { ProgramDrawer } from "@/components/home/ProgramDrawer";
import { ROICalculator } from "@/components/home/ROICalculator";
import { CATFramework } from "@/components/home/CATFramework";
import { ComparisonMatrix } from "@/components/home/ComparisonMatrix";
import { CaseStudies } from "@/components/home/CaseStudies";
import { LearningJourney } from "@/components/home/LearningJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQs } from "@/components/home/FAQs";
import { CTABanner } from "@/components/home/CTABanner";
import { LeadFormModal } from "@/components/home/LeadFormModal";
import { useApp } from "@/app/providers";
import { ExecutiveProgram } from "@/types/program";

export default function Home() {
  const { isLeadModalOpen, openLeadModal, closeLeadModal, showToast } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<ExecutiveProgram | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectProgram = (program: ExecutiveProgram) => {
    setSelectedProgram(program);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header Navigation */}
      <Navbar onOpenEnquireModal={() => openLeadModal()} />

      {/* Main Content Sections */}
      <main className="grow">
        {/* Hero Section */}
        <Hero onOpenEnquireModal={() => openLeadModal()} />

        {/* Client Logos / Partnerships */}
        <TrustedCompanies />

        {/* Track Record Stats */}
        <SuccessMetrics />

        {/* Why Partner - The Accredian Edge */}
        <AccredianEdge />

        {/* Co-Created Curriculums / Executive Programs */}
        <Programs
          onOpenEnquireModal={(options) => openLeadModal(options)}
          onSelectProgram={handleSelectProgram}
        />

        {/* Interactive Enterprise ROI & Capability Estimator */}
        <ROICalculator onOpenEnquireModal={(options) => openLeadModal(options)} />

        {/* CAT Framework */}
        <CATFramework />

        {/* Enterprise Comparison Matrix */}
        <ComparisonMatrix onOpenEnquireModal={() => openLeadModal()} />

        {/* Case Studies Spotlight */}
        <CaseStudies onOpenEnquireModal={(options) => openLeadModal(options)} />

        {/* 3-Step Learning Journey / How It Works */}
        <LearningJourney />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Tabbed Accordion FAQs */}
        <FAQs />

        {/* Conversion CTA Banner */}
        <CTABanner onOpenEnquireModal={() => openLeadModal()} />
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Program Syllabus Slide-Over Drawer */}
      <ProgramDrawer
        program={selectedProgram}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onOpenEnquireModal={(options) => openLeadModal(options)}
      />

      {/* Lead Capture Modal Form */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
        onShowToast={showToast}
      />
    </div>
  );
}
