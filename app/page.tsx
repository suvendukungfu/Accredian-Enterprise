"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { AccredianEdge } from "@/components/home/AccredianEdge";
import { Programs } from "@/components/home/Programs";
import { CATFramework } from "@/components/home/CATFramework";
import { LearningJourney } from "@/components/home/LearningJourney";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQs } from "@/components/home/FAQs";
import { CTABanner } from "@/components/home/CTABanner";
import { LeadFormModal } from "@/components/home/LeadFormModal";
import { useApp } from "@/app/providers";

export default function Home() {
  const { isLeadModalOpen, openLeadModal, closeLeadModal, showToast } = useApp();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Header Navigation */}
      <Navbar onOpenEnquireModal={openLeadModal} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenEnquireModal={openLeadModal} />

        {/* Client Logos / Partnerships */}
        <TrustedCompanies />

        {/* Track Record Stats */}
        <SuccessMetrics />

        {/* Why Partner - The Accredian Edge */}
        <AccredianEdge />

        {/* Co-Created Curriculums / Executive Programs */}
        <Programs onOpenEnquireModal={openLeadModal} />

        {/* CAT Framework */}
        <CATFramework />

        {/* 3-Step Learning Journey / How It Works */}
        <LearningJourney />

        {/* Client Testimonials */}
        <Testimonials />

        {/* Tabbed Accordion FAQs */}
        <FAQs />

        {/* Conversion CTA Banner */}
        <CTABanner onOpenEnquireModal={openLeadModal} />
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Lead Capture Modal Form */}
      <LeadFormModal
        isOpen={isLeadModalOpen}
        onClose={closeLeadModal}
        onShowToast={showToast}
      />
    </div>
  );
}
