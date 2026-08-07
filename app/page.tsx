"use client";

/**
 * Accredian Enterprise Main Platform Page
 * Next.js App Router Page Layout — Vercel / Linear Design Edition
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
import { DataVizSection } from "@/components/home/DataVizSection";
import { UseCasesSection } from "@/components/home/UseCasesSection";
import { CATFramework } from "@/components/home/CATFramework";
import { ComparisonMatrix } from "@/components/home/ComparisonMatrix";
import { CaseStudies } from "@/components/home/CaseStudies";
import { LearningJourney } from "@/components/home/LearningJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQs } from "@/components/home/FAQs";
import { CTABanner } from "@/components/home/CTABanner";
import { LeadFormModal } from "@/components/home/LeadFormModal";
import { CommandPalette } from "@/components/common/CommandPalette";
import { FloatingCTA } from "@/components/common/FloatingCTA";
import { ReadingProgress } from "@/components/common/ReadingProgress";
import { BackToTop } from "@/components/common/BackToTop";
import { motion } from "framer-motion";
import { useApp } from "@/app/providers";
import { ExecutiveProgram } from "@/types/program";

export default function Home() {
  const { isLeadModalOpen, openLeadModal, closeLeadModal, showToast } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<ExecutiveProgram | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleSelectProgram = (program: ExecutiveProgram) => {
    setSelectedProgram(program);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFBFD] text-[#0F172A] antialiased transition-colors relative overflow-hidden">
      {/* Global FAANG-level Ambient Background Grid & Volumetric Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Delicate dotted grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:48px_48px] opacity-45" />
        
        {/* Soft breathing lighting blobs */}
        <motion.div
          animate={{
            x: [0, 45, -25, 0],
            y: [0, -55, 35, 0],
            scale: [1, 1.12, 0.92, 1]
          }}
          transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -35, 45, 0],
            y: [0, 45, -35, 0],
            scale: [1, 0.92, 1.08, 1]
          }}
          transition={{ repeat: Infinity, duration: 28, ease: "easeInOut", delay: 2 }}
          className="absolute top-[35%] -left-40 w-[550px] h-[550px] rounded-full bg-indigo-100/25 blur-[125px]"
        />
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, 30, -40, 0],
            scale: [1, 1.08, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 32, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-40 right-20 w-[600px] h-[600px] rounded-full bg-violet-100/20 blur-[140px]"
        />
      </div>

      {/* Top Reading Scroll Progress Indicator */}
      <ReadingProgress />

      {/* Sticky Header Navigation */}
      <Navbar
        onOpenEnquireModal={() => openLeadModal()}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="grow">
        {/* Hero Section with 3D Canvas */}
        <Hero
          onOpenEnquireModal={() => openLeadModal()}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        {/* Client Logos / Continuous 60fps Marquee */}
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

        {/* Recharts Interactive Data Visualization Section */}
        <DataVizSection />

        {/* Tabbed Industry Sectors Served */}
        <UseCasesSection onOpenEnquireModal={(options) => openLeadModal(options)} />

        {/* CAT Framework */}
        <CATFramework />

        {/* Enterprise Comparison Matrix */}
        <ComparisonMatrix onOpenEnquireModal={() => openLeadModal()} />

        {/* Case Studies Spotlight */}
        <CaseStudies onOpenEnquireModal={(options) => openLeadModal(options)} />

        {/* 3-Step Learning Journey / How It Works */}
        <LearningJourney onOpenEnquireModal={(options) => openLeadModal(options)} />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Tabbed Accordion FAQs */}
        <FAQs />

        {/* Conversion CTA Banner */}
        <CTABanner onOpenEnquireModal={() => openLeadModal()} />
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Floating CTA Capsule */}
      <FloatingCTA
        onOpenEnquireModal={() => openLeadModal()}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Smooth Back to Top Scroll Button */}
      <BackToTop />

      {/* Command Palette Spotlight Search Modal (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenEnquireModal={(options) => openLeadModal(options)}
      />

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
