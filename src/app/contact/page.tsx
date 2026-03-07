import React from "react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center pt-24 pb-12 px-6">
            <div className="max-w-2xl w-full text-center text-white">
                <h1 className="text-5xl font-bold tracking-tighter mb-6">Contact Us</h1>
                <p className="text-white/60 mb-12 text-lg">
                    Have questions about our spatial intelligence platform? Reach out to us.
                </p>
                <form className="flex flex-col gap-6 text-left">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                        <input id="name" type="text" className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                        <input id="email" type="email" className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" placeholder="your@email.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                        <textarea id="message" rows={5} className="bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-cyan-500 transition-colors" placeholder="How can we help?" />
                    </div>
                    <button type="button" className="py-4 mt-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </main>
    );
}
