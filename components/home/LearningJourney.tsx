"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Users, PenTool, Award, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "1-on-1 Diagnostic Audit",
    subtitle: "Human Solution Architects",
    description:
      "Our senior tech leads meet with your engineering directors and L&D teams to audit your current tech stack, review production codebases, and map out realistic skill targets.",
    icon: <Users className="w-6 h-6" />,
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    number: "02",
    title: "Co-Authored Curriculum",
    subtitle: "Tailored to Your Production Stack",
    description:
      "We build custom course modules using your company's actual datasets, internal SDKs, and workflow protocols — ensuring 100% relevance from Day 1.",
    icon: <PenTool className="w-6 h-6" />,
    color: "#6366F1",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  {
    number: "03",
    title: "Live Mentorship & Code Reviews",
    subtitle: "Agile Sprints & Certification",
    description:
      "Cohorts work in live masterclasses with industry practitioners, receive 1-on-1 code reviews on capstone builds, and get post-program outcome reports.",
    icon: <Award className="w-6 h-6" />,
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
];

// Canvas Starfield & Nebula Particle Background
const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      color: string = "";
      opacity: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial random spread
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = -(Math.random() * 0.4 + 0.1);
        this.opacity = Math.random() * 0.5 + 0.1;
        const colors = ["#3B82F6", "#6366F1", "#A78BFA", "#10B981"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.opacity;
        c.shadowBlur = 4;
        c.shadowColor = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 50 }, () => new Particle());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint background grid
      ctx.strokeStyle = "rgba(51, 65, 85, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

// Cinematic staggered intro animation values
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
    },
  },
};

interface CardProps {
  step: typeof JOURNEY_STEPS[0];
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}

const InteractiveCard: React.FC<CardProps> = ({ step, index, isActive, onHover }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation to maximum 6 degrees for smooth premium feel
    setRotateX(-y / (rect.height / 12));
    setRotateY(x / (rect.width / 12));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)", scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring" as const,
        stiffness: 60,
        damping: 14,
        delay: index * 0.15,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isActive ? 1.04 : isHovered ? 1.02 : 0.96,
        opacity: isActive ? 1 : 0.45,
        filter: isActive ? "blur(0px)" : "blur(1px)",
      }}
      className={`relative bg-slate-900/40 border backdrop-blur-2xl p-8 rounded-3xl flex flex-col justify-between transition-all duration-500 group shadow-xl ${
        isActive
          ? "border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
          : "border-slate-800/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* Dynamic Glow Spotlight Backdrop */}
      <div
        className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${step.glowColor}, transparent 70%)`,
        }}
      />

      {/* Edge border reflection highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-600/30 to-transparent pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-7">
          {/* Animated Glowing Icon Ring */}
          <div
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-slate-900 border-slate-600 text-white scale-110 shadow-lg"
                : "bg-slate-950/60 border-slate-800/80 text-slate-500"
            }`}
            style={{
              borderColor: isActive ? step.color : undefined,
              boxShadow: isActive ? `0 0 20px ${step.glowColor}` : undefined,
            }}
          >
            <motion.div
              animate={
                isActive
                  ? { scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }
                  : { scale: 1, rotate: 0 }
              }
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {step.icon}
            </motion.div>
          </div>

          {/* Milestone Number Badge with pulse ripple */}
          <div className="relative">
            <span
              className={`w-10 h-10 rounded-full border font-bold flex items-center justify-center text-[13px] transition-all duration-500 ${
                isActive
                  ? "text-white border-transparent bg-linear-to-br"
                  : "text-slate-500 border-slate-800/80 bg-slate-950/40"
              }`}
              style={{
                backgroundImage: isActive
                  ? `linear-gradient(135deg, ${step.color}, #4f46e5)`
                  : undefined,
                boxShadow: isActive ? `0 0 15px ${step.glowColor}` : undefined,
              }}
            >
              {step.number}
            </span>

            {/* Ripple effect */}
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-full border pointer-events-none"
                style={{ borderColor: step.color }}
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.5 }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
              />
            )}
          </div>
        </div>

        <div
          className={`text-[11px] uppercase font-bold tracking-[0.12em] mb-1.5 transition-colors duration-300`}
          style={{ color: isActive ? step.color : "#64748B" }}
        >
          {step.subtitle}
        </div>
        <h3 className="text-[18px] font-bold text-white mb-3 leading-snug transition-colors group-hover:text-white">
          {step.title}
        </h3>
        <p className="text-[13px] text-slate-400 leading-[1.65] group-hover:text-slate-300 transition-colors">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// Apple/Stripe-level CTA Button with magnetic displacement
const MagneticButton: React.FC<{
  onClick: () => void;
  unlocked: boolean;
}> = ({ onClick, unlocked }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // 35% magnetic pull displacement
    setPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring" as const, stiffness: 150, damping: 15 }}
      className={`relative inline-flex items-center gap-2.5 h-12 px-6 rounded-2xl font-bold text-[13.5px] shadow-lg transition-all active:scale-[0.97] group cursor-pointer ${
        unlocked
          ? "bg-white text-[#0F172A] hover:bg-slate-50 hover:shadow-xl"
          : "bg-slate-800 text-slate-500 border border-slate-700/80 cursor-not-allowed"
      }`}
      disabled={!unlocked}
    >
      {/* Unlocked animated shiny effect */}
      {unlocked && (
        <span className="absolute inset-0 w-full h-full rounded-2xl bg-linear-to-r from-blue-500/0 via-white/20 to-blue-500/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      )}

      <span>{unlocked ? "Book Diagnostic Audit" : "Scroll to Unlock Journey"}</span>
      <ArrowRight
        className={`w-4 h-4 transition-transform duration-300 ${
          unlocked ? "text-blue-600 group-hover:translate-x-1" : "text-slate-600"
        }`}
      />
    </motion.button>
  );
};

interface LearningJourneyProps {
  onOpenEnquireModal: (options?: { domain?: string; message?: string }) => void;
}

export const LearningJourney: React.FC<LearningJourneyProps> = ({ onOpenEnquireModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ctaUnlocked, setCtaUnlocked] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Monitor scrollYProgress inside the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform connectors drawing path values
  const path1Length = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);
  const path2Length = useTransform(scrollYProgress, [0.52, 0.72], [0, 1]);

  // Compute energy beam pulse coordinate positions
  const energyX1 = useTransform(scrollYProgress, [0.35, 0.52], ["16.6%", "50%"]);
  const energyX2 = useTransform(scrollYProgress, [0.52, 0.72], ["50%", "83.3%"]);

  // Opacity of energy beam pulse
  const path1Opacity = useTransform(scrollYProgress, [0.35, 0.36, 0.51, 0.52], [0, 1, 1, 0]);
  const path2Opacity = useTransform(scrollYProgress, [0.52, 0.53, 0.71, 0.72], [0, 1, 1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine active steps based on scrolling position
    if (latest < 0.42) {
      setActiveIndex(0);
    } else if (latest >= 0.42 && latest < 0.62) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
      setCtaUnlocked(true);
    }
  });

  // Track cursor position inside cards for spotlight glow backdrop effect
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.querySelectorAll(".group").forEach((element) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (element as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (element as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-24 sm:py-32 bg-[#0A0F1D] text-white relative overflow-hidden transition-colors duration-1000"
    >
      {/* Awwwards dynamic starry / grid canvas background */}
      <AmbientBackground />

      {/* Floating Volumetric Blur Lights */}
      <div className="absolute top-1/4 left-1/4 w-87.5 h-87.5 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-87.5 h-87.5 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center flex flex-col items-center mb-24"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[12px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Human-Centric Methodology</span>
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-[36px] sm:text-[44px] md:text-[54px] font-extrabold text-white tracking-[-0.03em] leading-[1.05]"
          >
            How We Partner:{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Human-Led Growth
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-[16px] sm:text-[17px] text-slate-400 max-w-2xl leading-[1.65]"
          >
            Real engineers, real mentors, and customized production projects. No pre-recorded videos or automated bot grading.
          </motion.p>
        </motion.div>

        {/* Steps Grid Wrapper with connecting line */}
        <div className="relative mb-20">
          {/* Animated SVG Path Connector (Desktop Only) */}
          <svg className="hidden md:block absolute top-14 left-0 w-full h-4 z-0 pointer-events-none" overflow="visible">
            {/* Background Route base paths */}
            <line x1="16.6%" y1="8" x2="50%" y2="8" stroke="#1E293B" strokeWidth="2" strokeDasharray="5 7" />
            <line x1="50%" y1="8" x2="83.3%" y2="8" stroke="#1E293B" strokeWidth="2" strokeDasharray="5 7" />

            {/* Glowing Active Route drawing overlays */}
            <motion.line
              x1="16.6%"
              y1="8"
              x2="50%"
              y2="8"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="5 7"
              style={{ pathLength: path1Length }}
            />
            <motion.line
              x1="50%"
              y1="8"
              x2="83.3%"
              y2="8"
              stroke="#6366F1"
              strokeWidth="2"
              strokeDasharray="5 7"
              style={{ pathLength: path2Length }}
            />

            {/* Dynamic Energy Beam Pulse overlay circles */}
            <motion.circle
              r="4.5"
              fill="#3B82F6"
              style={{ cx: energyX1, cy: 8, opacity: path1Opacity }}
              className="shadow-lg shadow-blue-500/50"
            />
            <motion.circle
              r="4.5"
              fill="#6366F1"
              style={{ cx: energyX2, cy: 8, opacity: path2Opacity }}
              className="shadow-lg shadow-indigo-500/50"
            />
          </svg>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => (
              <InteractiveCard
                key={step.number}
                step={step}
                index={idx}
                isActive={hoveredCard !== null ? hoveredCard === idx : activeIndex === idx}
                onHover={setHoveredCard}
              />
            ))}
          </div>
        </div>

        {/* Section bottom CTA actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-slate-400">
            <ShieldCheck className={`w-4 h-4 transition-colors duration-500 ${ctaUnlocked ? "text-emerald-400" : "text-slate-600"}`} />
            <span>
              {ctaUnlocked
                ? "Bespoke executive program path unlocked."
                : "Continue scrolling to unlock bespoke curriculum path."}
            </span>
          </div>

          <MagneticButton
            onClick={() =>
              onOpenEnquireModal({
                message: "Inquiring about diagnostic audits and co-authored curriculum options.",
              })
            }
            unlocked={ctaUnlocked}
          />
        </motion.div>
      </Container>
    </section>
  );
};
