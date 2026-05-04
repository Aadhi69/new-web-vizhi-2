"use client";

import { FormEvent, useState } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

type Errors = {
  name?: string;
  email?: string;
  description?: string;
};

const projectTypes = ["AR Glass Pilot", "Production Deployment", "Partnership"];

export default function ContactPage() {
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const description = String(form.get("description") || "").trim();
    const nextErrors: Errors = {};

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email.";
    if (!description)
      nextErrors.description = "Describe the project in a few lines.";

    setErrors(nextErrors);
    setSubmitted(Object.keys(nextErrors).length === 0);
  }

  return (
    <main className="min-h-screen bg-[var(--surface-deep)] text-[var(--text-primary)]">
      <Logo />

      <section className="relative overflow-hidden bg-black pt-28 pb-[var(--space-xl)] md:pt-40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

        <div className="container relative z-10">
          <div className="mb-[var(--space-xl)] max-w-3xl">
            <div className="section-label">
              <span>Contact</span>
            </div>
            <h1 className="mb-[var(--space-sm)] text-[clamp(42px,7vw,86px)] font-[700] leading-[0.95] tracking-[-0.04em]">
              Build with VizhiXR AR glasses.
            </h1>
            <p className="max-w-2xl text-[17px] font-[400] leading-[1.75] text-[var(--text-body)]">
              Share the spatial workflow, lens use case, or deployment you want
              to bring into the field of view.
            </p>
          </div>

          <div className="grid gap-[var(--space-md)] lg:grid-cols-[1fr_0.62fr]">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.035] p-5 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="mb-8">
                <p className="text-[12px] font-[600] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Step 1
                </p>
                <h2 className="mt-2 text-[24px] font-[700] tracking-[-0.02em]">
                  Describe your AR glass use case
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-[500] text-[var(--text-body)]">
                    Name
                  </span>
                  <span
                    className={`flex items-center gap-3 rounded-[var(--radius-sm)] bg-black/45 px-4 py-3 transition-colors focus-within:bg-white/[0.07] ${errors.name ? "ring-1 ring-red-400/50" : ""}`}
                  >
                    <User
                      size={17}
                      className="shrink-0 text-[var(--text-muted)]"
                    />
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text-primary)] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--text-muted)]"
                    />
                  </span>
                  {errors.name && (
                    <span className="text-[12px] text-red-300">
                      {errors.name}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-[500] text-[var(--text-body)]">
                    Email
                  </span>
                  <span
                    className={`flex items-center gap-3 rounded-[var(--radius-sm)] bg-black/45 px-4 py-3 transition-colors focus-within:bg-white/[0.07] ${errors.email ? "ring-1 ring-red-400/50" : ""}`}
                  >
                    <Mail
                      size={17}
                      className="shrink-0 text-[var(--text-muted)]"
                    />
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text-primary)] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--text-muted)]"
                    />
                  </span>
                  {errors.email && (
                    <span className="text-[12px] text-red-300">
                      {errors.email}
                    </span>
                  )}
                </label>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-[13px] font-[500] text-[var(--text-body)]">
                  Engagement type
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {projectTypes.map((type) => {
                    const active = projectType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`min-h-[54px] rounded-[var(--radius-sm)] px-4 py-3 text-left text-[13px] font-[600] leading-[1.25] outline-none transition-all focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                          active
                            ? "bg-white text-black shadow-[0_0_32px_rgba(255,255,255,0.16)]"
                            : "bg-black/45 text-[var(--text-body)] hover:bg-white/[0.07] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="projectType" value={projectType} />
              </div>

              <label className="mt-6 flex flex-col gap-2">
                <span className="text-[13px] font-[500] text-[var(--text-body)]">
                  AR glass project description
                </span>
                <span
                  className={`flex gap-3 rounded-[var(--radius-sm)] bg-black/45 px-4 py-3 transition-colors focus-within:bg-white/[0.07] ${errors.description ? "ring-1 ring-red-400/50" : ""}`}
                >
                  <MessageSquare
                    size={17}
                    className="mt-1 shrink-0 text-[var(--text-muted)]"
                  />
                  <textarea
                    name="description"
                    rows={7}
                    placeholder="Describe the AR glass workflow you want to build or deploy."
                    className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-[1.7] text-[var(--text-primary)] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--text-muted)]"
                  />
                </span>
                <span className="text-[12px] leading-[1.6] text-[var(--text-muted)]">
                  Include the real-world environment, users, timeline, and
                  current stage.
                </span>
                {errors.description && (
                  <span className="text-[12px] text-red-300">
                    {errors.description}
                  </span>
                )}
              </label>

              <label className="mt-5 flex flex-col gap-2">
                <span className="text-[13px] font-[500] text-[var(--text-body)]">
                  Company{" "}
                  <span className="text-[var(--text-muted)]">(optional)</span>
                </span>
                <span className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-black/35 px-4 py-3 transition-colors focus-within:bg-white/[0.06]">
                  <Building2
                    size={17}
                    className="shrink-0 text-[var(--text-muted)]"
                  />
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Organization name"
                    className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text-primary)] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[var(--text-muted)]"
                  />
                </span>
              </label>

              {submitted && (
                <div className="mt-6 flex items-start gap-3 rounded-[var(--radius-sm)] bg-emerald-400/10 p-4 text-[13px] leading-[1.6] text-emerald-200">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  Your AR glass request is ready. In production, this will route
                  to the VizhiXR team.
                </div>
              )}

              <div className="sticky bottom-0 -mx-5 mt-7 bg-transparent p-5 shadow-none backdrop-blur-none sm:static sm:mx-0 sm:p-0">
                <div className="mb-4 grid gap-3 text-[12px] text-[var(--text-muted)] sm:grid-cols-3">
                  <span className="flex items-center gap-2">
                    <Clock3 size={14} /> &lt;24h response
                  </span>
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={14} /> Confidential by default
                  </span>
                  <span className="flex items-center gap-2">
                    <Rocket size={14} /> Lens to deployment
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center text-[15px] shadow-[0_0_40px_rgba(255,255,255,0.18)] focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-auto"
                >
                  Plan an AR glass deployment
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            <aside className="grid gap-[var(--space-md)] content-start">
              <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.035] p-6 shadow-[var(--shadow-card)] backdrop-blur-xl">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-black/40">
                  <Sparkles size={20} />
                </div>
                <h2 className="mb-5 text-[22px] font-[700] tracking-[-0.02em]">
                  Built for field reality
                </h2>
                <div className="grid gap-4">
                  <div className="rounded-[var(--radius-sm)] bg-black/40 p-4">
                    <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      Avg response time
                    </p>
                    <p className="mt-2 text-[22px] font-[700]">&lt;12 hours</p>
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-black/40 p-4">
                    <p className="text-[14px] leading-[1.7] text-[var(--text-body)]">
                      For teams exploring AR glasses across healthcare,
                      manufacturing, training, field service, and operations.
                    </p>
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-black/40 p-4">
                    <p className="text-[14px] leading-[1.7] text-[var(--text-body)]">
                      We prioritize use cases with clear users, physical
                      context, and measurable workflow impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-black p-6 shadow-[var(--shadow-card)]">
                <h3 className="mb-5 text-[12px] font-[600] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Signal
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[14px] text-[var(--text-body)]">
                    <ShieldCheck size={17} />
                    AR glass pilots reviewed first
                  </div>
                  <a
                    href="mailto:vizhixr@gmail.com"
                    className="flex items-center gap-3 text-[14px] text-[var(--text-body)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <Mail size={17} />
                    vizhixr@gmail.com
                  </a>
                  <div className="flex items-center gap-3 text-[14px] text-[var(--text-body)]">
                    <MapPin size={17} />
                    Engineered in Tamil Nadu
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
