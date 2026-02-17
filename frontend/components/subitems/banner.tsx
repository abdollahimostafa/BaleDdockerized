"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

export default function Ads() {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const banners = [
           {
      id: "pshyco",
      title: "مشاوره روان شناسی",
      subtitle: "ویزیت روان درمانی",
      image: "/psyc.png",
      site: "/main/service/consultation-and-visit/psychiatry-visit",
      isIframe: false,
    },
           {
      id: "psychop",
      title: "ویزیت روان پزشکی",
      subtitle: "گفتگو و ویزیت توسط متخصص روان پزشک",
      image: "/drpsy.png",
      site: "/main/service/consultation-and-visit/psychiatry-visit",
      isIframe: false,
    },
    {
      id: "visit",
      title: "مشاوره و ویزیت آنلاین",
      subtitle: "ویزیت آنلاین پزشکان",
      image: "/sto.png",
      site: "/main/visit",
      isIframe: false,
    },
    {
      id: "lab",
      title: "ثبت الکترونیک نسخه",
      subtitle: "آزمایش ، تصویربرداری",
      image: "/ban3.png",
      site: "/main/lab",
      isIframe: false,
    },
    //     {
    //   id: "drugdeliver",
    //   title: "ثبت نسخه دارو ",
    //   subtitle: "ثبت نسخه  و دریافت در محل",
    //   image: "/dds.png",
    //   site: "https://www.medimedia.ir/drug-delivery?gg=no_header",
    //   isIframe: true,
    // },
    

    

 
    // {
    //   id: "drug",
    //   title: "تداخلات دارویی",
    //   subtitle: "بررسی تداخل های دارویی",
    //   image: "/drug.png",
    //   site: "https://www.medimedia.ir/drug-interaction?gg=no_header",
    //   isIframe: true,
    // },
  ]

  return (
    <>
      <div
        className="relative px-4 md:px-10 py-6 overflow-hidden"
      >
        <div className="flex flex-col gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              onClick={() => {
                if (banner.isIframe) {
                  setOpenDrawer(banner.id)
                  setLoading(true)
                } else {
                        router.push(banner.site)   
                }
              }}
              className="group relative flex items-center justify-between rounded-2xl 
                         bg-white/20 backdrop-blur-2xl 
                         shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
                         hover:border-blue-300/50 transition-all duration-300 
                         px-4 py-3 overflow-hidden border-[#2b7fff] border-3 ring-2 ring-gray-400/10 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-18 h-18 rounded-xl overflow-hidden flex-shrink-0 bg-white/40">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex-1 text-right pr-3">
                <h3 className="text-base font-bold text-gray-800 drop-shadow-sm">
                  {banner.title}
                </h3>
                <p className="text-sm text-gray-600">{banner.subtitle}</p>
              </div>

              {/* Arrow Button */}
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-blue-100/50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-blue-600 group-hover:translate-x-[-2px] transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer with iframe */}
      {banners.map(
        (banner) =>
          openDrawer === banner.id && (
            <Drawer open={true} onOpenChange={() => setOpenDrawer(null)} key={banner.id}>
              <DrawerContent className="h-[90vh] bg-white/90 backdrop-blur-xl border-t border-blue-200 shadow-lg">
                <DrawerHeader className="flex justify-between items-center">
                                    <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-blue-50 rounded-full"
                    >
                      <X className="w-10 h-10 text-gray-600" />
                    </Button>
                  </DrawerClose>
                  <DrawerTitle className="text-lg font-bold text-black">
                    {banner.title}
                  </DrawerTitle>

                </DrawerHeader>

                {/* Spinner while loading */}
                {loading && (
                  
                  <div className="flex flex-col items-center justify-center h-full">
                                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

                    <span className="mt-5">درحال بارگذاری</span>
                  </div>
                )}

                <iframe
                  src={banner.site}
                  className={`w-full h-full rounded-t-xl transition-opacity duration-500 ${
                    loading ? "opacity-0" : "opacity-100"
                  }`}
                  onLoad={() => setLoading(false)}
                />
              </DrawerContent>
            </Drawer>
          )
      )}
    </>
  )
}
