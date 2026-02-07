"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {  Sparkles } from "lucide-react"

const Footban = () => {
  return (
    <section className="relative overflow-hidden px-6 xl:px-60  ">
      {/* Animated Blur Glow */}
      <motion.div
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 -z-10 flex justify-center"
      >
        <div className="w-96 h-96 bg-linear-to-br from-blue-400/20 to-cyan-500/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Glassy Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-white/10 border-2 backdrop-blur-lg mb-10  border-black/10 rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
      >
        {/* Text Section */}
        <div className="flex flex-col text-right md:text-right space-y-3 w-full md:w-1/2 z-2">
          <div className="flex items-center justify-end gap-2 mx-auto text-black/80 text-sm">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span className="text-center">هوش مصنوعی در خدمت سلامتی</span>
          </div>
          <h2 className="text-2xl md:text-3xl  text-center font-bold text-black">
            آنالیز کامل بدن با هوش مصنوعی <span className="text-black/40 bg-gray-300/40 p-1 text-[10px] rounded-l-full rounded-b-full">به زودی</span>
          </h2>
          <p className="text-black/70 leading-relaxed text-sm md:text-base text-center">
            سیستم ما با استفاده از الگوریتم‌های یادگیری عمیق، وضعیت بدنی و داده‌های شما را
            تحلیل کرده و نتایج دقیق و شخصی‌سازی‌شده ارائه می‌دهد
          </p>
          <div className="flex justify-center mt-4">
            <button className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all">
              اطلاعات بیشتر
            </button>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center absolute z-0 opacity-5" >
          {/* Replace this with your actual image */}
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/f1.png"
              alt="AI Body Analysis"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Footban
