"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PolicyLayout({
  title,
  content,
  lastUpdated,
}: {
  title: string;
  content: React.ReactNode;
  lastUpdated: string;
}) {
  return (
    <main className="min-h-screen bg-[var(--surface-deep)] text-[var(--text-primary)] py-24 sm:py-32">
      <div className="container max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="mb-12">
            <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-[var(--text-body)] leading-relaxed">
            {content}
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-[var(--text-muted)] text-sm">
              If you have any questions about this {title}, please contact us.
            </p>
            <a
              href="mailto:vizhixr@gmail.com"
              className="inline-block mt-4 text-[var(--accent)] hover:underline"
            >
              vizhixr@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
