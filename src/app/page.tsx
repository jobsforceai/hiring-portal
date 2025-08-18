"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Check,
  Shield,
  Sparkles,
  Timer,
  BarChart3,
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  GraduationCap,
  Users,
  Rocket,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerParent = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,#2A244A_0%,#0B0B18_60%)] text-white font-sans">
      {/* Decorative Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-indigo-500 via-sky-400 to-fuchsia-500" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-sky-400" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 shadow-md" />
            <span className="text-lg font-semibold tracking-tight">
              Jobsforce Tests
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm/none text-white/80">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how" className="hover:text-white transition">
              How it works
            </a>
            <a href="#categories" className="hover:text-white transition">
              Categories
            </a>
            <a href="#faq" className="hover:text-white transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-white/80 hover:text-white"
            >
              Sign in
            </Button>
            <Button className="bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400 shadow-lg shadow-violet-600/20">
              Get started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                <Sparkles className="h-3.5 w-3.5" />
                Smarter hiring starts with better tests
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Evaluate candidates with{" "}
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                  real‑world
                </span>{" "}
                skills
              </h1>
              <p className="text-white/70 max-w-xl">
                A fast, bias‑aware, and scalable assessment platform tailor‑made
                for Jobsforce hiring. From coding to system design and
                job‑specific scenarios—see who can actually do the work.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400"
                >
                  Create your first test <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10"
                >
                  View sample
                </Button>
              </div>
              {/* Trust signals */}
              <div className="flex items-center gap-6 pt-2 text-white/60">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Anti‑cheat
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" /> Timed sections
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> Rich analytics
                </div>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              className="relative"
            >
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky-400/20 via-purple-500/10 to-fuchsia-500/20 blur-2xl" />
              <Card className="relative rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white/90 text-lg">
                    Live Preview — Coding Test
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/60 p-4">
                    <div className="flex items-center gap-2 text-xs text-white/60 pb-3">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      Candidate session active · Proctoring on
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/40 p-3 text-sm font-mono">
                      {`// Implement a rate limiter for API requests\n// Node.js + Redis pseudocode, O(1) per request\nfunction isAllowed(userId) { /* ... */ }`}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-white/60 mb-1">Score</div>
                      <div className="text-2xl font-semibold">87</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-white/60 mb-1">Speed</div>
                      <div className="text-2xl font-semibold">Top 12%</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="text-xs text-white/60 mb-1">Signal</div>
                      <div className="text-2xl font-semibold">Strong</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights / Stats */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerParent}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Avg. time saved", value: "6.5h/week" },
              { label: "Cheat catch rate", value: "98.7%" },
              { label: "Hiring velocity", value: "2.8×" },
              { label: "Candidate NPS", value: "+61" },
            ].map((i, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
              >
                <div className="text-2xl font-semibold">{i.value}</div>
                <div className="text-white/60 text-sm">{i.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built for hiring that scales
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">
              Craft role‑specific tests in minutes, auto‑proctor sessions, and
              get signal‑rich reports your team can trust.
            </p>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <ClipboardList className="h-5 w-5" />,
                title: "Role‑aware test builder",
                desc: "Use curated templates for MERN, Django, DevOps, and more—then tweak with drag‑and‑drop sections.",
              },
              {
                icon: <Shield className="h-5 w-5" />,
                title: "Smart proctoring",
                desc: "Tab‑switch, face‑away, and copy events are flagged with severity so you can review faster.",
              },
              {
                icon: <Timer className="h-5 w-5" />,
                title: "Timed and adaptive",
                desc: "Dynamic difficulty adapts based on performance to find true skill ceilings.",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />,
                title: "Actionable analytics",
                desc: "See code quality, partial credit, and rubric‑aligned breakdowns at a glance.",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Team workflows",
                desc: "Share links, add reviewers, and sync feedback to your ATS in one click.",
              },
              {
                icon: <Rocket className="h-5 w-5" />,
                title: "Fast to deploy",
                desc: "Invite candidates with one link. Works on desktop, secure on mobile.",
              },
            ].map((f, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <Card className="h-full rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-violet-500/20 border border-white/10">
                      {f.icon}
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/70">{f.desc}</CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              From idea to shortlist in minutes
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">
              Spin up a new role, send a link, and watch qualified candidates
              bubble to the top.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "Create",
                desc: "Pick a template or start from scratch. Customize sections, timing, and weightage.",
              },
              {
                icon: <BadgeCheck className="h-5 w-5" />,
                title: "Invite",
                desc: "Bulk‑send secure invites. Built‑in proctoring and environment checks keep things fair.",
              },
              {
                icon: <GraduationCap className="h-5 w-5" />,
                title: "Assess",
                desc: "Review code diffs, replays, and rubric scores. Export a shortlist to Jobsforce in one click.",
              },
            ].map((s, idx) => (
              <Card
                key={idx}
                className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400/20 to-violet-500/20 border border-white/10">
                    {s.icon}
                  </div>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">{s.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Assessment categories
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">
              Hand‑crafted banks aligned to your roles. Mix and match to mirror
              day‑to‑day work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "MERN / Full‑Stack",
                items: [
                  "APIs & Auth",
                  "DB modeling",
                  "Edge cases",
                  "Debugging",
                ],
              },
              {
                title: "Django / Python",
                items: ["ORM & queries", "Views/DRF", "Caching", "Testing"],
              },
              {
                title: "DevOps Basics",
                items: ["Docker", "CI/CD", "AWS core", "Monitoring"],
              },
              {
                title: "Frontend",
                items: ["Accessibility", "State mgmt", "Performance", "CSS"],
              },
              {
                title: "System Design",
                items: ["Scoping", "Trade‑offs", "Data flow", "Bottlenecks"],
              },
              {
                title: "Data Structures",
                items: ["Hashing", "Greedy", "Graphs", "DP (light)"],
              },
            ].map((c, idx) => (
              <Card
                key={idx}
                className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <CardHeader>
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-2 gap-2 text-white/70 text-sm">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-sky-400" /> {it}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Start assessing in under 5 minutes
                </h3>
                <p className="text-white/70 mt-2 max-w-xl">
                  Plug in your role, pick your sections, and share an invite
                  link. We’ll handle the rest.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-sky-400 to-violet-500 hover:from-sky-300 hover:to-violet-400"
                  >
                    Create a test
                  </Button>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <div className="h-6 w-6 rounded-md bg-white/10 grid place-items-center border border-white/10">
                      ✓
                    </div>
                    No credit card required
                  </div>
                </div>
              </div>
              <form className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
                <div className="text-sm text-white/80 mb-2">
                  Want a guided setup? Leave your email.
                </div>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    className="bg-white/10 border-white/20 placeholder:text-white/50"
                  />
                  <Button>Notify me</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">Frequently asked</h2>
            <p className="text-white/70 mt-3">
              Everything you need to know about fairness, security, and
              integrations.
            </p>
          </motion.div>

          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How do you prevent cheating?</AccordionTrigger>
              <AccordionContent className="text-white/70">
                We combine environment checks, live proctoring signals
                (tab‑switch, copy, face‑away), randomization, and plagiarism
                detection. Suspicious events are flagged with severity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I customize tests for each role?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Yes. Start from curated templates (MERN, Django, DevOps, System
                Design, and more) or assemble sections. Adjust time, difficulty,
                and weighting.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Does it integrate with Jobsforce and our ATS?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                One‑click export to Jobsforce shortlists. We also support
                CSV/JSON exports and webhooks for custom ATS integrations.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What does scoring include?</AccordionTrigger>
              <AccordionContent className="text-white/70">
                Beyond pass/fail, you’ll see correctness, code quality, partial
                credit, time to solve, and rubric‑aligned assessments, plus
                recommended next steps.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-sky-400 to-violet-500" />
              <span>© {new Date().getFullYear()} Jobsforce Tests</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
