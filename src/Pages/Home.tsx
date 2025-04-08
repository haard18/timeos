import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    document.title = "CozyDesk — Modular Mayhem for Hackers";
  }, []);

  return (
    <div
      className="bg-gradient-to-b from-[#0e0b1e] to-[#151320] min-h-screen text-[#f0f0f0] "
      style={{ fontFamily: '"Kode Mono", monospace' }}
    >
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#ff00ff]"
        >
          Build your desk. Break the rules. 🧠
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg text-[#cfcfcf] max-w-2xl mx-auto"
        >
          Snap in widgets like music players, code pads, sketch tools & chaos
          cores. This isn't your average workspace.
        </motion.p>

        <motion.a
          href="/onboarding"
          whileHover={{ scale: 1.08, rotate: "-1deg" }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-[#00ffcc] text-black px-6 py-3 rounded-full text-lg shadow-lg hover:bg-[#00e6b8] transition-all font-bold"
        >
          Launch Your Toybox <ArrowRight size={20} />
        </motion.a>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {[
          {
            emoji: "🧠",
            title: "Choose a Module",
            text: "Music, sketches, markdown, chaos engines. It’s your grid.",
          },
          {
            emoji: "🕹️",
            title: "Drag. Drop. Zap.",
            text: "Snap it onto your canvas like retro circuit boards.",
          },
          {
            emoji: "💾",
            title: "Save Your Scene",
            text: "Preserve layouts like loadouts. Come back stronger.",
          },
        ].map(({ emoji, title, text }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-[#1b1a26] p-8 rounded-2xl shadow-lg border border-[#2a2835] hover:border-[#00ffff] transition-all duration-300"
          >
            <div className="text-4xl mb-4">{emoji}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#00ffff]">
              {title}
            </h3>
            <p className="text-[#aaa] text-sm">{text}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-[#666] py-10 border-t border-[#2e2c3d]">
        <span className="text-[#00ffcc]">Made in the midnight labs</span> —
        follow us on{" "}
        <a href="#" className="underline hover:text-white">
          GitHub
        </a>{" "}
        &{" "}
        <a href="#" className="underline hover:text-white">
          X
        </a>
        .
      </footer>
    </div>
  );
}
