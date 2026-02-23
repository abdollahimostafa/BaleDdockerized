"use client"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"
import Image from "next/image"
const items = [
    {
    id: 100,
    icon: "/tac.svg",
    title: "تصویربرداری چکاپ",
    lin: "/main/service/checkup-lab-prescription/men-and-women-checkup-tests",
  },
    {
    id: 101,
    icon: "/radiology.svg",
    title: "تصویبرداری تخصصی",
    lin: "/main/service/checkup-lab-prescription/men-and-women-checkup-tests",
  },
  {
    id: 1,
    icon: "/medical-sample.svg",
    title: "آزمایشات چکاپ",
    lin: "/main/service/checkup-lab-prescription/men-and-women-checkup-tests",
  },
  {
    id: 2,
    icon: "/virus-lab_research_test_tube.svg",
    title: "آزمایشات چکاپ خردسال",
    lin: "/main/service/checkup-lab-prescription/general-practice-visit",
  },
  {
    id: 3,
    icon: "/girl-0105y.svg",
    title: "آزمایشات چکاپ کودک",
    lin: "/main/service/checkup-lab-prescription/checkup-tests-for-toddlers-under-two-years",
  },
  {
    id: 4,
    icon: "/liver.svg",
    title: "آزمایش بررسی کبد",
    lin: "/main/service/checkup-lab-prescription/liver-function-test",
  },
  {
    id: 5,
    icon: "/head.svg",
    title: "آزمایش بررسی ریزش مو",
    lin: "/main/service/checkup-lab-prescription/hair-loss-screening-test",
  },
  {
    id: 6,
    icon: "/diabetes-measure.svg",
    title: "آزمایش بررسی دیابت",
    lin: "/main/service/checkup-lab-prescription/diabetes-screening-test",
  },
  {
    id: 7,
    icon: "/blood-drop.svg",
    title: "آزمایش بررسی کم‌خونی",
    lin: "/main/service/checkup-lab-prescription/anemia-screening-test",
  },
  {
    id: 8,
    icon: "/cpap-machine.svg",
    title: "آزمایش بررسی فشار خون",
    lin: "/main/service/checkup-lab-prescription/blood-pressure-screening-test",
  },
]

const Maingrid = () => {
    const router = useRouter();
  


  return (
   <section className="relative py-5 px-6 xl:px-30 xl:pr-60 xl:pl-60">
       <Image
         className="absolute -top-7 left-0 pointer-events-none select-none"
         src="/bgbg.svg"
         width={1000}
         height={1000}
         alt="bgpat"
       />
 
       {/* Section Headesssr */}
       <div className="flex justify-between items-center mb-6">
         <div className="text-right w-1/2">
           <div className="bg-black/10 backdrop-blur-md px-3 py-1 text-sm text-black/60 font-light w-fit rounded-full">
             همه خدمات
           </div>
         </div>
         <div className="w-1/2 text-right font-bold text-xl text-black">خدمت‌ها</div>
       </div>
 
       {/* Grid of clickable items */}
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 text-center">
         {items.map((item, i) => (
           <motion.div
             key={item.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             whileHover={{ scale: 1.06 }}
             whileTap={{ scale: 0.97 }}
             transition={{ duration: 0.35, delay: i * 0.04 }}
             viewport={{ once: true }}
             onClick={() => router.push(item.lin)}
             className="flex flex-col items-center cursor-pointer group"
           >
             <div
               className="
                 bg-white/10 backdrop-blur-xl 
                 border-4 border-[#2b7fff]/30 
                 shadow-md rounded-2xl 
                 w-24 h-24 
                 flex items-center justify-center 
                 transition-all duration-300 
                 group-hover:bg-[#2b7fff]/10 
                 group-hover:border-[#2b7fff]/50 
                 group-hover:shadow-xl
               "
             >
               <img
                 src={item.icon}
                 alt={item.title}
                 width={50}
                 height={50}
                 className="transition-all group-hover:brightness-0 group-hover:invert"
               />
             </div>
             <span className="text-sm mt-3 text-black/80 group-hover:text-[#2b7fff] font-medium block">
               {item.title}
             </span>
           </motion.div>
         ))}
       </div>
     </section>
  )
}

export default Maingrid
