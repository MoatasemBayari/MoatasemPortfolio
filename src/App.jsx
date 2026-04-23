import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import motorImg from "./assets/MotorInsurancep1.png";
import hrImg from "./assets/HR.png";
import travmotImg from "./assets/MotorTravel.png";
import healImg from "./assets/HealthInsurance.png";
import lifeImg from "./assets/Life.png";

/* ─────────────────────────────────────────────
   THEME & GLOBAL DATA
───────────────────────────────────────────── */
const COLORS = {
  bg: "#070B14",
  surface: "#0D1321",
  card: "#111827",
  border: "#1E2D45",
  accent: "#00D4FF",
  accentGlow: "rgba(0,212,255,0.15)",
  accentDim: "#0099BB",
  gold: "#F5A623",
  text: "#E8EDF5",
  muted: "#6B7A99",
  success: "#10B981",
};

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = [
  { name: "Oracle APEX", level: 90, category: "Backend", icon: "🗄️" },
  { name: "PL/SQL", level: 88, category: "Backend", icon: "💾" },
  { name: "Oracle DB", level: 85, category: "Backend", icon: "🔷" },
  // { name: "React", level: 65, category: "Frontend", icon: "⚛️" },
  { name: "JavaScript", level: 70, category: "Frontend", icon: "🟨" },
  // { name: "Node.js", level: 60, category: "Backend", icon: "🟩" },
  { name: "HTML/CSS", level: 75, category: "Frontend", icon: "🎨" },
  { name: "SQL", level: 90, category: "Backend", icon: "📊" },
  { name: "Git", level: 72, category: "Tools", icon: "🔀" },
  // { name: "REST APIs", level: 68, category: "Backend", icon: "🔌" },
  // { name: "Tailwind CSS", level: 65, category: "Frontend", icon: "💨" },
  { name: "Business Analysis", level: 80, category: "Tools", icon: "📋" },
];

const PROJECTS = [
  // {
  //   id: 1,
  //   title: "Hospital HR System",
  //   subtitle: "Full-Stack Web Application",
  //   description:
  //     "A comprehensive Human Resources management system built for hospital environments. Handles employee lifecycle, payroll management, leave tracking, department assignments, and performance evaluations with a modern React frontend.",
  //   longDescription:
  //     "Designed and developed from scratch to handle the complex HR workflows of medical institutions, including shift scheduling for clinical staff, credential tracking, and compliance reporting.",
  //   tech: ["React", "Node.js", "PostgreSQL", "REST API", "JWT Auth"],
  //   features: [
  //     "Employee onboarding & offboarding workflows",
  //     "Payroll calculation with tax deductions",
  //     "Leave management & approval chains",
  //     "Department hierarchy management",
  //     "Performance review cycles",
  //     "Role-based access control (RBAC)",
  //   ],
  //   color: "#00D4FF",
  //   github: "#",
  //   demo: "#",
  //   category: "React",
  //   status: "In Progress",
  // },
  // {
  //   id: 1,
  //   title: "Insurance Management System",
  //   subtitle: "Enterprise Oracle APEX Platform",
  //   description:
  //     "End-to-end insurance operations platform built on Oracle APEX. Covers policy issuance, claims processing, premium calculations, customer management, and regulatory reporting for an insurance company.",
  //   longDescription:
  //     "Architected the entire database schema and business logic layer using PL/SQL packages. Implemented complex insurance calculation engines and automated workflows for claims adjudication.",
  //   tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "ORDS", "JavaScript"],
  //   features: [
  //     "Policy lifecycle management (issue/renew/cancel)",
  //     "Automated premium calculation engine",
  //     "Claims intake and adjudication workflow",
  //     "Reinsurance treaty management",
  //     "Regulatory compliance reports",
  //     "Customer portal with self-service",
  //   ],
  //   color: "#F5A623",
  //   github: "#",
  //   demo: "#",
  //   category: "Oracle APEX",
  //   status: "Completed"//,
  //   //image: lifeImg
  // },
  // {
  //   id: 3,
  //   title: "Point of Sale System",
  //   subtitle: "Oracle APEX Retail Solution",
  //   description:
  //     "A robust POS system for retail businesses, featuring real-time inventory management, sales transactions, customer loyalty programs, and detailed analytics dashboards — all built within Oracle APEX.",
  //   longDescription:
  //     "Engineered to handle high transaction volumes with optimized PL/SQL procedures. Includes barcode scanning integration, multi-branch support, and end-of-day reconciliation.",
  //   tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "Barcode API", "PDF Reports"],
  //   features: [
  //     "Real-time inventory tracking",
  //     "Multi-payment method processing",
  //     "Customer loyalty & rewards engine",
  //     "Multi-branch inventory sync",
  //     "Sales analytics & forecasting",
  //     "Automated purchase order generation",
  //   ],
  //   color: "#10B981",
  //   github: "#",
  //   demo: "#",
  //   category: "Oracle APEX",
  //   status: "Completed",
  // },
  
  {
    id: 2,
    title: "Motor & Travel Insurance Quotation Portal",
    subtitle: "Oracle APEX Quotation Engine",
    description:
      "A unified quotation platform for motor and travel insurance built on Oracle APEX. Handles vehicle details, trip data, and dynamic premium calculations with real-time validation.",
    longDescription:
      "Implemented full quotation workflows using PL/SQL, including vehicle risk classification, driver profiling, and travel-based pricing models. Integrated business rules for policy constraints and optimized database queries for fast quote generation.",
    tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "ORDS", "JavaScript"],
    features: [
      "Motor insurance quoting with vehicle & driver profiling",
      "Travel insurance quoting based on trip duration & destination",
      "Dynamic premium calculation engine",
      "Validation rules for underwriting constraints",
      "Real-time quote generation",
      "User-friendly interface for agents",
    ],
    color: "#EF4444",
    github: "#",
    demo: "#",
    category: "Oracle APEX",
    status: "Completed",
    image: travmotImg,
  },
  {
    id: 3,
    title: "Life Insurance Quotation Portal",
    subtitle: "Oracle APEX Life Underwriting System",
    description:
      "A life insurance quotation system built on Oracle APEX, designed to calculate premiums based on age, coverage amount, and policy terms.",
    longDescription:
      "Developed PL/SQL-based pricing logic including age bands, sum assured calculations, and policy duration factors. Implemented validation rules for eligibility and ensured accurate premium generation aligned with underwriting guidelines.",
    tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "ORDS", "JavaScript"],
    features: [
      "Life policy quotation based on age & coverage",
      "Flexible term and sum assured selection",
      "Automated premium calculation logic",
      "Eligibility validation rules",
      "Accurate underwriting-based pricing",
      "Streamlined agent input screens",
    ],
    color: "#8B5CF6",
    github: "#",
    demo: "#",
    category: "Oracle APEX",
    status: "Completed",
    image: lifeImg,
  },
  {
    id: 4,
    title: "Health Insurance Quotation Portal",
    subtitle: "Oracle APEX Underwriting System",
    description:
      "A dynamic health insurance quotation platform built on Oracle APEX. Handles plan selection, eligibility validation, and premium calculations based on customer demographics and medical data.",
    longDescription:
      "Developed the full business logic using PL/SQL, including underwriting rules, age-based pricing models, and medical risk factors. Designed optimized database structures and interactive APEX forms to ensure fast, accurate quote generation.",
    tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "ORDS", "JavaScript"],
    features: [
      "Dynamic health plan selection",
      "Eligibility validation based on age & conditions",
      "Automated premium calculation engine",
      "Medical risk assessment rules",
      "Real-time quote generation",
      "Agent-friendly data entry interface",
    ],
    color: "#3B82F6",
    github: "#",
    demo: "#",
    category: "Oracle APEX",
    status: "Completed",
    image: healImg,
  },

];

const EXPERIENCE = [
  {
    role: "Oracle Application Developer (Junior)",
    company: "TechnoSys Group",
    period: "Nov/2024 – Present",
    description:
      "Developing and maintaining enterprise insurance and HR systems using Oracle APEX and PL/SQL, including end-to-end application development, business logic implementation, and system support across multiple domains",
    //"Developing and maintaining enterprise insurance and HR systems using Oracle APEX and PL/SQL. Responsible for building end-to-end applications, implementing business logic, optimizing database performance, and supporting system integrations across Motor, Health, Travel, and HR domains.",
    highlights: [
      "Designed and optimized Oracle database schemas and PL/SQL business logic",
      "Built complete Oracle APEX applications including workflows, dashboards, and approval processes",
      "Implemented automation for policy, quotation, and cancellation request workflows",
      // "Built insurance management system from ground up",
      // "Designed normalized Oracle DB schemas",
      // "Implemented complex PL/SQL business rules",
      // "Delivered full APEX applications end-to-end",
    ],
    tech: ["Oracle APEX", "PL/SQL", "Oracle DB", "SQL"],
   }  //,
  // {
  //   role: "Full-Stack Developer (Learning Path)",
  //   company: "Self-Directed / Personal Projects",
  //   period: "2024 – Present",
  //   description:
  //     "Actively expanding into modern full-stack development, building projects with React and Node.js to complement strong backend and database foundations.",
  //   highlights: [
  //     "Building Hospital HR System with React + Node.js",
  //     "Learning RESTful API design patterns",
  //     "Applying database skills to PostgreSQL",
  //     "Contributing to open-source projects",
  //   ],
  //   tech: ["React", "Node.js", "PostgreSQL", "Git"],
  // },
];

/* ─────────────────────────────────────────────
   UTILITIES & HOOKS
───────────────────────────────────────────── */
const useTypewriter = (words, speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplayed(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setCharIdx(0);
            setWordIdx((w) => (w + 1) % words.length);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
};

const FadeInSection = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   NOISE / GRID BACKGROUND
───────────────────────────────────────────── */
const GridBackground = () => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
);

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 5%",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(7,11,20,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.4s ease",
      }}
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.accent,
          cursor: "pointer",
          letterSpacing: 2,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        &lt;DEV /&gt;
      </motion.div>

      {/* Desktop Links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="nav-desktop">
        {NAV_LINKS.map((link) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            whileHover={{ color: COLORS.accent }}
            style={{
              background: "none",
              border: "none",
              color: COLORS.muted,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              cursor: "pointer",
              letterSpacing: 1,
              transition: "color 0.2s",
            }}
          >
            {link.toUpperCase()}
          </motion.button>
        ))}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "8px 20px",
            background: "transparent",
            border: `1px solid ${COLORS.accent}`,
            borderRadius: 4,
            color: COLORS.accent,
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            textDecoration: "none",
            letterSpacing: 1,
          }}
        >
          RESUME ↓
        </motion.a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-mobile"
        style={{
          background: "none",
          border: "none",
          color: COLORS.text,
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              right: 0,
              background: COLORS.surface,
              borderBottom: `1px solid ${COLORS.border}`,
              padding: "20px 5%",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.text,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 15,
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "8px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                {link}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = () => {
  const typed = useTypewriter(
    ["Oracle APEX Developer", "PL/SQL Engineer", "Database Architect"],
    75,
    2200
  );

  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "120px 5% 80px",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 900, width: "100%", position: "relative" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            color: COLORS.accent,
            fontSize: 14,
            letterSpacing: 4,
            marginBottom: 20,
          }}
        >
          HELLO,— I'M
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(42px, 8vw, 88px)",
            fontWeight: 800,
            lineHeight: 1.05,
            color: COLORS.text,
            margin: "0 0 12px",
            letterSpacing: -2,
          }}
        >
          Moatasem Bayari
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(16px, 3vw, 26px)",
            color: COLORS.muted,
            marginBottom: 28,
            minHeight: 40,
          }}
        >
          <span style={{ color: COLORS.accent }}>{typed}</span>
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: "1em",
              background: COLORS.accent,
              marginLeft: 3,
              verticalAlign: "text-bottom",
              animation: "blink 1s step-end infinite",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            centered: true,
            color: COLORS.muted,
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 600,
            marginBottom: 44,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
        Junior Oracle Application Developer specializing in Oracle APEX and PL/SQL, with hands-on experience building and maintaining enterprise insurance systems including Motor, Health, Travel, and HR modules. Experienced in designing workflows, automating business processes, and developing data-driven web applications using SQL, PL/SQL, HTML, CSS, and JavaScript. Currently working in a production environment delivering scalable solutions and improving system performance through optimization and process digitization..
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <motion.button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.03, boxShadow: `0 0 30px rgba(0,212,255,0.35)` }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px",
              background: COLORS.accent,
              border: "none",
              borderRadius: 4,
              color: "#000",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            VIEW PROJECTS →
          </motion.button>
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.03, borderColor: COLORS.accent, color: COLORS.accent }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 4,
              color: COLORS.muted,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              cursor: "pointer",
              letterSpacing: 1,
              transition: "all 0.2s",
            }}
          >
            ABOUT ME
          </motion.button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{
            display: "flex",
            gap: 40,
            marginTop: 60,
            paddingTop: 40,
            borderTop: `1px solid ${COLORS.border}`,
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "2+", label: "Years Experience" },
            { num: "3+", label: "Projects Delivered" },
            { num: "Oracle", label: "APEX Specialist" },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: COLORS.accent,
                }}
              >
                {stat.num}
              </div>
              <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          color: COLORS.muted,
          fontSize: 11,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: 2,
        }}
      >
        <span>SCROLL</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = ({ tag, title, subtitle }) => (
  <FadeInSection>
    <div style={{ marginBottom: 60 }}>
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          color: COLORS.accent,
          fontSize: 12,
          letterSpacing: 4,
          marginBottom: 12,
        }}
      >
        {tag}
      </p>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 800,
          color: COLORS.text,
          margin: "0 0 16px",
          letterSpacing: -1,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            color: COLORS.muted,
            fontSize: 16,
            maxWidth: 560,
            lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  </FadeInSection>
);

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
const About = () => (
  <section id="about" style={{ padding: "120px 5%", maxWidth: 1200, margin: "0 auto" }}>
    <SectionHeader
      tag="// 01. ABOUT ME"
      title="Who I Am"
      subtitle="A developer who bridges the gap between complex business logic and clean, functional software."
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 40,
        alignItems: "start",
      }}
    >
      <FadeInSection delay={0.1}>
        <div>
          {/* Avatar placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: COLORS.card,
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              marginBottom: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(135deg, rgba(0,212,255,0.08), rgba(245,166,35,0.06))`,
              }}
            />
            👨‍💻
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                background: "rgba(0,0,0,0.7)",
                borderRadius: 6,
                padding: "8px 12px",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                style={{
                  color: COLORS.accent,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  margin: 0,
                }}
              >
                AVAILABLE FOR OPPORTUNITIES
              </p>
            </div>
          </div>

          {/* Quick info */}
          {[
            { icon: "📍", label: "Location", value: "Amman, Jordan" },
            { icon: "🎓", label: "Education", value: "Computer Science / IT" },
            { icon: "💼", label: "Role", value: "Junior Oracle Apex Developer" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: 12,
                padding: "12px 0",
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <div>
                <span style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
                  {item.label}
                </span>
                <p style={{ color: COLORS.text, margin: 0, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <div>
          <p
            style={{
              color: COLORS.text,
              fontSize: 17,
              lineHeight: 1.9,
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 24,
            }}
          >
            I'm a Junior Software Developer with a strong foundation in backend development,
            database architecture, and enterprise business systems. My primary expertise lies in{" "}
            <span style={{ color: COLORS.accent }}>Oracle APEX</span> and{" "}
            <span style={{ color: COLORS.accent }}>PL/SQL</span>, where I've delivered complete
            end-to-end applications for the insurance and healthcare industries.
          </p>
          <p
            style={{
              color: COLORS.muted,
              fontSize: 16,
              lineHeight: 1.9,
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 32,
            }}
          >
What sets me apart is turning complex business workflows into clean, reliable Oracle-based systems. I don’t just write code—I understand how things actually run behind it, whether it’s insurance policies, HR processes, or retail operations. I focus on solid database design, efficient PL/SQL logic, and building scalable solutions in Oracle APEX that actually work in real business environments.
          </p>

          {/* Specialty badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Database Design",
              "Business Analysis",
              "Insurance Systems",
              "PL/SQL Packages",
              "APEX UI Builder",
              "API Integration",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 14px",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 20,
                  color: COLORS.muted,
                  fontSize: 13,
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: 0.5,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SKILLS
───────────────────────────────────────────── */
const SkillBar = ({ name, level, icon, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      style={{ marginBottom: 20 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span style={{ color: COLORS.text, fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
          {icon} {name}
        </span>
        <span
          style={{
            color: COLORS.accent,
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: COLORS.border,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: "100%",
            background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDim})`,
            borderRadius: 2,
            boxShadow: `0 0 8px ${COLORS.accent}`,
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Backend", "Frontend", "Tools"];

  const filtered =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      style={{
        padding: "120px 5%",
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          tag="// 02. SKILLS"
          title="Technical Arsenal"
          subtitle="A blend of deep backend expertise and growing full-stack capabilities."
        />

        {/* Category filters */}
        <FadeInSection delay={0.05}>
          <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 20px",
                  borderRadius: 4,
                  border: `1px solid ${activeCategory === cat ? COLORS.accent : COLORS.border}`,
                  background: activeCategory === cat ? COLORS.accentGlow : "transparent",
                  color: activeCategory === cat ? COLORS.accent : COLORS.muted,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  cursor: "pointer",
                  letterSpacing: 1,
                }}
              >
                {cat.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </FadeInSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 48,
          }}
        >
          <AnimatePresence mode="wait">
            {filtered.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={i * 0.06} />
            ))}
          </AnimatePresence>
        </div>

        {/* Tech logos row */}
        <FadeInSection delay={0.2}>
          <div
            style={{
              marginTop: 60,
              padding: "32px",
              background: COLORS.card,
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                color: COLORS.muted,
                fontSize: 11,
                letterSpacing: 3,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              CORE TECHNOLOGY STACK
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {[
                { name: "Oracle", emoji: "🔷" },
                { name: "APEX", emoji: "⚡" },
                { name: "Oracle DB", emoji: "🗄️" },
                // { name: "React", emoji: "⚛️" },
                // { name: "Node.js", emoji: "🟩" },
                { name: "PL/SQL", emoji: "💾" },
                { name: "Git", emoji: "🔀" },
              ].map((t) => (
                <motion.div
                  key={t.name}
                  whileHover={{ y: -4, color: COLORS.accent }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    color: COLORS.muted,
                    fontSize: 12,
                    fontFamily: "'Space Mono', monospace",
                    cursor: "default",
                  }}
                >
                  <span style={{ fontSize: 28 }}>{t.emoji}</span>
                  {t.name}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={{
        background: COLORS.card,
        borderRadius: 16,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s",
        boxShadow: `0 4px 40px rgba(0,0,0,0.3)`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = project.color + "55")
      }
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
    >
      {/* Screenshot placeholder */}
      <div
        style={{
          height: 200,
          background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: `1px solid ${COLORS.border}`,
          overflow: "hidden",
        }}
      >
        {/* Grid pattern inside card */}
        {
        <div
  style={{
    height: 200,
    position: "relative",
    borderBottom: `1px solid ${COLORS.border}`,
    overflow: "hidden",
  }}
>
  {/* IMAGE */}
  <img
    src={project.image}
    alt={project.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />

  {/* GRID OVERLAY (your existing effect) */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(${project.color}10 1px, transparent 1px),
                        linear-gradient(90deg, ${project.color}10 1px, transparent 1px)`,
      backgroundSize: "30px 30px",
    }}
  />

  {/* STATUS BADGE (keep yours) */}
</div>
        
        /* <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${project.color}10 1px, transparent 1px), linear-gradient(90deg, ${project.color}10 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {project.id === 1 ? "🏥" : project.id === 2 ? "🛡️" : "🛒"}
          </div>
          <p
            style={{
              color: project.color,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
            }}
          >
            SCREENSHOT PLACEHOLDER
          </p>
        </div> */}
        {/* Status badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 20,
            background:
              project.status === "Completed"
                ? "rgba(16,185,129,0.15)"
                : "rgba(245,166,35,0.15)",
            border: `1px solid ${project.status === "Completed" ? COLORS.success : COLORS.gold}`,
            color: project.status === "Completed" ? COLORS.success : COLORS.gold,
            fontSize: 10,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: 1,
          }}
        >
          {project.status.toUpperCase()}
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              color: project.color,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              marginBottom: 6,
            }}
          >
            {project.subtitle.toUpperCase()}
          </p>
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
            }}
          >
            {project.title}
          </h3>
        </div>

        <p
          style={{
            color: COLORS.muted,
            fontSize: 14,
            lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                borderRadius: 4,
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
                color: project.color,
                fontSize: 11,
                fontFamily: "'Space Mono', monospace",
                letterSpacing: 0.5,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expandable features */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: 16,
                  background: COLORS.surface,
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  marginBottom: 20,
                }}
              >
                <p
                  style={{
                    color: COLORS.accent,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 2,
                    marginBottom: 12,
                  }}
                >
                  KEY FEATURES
                </p>
                {project.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      color: COLORS.muted,
                      fontSize: 13,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span style={{ color: project.color }}>→</span>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1,
              padding: "10px 0",
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              borderRadius: 6,
              color: project.color,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              cursor: "pointer",
              letterSpacing: 1,
            }}
          >
            {expanded ? "HIDE DETAILS ↑" : "SHOW DETAILS ↓"}
          </motion.button>
          {/* <motion.a
            href={project.github}
            whileHover={{ scale: 1.05, borderColor: COLORS.accent, color: COLORS.accent }}
            style={{
              padding: "10px 16px",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 6,
              color: COLORS.muted,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              textDecoration: "none",
              letterSpacing: 1,
              transition: "all 0.2s",
            }}
          >
            GITHUB ↗
          </motion.a> */}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────── */
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All"/*, "React"*/, "Oracle APEX"];
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: "120px 5%", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        tag="// 03. PROJECTS"
        title="Selected Work"
        subtitle="Enterprise-grade applications built to solve real business problems."
      />

      {/* Filter tabs */}
      <FadeInSection delay={0.05}>
        <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "8px 22px",
                borderRadius: 4,
                border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
                background: filter === f ? COLORS.accentGlow : "transparent",
                color: filter === f ? COLORS.accent : COLORS.muted,
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                cursor: "pointer",
                letterSpacing: 1,
              }}
            >
              {f.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </FadeInSection>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 28,
        }}
      >
        <AnimatePresence>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────── */
const Experience = () => (
  <section
    id="experience"
    style={{
      padding: "120px 5%",
      background: COLORS.surface,
      borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
    }}
  >
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        tag="// 04. EXPERIENCE"
        title="Career Timeline"
        subtitle="From database specialist to full-stack developer — the journey continues."
      />

      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 12,
            bottom: 12,
            width: 2,
            background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.border})`,
          }}
        />

        {EXPERIENCE.map((exp, i) => (
          <FadeInSection key={exp.role} delay={i * 0.15}>
            <div
              style={{
                paddingLeft: 40,
                paddingBottom: 52,
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: -6,
                  top: 8,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: i === 0 ? COLORS.accent : COLORS.border,
                  border: `2px solid ${COLORS.bg}`,
                  boxShadow: i === 0 ? `0 0 12px ${COLORS.accent}` : "none",
                }}
              />

              <div
                style={{
                  background: COLORS.card,
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  padding: "28px 32px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.accent + "40")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = COLORS.border)
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: COLORS.text,
                        margin: "0 0 4px",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p
                      style={{
                        color: COLORS.accent,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 13,
                        margin: 0,
                      }}
                    >
                      {exp.company}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: "4px 12px",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 20,
                      color: COLORS.muted,
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      letterSpacing: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p
                  style={{
                    color: COLORS.muted,
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: 20,
                  }}
                >
                  {exp.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                  {exp.highlights.map((h) => (
                    <div
                      key={h}
                      style={{
                        display: "flex",
                        gap: 8,
                        color: COLORS.muted,
                        fontSize: 13,
                        fontFamily: "'DM Sans', sans-serif",
                        width: "100%",
                      }}
                    >
                      <span style={{ color: COLORS.accent }}>✓</span>
                      {h}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "4px 10px",
                        background: COLORS.accentGlow,
                        border: `1px solid ${COLORS.accent}30`,
                        borderRadius: 4,
                        color: COLORS.accent,
                        fontSize: 11,
                        fontFamily: "'Space Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
// const Contact = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [sent, setSent] = useState(false);
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  // const handleSubmit = () => {
  //   if (!form.name || !form.email || !form.message) return;
  //   setSent(true);
  //   setTimeout(() => setSent(false), 4000);
  //   setForm({ name: "", email: "", message: "" });
  // };
const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    "service_cjk7fh3",
    "template_mk05nfl",
    {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    },
    "E4cExxnzw10BvfJV1"
  ).then(
    () => {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
};

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <section id="contact" style={{ padding: "120px 5%", maxWidth: 1200, margin: "0 auto" }}>
      <SectionHeader
        tag="// 05. CONTACT"
        title="Let's Connect"
        subtitle="Open for opportunities, collaborations, and interesting conversations."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
        }}
      >
        {/* Info */}
        <FadeInSection delay={0.1}>
          <div>
            <p
              style={{
                color: COLORS.muted,
                fontSize: 16,
                lineHeight: 1.8,
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 36,
              }}
            >
              Whether you have a project in mind, a role to discuss, or just want to talk tech —
              my inbox is always open. I respond within 24 hours.
            </p>

            {[
              { icon: "✉️", label: "Email", value: "Mo3tasembayariwork@gmail.com", href: "mailto:Mo3tasembayariwork@gmail.com" },
              { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/moatasem-bayari/", href: "https://linkedin.com/in/moatasem-bayari/" },
              { icon: "🐙", label: "GitHub", value: "github.com/MoatasemBayari", href: "https://github.com/MoatasemBayari" },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ x: 4, color: COLORS.accent }}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                  textDecoration: "none",
                  color: COLORS.text,
                  transition: "color 0.2s",
                }}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      color: COLORS.muted,
                      margin: "0 0 2px",
                      letterSpacing: 2,
                    }}
                  >
                    {item.label.toUpperCase()}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeInSection>

        {/* Form */}
        <FadeInSection delay={0.2}>
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              padding: "36px",
            }}
          >
            {/* <AnimatePresence mode="wait"> */}
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "40px 0" }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      color: COLORS.success,
                      fontSize: 22,
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p style={{ color: COLORS.muted, fontFamily: "'DM Sans', sans-serif" }}>
                    I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                {/* <motion.div key="form" initial={{ opacity: 1 }}> */}
                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: "block",
                        color: COLORS.muted,
                        fontSize: 12,
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: 2,
                        marginBottom: 8,
                      }}
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                      placeholder="Your Name"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: "block",
                        color: COLORS.muted,
                        fontSize: 12,
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: 2,
                        marginBottom: 8,
                      }}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                      placeholder="your@email.com"
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label
                      style={{
                        display: "block",
                        color: COLORS.muted,
                        fontSize: 12,
                        fontFamily: "'Space Mono', monospace",
                        letterSpacing: 2,
                        marginBottom: 8,
                      }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = COLORS.accent)}
                      onBlur={(e) => (e.target.style.borderColor = COLORS.border)}
                      placeholder="Tell me about your project..."
                      rows={5}
                      style={{ ...inputStyle, resize: "vertical" }}
                    />
                  </div>
                  {/* <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02, boxShadow: `0 0 24px rgba(0,212,255,0.3)` }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: "100%",
                      padding: "14px",
                      background: COLORS.accent,
                      border: "none",
                      borderRadius: 8,
                      color: "#000",
                      fontFamily: "'Space Mono', monospace",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      letterSpacing: 2,
                    }}
                  > */}
                  <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: `0 0 24px rgba(0,212,255,0.3)` }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        padding: "14px",
                        background: COLORS.accent,
                        border: "none",
                        borderRadius: 8,
                        color: "#000",
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        letterSpacing: 2,
                      }}
                    >
                      SEND MESSAGE →
                    </motion.button>
                    {/* SEND MESSAGE →
                  </motion.button> */}
               </form> 
              //  </motion.div>
              )}
            {/* </AnimatePresence> */}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = () => (
  <footer
    style={{
      borderTop: `1px solid ${COLORS.border}`,
      padding: "32px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 16,
    }}
  >
    <p
      style={{
        color: COLORS.muted,
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        letterSpacing: 1,
      }}
    >
      &lt;DEV /&gt; — Built with React & Framer Motion
    </p>
    <p
      style={{
        color: COLORS.muted,
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        letterSpacing: 1,
      }}
    >
      © {new Date().getFullYear()} — All rights reserved
    </p>
  </footer>
);

/* ─────────────────────────────────────────────
   SCROLL TO TOP
───────────────────────────────────────────── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1, boxShadow: `0 0 20px rgba(0,212,255,0.4)` }}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: COLORS.accent,
            border: "none",
            color: "#000",
            fontSize: 18,
            cursor: "pointer",
            zIndex: 99,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  return (
    <div
      style={{
        background: COLORS.bg,
        color: COLORS.text,
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${COLORS.accent}; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
        input::placeholder, textarea::placeholder { color: ${COLORS.muted}; }
      `}</style>

      <GridBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        {/* <Contact /> */}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
