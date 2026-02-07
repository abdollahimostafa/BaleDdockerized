"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  StretchHorizontal,
  Ambulance,
} from "lucide-react"
import {
  Activity,
  HeartPulse,
  BrainCircuit,
  Microscope,
  UserRoundCheck,
  Droplet,
  TestTube2,
  ActivitySquare,
} from "lucide-react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

const Maingrid = () => {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
const items = [
    {
    id: 100,
    icon: "/tac.svg",
    title: "تصویربرداری چکاپ",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B9%D9%85%D9%88%D9%85%DB%8C",
  },
    {
    id: 101,
    icon: "/radiology.svg",
    title: "تصویبرداری تخصصی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B9%D9%85%D9%88%D9%85%DB%8C",
  },
  {
    id: 1,
    icon: "/medical-sample.svg",
    title: "آزمایشات چکاپ",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%D8%A7%D8%AA%20%DA%86%DA%A9%D8%A7%D9%BE%20%D8%A8%D8%A7%D9%86%D9%88%D8%A7%D9%86%20%D9%88%20%D8%A2%D9%82%D8%A7%DB%8C%D8%A7%D9%86",
  },
  {
    id: 2,
    icon: "/virus-lab_research_test_tube.svg",
    title: "آزمایشات چکاپ خردسال",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4%D8%A7%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%AE%D8%B1%D8%AF%D8%B3%D8%A7%D9%84-%D8%B2%DB%8C%D8%B1-%D8%AF%D9%88-%D8%B3%D8%A7%D9%84",
  },
  {
    id: 3,
    icon: "/girl-0105y.svg",
    title: "آزمایشات چکاپ کودک",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%DA%86%DA%A9%D8%A7%D9%BE%20%D8%AE%D8%B1%D8%AF%D8%B3%D8%A7%D9%84-%D8%A8%D8%A7%D9%84%D8%A7%DB%8C-%D8%AF%D9%88-%D8%B3%D8%A7%D9%84",
  },
  {
    id: 4,
    icon: "/liver.svg",
    title: "آزمایش بررسی کبد",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%DA%A9%D8%A8%D8%AF",
  },
  {
    id: 5,
    icon: "/head.svg",
    title: "آزمایش بررسی ریزش مو",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D8%B1%DB%8C%D8%B2%D8%B4-%D9%85%D9%88",
  },
  {
    id: 6,
    icon: "/diabetes-measure.svg",
    title: "آزمایش بررسی دیابت",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D8%AF%DB%8C%D8%A7%D8%A8%D8%AA",
  },
  {
    id: 7,
    icon: "/blood-drop.svg",
    title: "آزمایش بررسی کم‌خونی",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%DA%A9%D9%85-%D8%AE%D9%88%D9%86%DB%8C",
  },
  {
    id: 8,
    icon: "/cpap-machine.svg",
    title: "آزمایش بررسی فشار خون",
    lin: "https://www.medimedia.ir/service-package/online/%D8%AF%D8%B1%D8%AE%D9%88%D8%A7%D8%B3%D8%AA-%DA%86%DA%A9%D8%A7%D9%BE-%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4/%D8%A2%D8%B2%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D9%81%D8%B4%D8%A7%D8%B1%D8%AE%D9%88%D9%86",
  },
]

  const handleDrawerOpen = (id: string) => {
    setLoading(true)
    setOpenDrawer(id)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(null)
    setLoading(true)
  }

  return (
    <section className="relative py-5 px-6 xl:px-30 xl:pr-60 xl:pl-60">
      <Image
        className="absolute -top-7 left-0 pointer-events-none select-none"
        src="/bgbg.svg"
        width={1000}
        height={1000}
        alt="bgpat"
      />

      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-right w-1/2">
          <div className="bg-black/10 backdrop-blur-md px-3 py-1 text-sm text-black/60 font-light w-fit rounded-full">
            همه  خدمات
          </div>
        </div>
        <div className="w-1/2 text-right font-bold text-xl text-black">خدمت‌ها</div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 text-center">
        {items.map((item, i) => (
          <Drawer
            key={item.id}
            open={openDrawer === item.title}
            onOpenChange={(open) => (open ? handleDrawerOpen(item.title) : handleDrawerClose())}
          >
            <DrawerTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-xl border-4 border-[#2b7fff]/30 shadow-md rounded-2xl w-24 h-24 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-lg">
<img
  src={item.icon}
  alt="icon"
  width={50}
  height={50}
  className="transition-all group-hover:brightness-0 group-hover:invert"
 />

                </div>
                <span className="text-sm mt-2 text-black/80 group-hover:text-white font-medium block">
                  {item.title}
                </span>
              </motion.div>
            </DrawerTrigger>

            {/* Drawer with iframe */}
            <DrawerContent className="h-[85vh] bg-white/90 backdrop-blur-xl border border-white/20">
              <DrawerHeader className="flex justify-between items-center px-6 py-3">
                <DrawerTitle className="text-lg font-bold text-[#2b7fff]">
                  {item.title}
                </DrawerTitle>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="w-5 h-5 text-gray-600" />
                  </Button>
                </DrawerClose>
              </DrawerHeader>

              <div className="h-full px-4 pb-4 relative">
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-20 rounded-xl">
                    <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-gray-600 text-sm font-medium">در حال بارگذاری...</p>
                  </div>
                )}
                <iframe
                  src={item.lin}
                  className="w-full h-[70vh] border-0 rounded-xl shadow-inner"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  onLoad={() => setLoading(false)}
                />
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </section>
  )
}

export default Maingrid
