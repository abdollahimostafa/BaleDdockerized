"use client"

import { ArrowLeftCircle, Eye, Stethoscope, Microscope, CalendarDays, Syringe } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import DoctorsList from "@/components/subitems/DoctorsList"
import { useParams } from "next/navigation"

export default function ServicePage() {
  const params = useParams()
  const service = params.slug // dynamic folder name
  const cate = params.cat // dynamic folder name

  const userName = "مدی مدیا"
  const services = [
    { icon: <Stethoscope className="w-8 h-8 text-white" />, title: "ویزیت پزشک", desc: "نوبت آنلاین و مشاوره فوری" },
    { icon: <Microscope className="w-8 h-8 text-white" />, title: "آزمایشگاه", desc: "نمونه‌گیری و نتایج آنلاین" },
    { icon: <CalendarDays className="w-8 h-8 text-white" />, title: "نوبت‌ها", desc: "مدیریت رزرو و تاریخ مراجعات" },
    { icon: <Syringe className="w-8 h-8 text-white" />, title: "تزریقات", desc: "درمان در منزل و مرکز درمانی" },
  ]

  // Construct API URL dynamically using the [service] param
const apiUrl = `https://www.medimedia.ir/api/v1/service-packages/services/online/${service}/${cate}`
  return (
    <div className="h-full">
      <div className="p-6 pb-5 xl:px-30 xl:pr-60 xl:pl-60 min-h-60 bg-[#2b7fff] rounded-b-4xl shadow-sm relative overflow-hidden text-white">
        
        {/* Background Pattern & Abstract Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">

          <div className="absolute top-20 right-0 w-48 h-48 bg-white/10 rotate-45 rounded-3xl blur-xl"></div>
          <div className="absolute bottom-10 left-0 w-40 h-40 bg-white/10 -rotate-12 rounded-2xl blur-xl"></div>
        </div>

        {/* Top row */}
        <div className="flex justify-between items-center w-full mb-6">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <a href="medimedia.ir" className="flex cursor-pointer items-center space-x-1 rtl:space-x-reverse bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition">
              <Eye className="w-5 h-5 text-white" />
              <span className="text-xs font-light">Medimedia.ir</span>
            </a>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">{userName}</p>
            <p className="text-xs font-light text-white/50">پلتفرم دانش‌بنیان</p>
          </div>
        </div>

        {/* Typographic background */}
        <div className="absolute -bottom-10 right-0 text-[6rem] font-extrabold text-white/10 select-none pointer-events-none">
          MediMedia
        </div>

        {/* Foreground content */}
        <div
          className="relative z-10 mt-4 flex flex-col items-center"
        >
          <h1 className="text-3xl text-center md:text-4xl font-bold">انتخاب پزشک</h1>
          <p className="text-center mt-2 text-sm md:text-base text-white/90">
            دسترسی سریع به پزشک، آزمایشگاه و خدمات پزشکی
          </p>
          <a href="/main" className="flex bg-white/20 backdrop-blur-xl px-4 py-1 rounded-2xl text-xs font-light mt-3 border border-white/10">
            بازگشت <ArrowLeftCircle className="w-4 ml-1 h-4"/>
          </a>
        </div>

        <Image
          src="/logos.png"
          alt="logo"
          width={1000}
          height={1000}
          className="w-500 blur-3xl opacity-40 absolute left-1/2 -translate-x-1/2 bottom-15 z-0"
        />      
      </div>

      {/* Doctors List with dynamic API URL */}
      <DoctorsList apiUrl={apiUrl} />    
    </div>
  )
}
