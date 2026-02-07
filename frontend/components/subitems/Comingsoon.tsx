"use client"

import { Lock } from "lucide-react"
import { motion } from "framer-motion"

export default function ComingSoonBanners() {
  const banners = [
    {
      id: "health-ring",
      title: "رینگ سلامتی",
      subtitle: "حلقه هوشمند پایش سلامتی",
      image: "/ring.png", // replace with your own SVG/PNG
    },
    {
      id: "in-person-services",
      title: "خدمات حضوری",
      subtitle: "رزرو و دریافت خدمات حضوری",
      image: "/inper.png", // replace with your own SVG/PNG
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 -mt-4 mb-16 gap-6 px-4 md:px-10 py-3">
      {banners.map((banner) => (
        <motion.div
          key={banner.id}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="relative cursor-not-allowed rounded-2xl overflow-hidden shadow-lg bg-white/20 backdrop-blur-2xl border border-blue-300/50"
        >
          {/* Banner content */}
          <div className="flex items-center gap-4 p-4">
            {/* Image */}
            <div className="w-20 h-20 hrink-0 bg-white/40 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={banner.image}
                alt={banner.title}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-right">
              <h3 className="text-lg font-bold text-gray-800">{banner.title}</h3>
              <p className="text-sm text-gray-600">{banner.subtitle}</p>
            </div>
          </div>

          {/* Overlay blur + lock */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-lg pointer-events-none">
            <Lock className="w-8 h-8 mb-2 text-white" />
            <span className="text-white font-semibold text-sm">به زودی</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
