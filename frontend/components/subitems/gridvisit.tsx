"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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

const Mainvivist = () => {
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
const items = [
  {
    id: 1,
    icon: "/visit/stethoscope.svg",
    title: "عمومی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B9%D9%85%D9%88%D9%85%DB%8C",
  },
  {
    id: 2,
    icon: "/visit/kidneys.svg",
    title: "ارولوژی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A7%D9%88%D8%B1%D9%88%D9%84%D9%88%DA%98%DB%8C",
  },
  {
    id: 3,
    icon: "/visit/joints.svg",
    title: "ارتوپدی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A7%D8%B1%D8%AA%D9%88%D9%BE%D8%AF%DB%8C",
  },
  {
    id: 4,
    icon: "/visit/male-and_female.svg",
    title: "پزشک خانواده",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D9%BE%D8%B2%D8%B4%DA%A9-%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87",
  },
  {
    id: 5,
    icon: "/visit/cpap-tubes.svg",
    title: "بیهوشی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A8%DB%8C%D9%87%D9%88%D8%B4%DB%8C",
  },
  {
    id: 6,
    icon: "/visit/allergies.svg",
    title: "پوست و مو",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D9%BE%D9%88%D8%B3%D8%AA-%D9%88-%D9%85%D9%88",
  },
  {
    id: 7,
    icon: "/visit/nutrition.svg",
    title: "تغذیه",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AA%D8%BA%D8%B0%DB%8C%D9%87",
  },
  {
    id: 8,
    icon: "/visit/stitches.svg",
    title: "جراحی عمومی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AC%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B9%D9%85%D9%88%D9%85%DB%8C",
  },
    {
    id: 9,
    icon: "/visit/heart-organ.svg",
    title: "جراحی قلب",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AC%D8%B1%D8%A7%D8%AD-%D9%82%D9%84%D8%A8",
  },
    {
    id: 10,
    icon: "/visit/neurology.svg",
    title: "جراحی مغز و اعصاب",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AC%D8%B1%D8%A7%D8%AD-%D9%85%D8%BA%D8%B2-%D9%88-%D8%A7%D8%B9%D8%B5%D8%A7%D8%A8",
  },
    {
    id: 11,
    icon: "/visit/head.svg",
    title: "جراحی پلاستیک",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AC%D8%B1%D8%A7%D8%AD-%D9%BE%D9%84%D8%A7%D8%B3%D8%AA%DB%8C%DA%A9",
  },
  //   {
  //   id: 12,
  //   icon: "/visit/stitches.svg",
  //   title: "جراحی عمومی",
  //   lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AC%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B9%D9%85%D9%88%D9%85%DB%8C",
  // },
      {
    id: 13,
    icon: "/visit/eye.svg",
    title: "چشم",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%DA%86%D8%B4%D9%85-%D9%BE%D8%B2%D8%B4%DA%A9%DB%8C",
  },
      {
    id: 14,
    icon: "/visit/hazardous.svg",
    title: "رادیوتراپی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B1%D8%A7%D8%AF%DB%8C%D9%88%D8%AA%D8%B1%D8%A7%D9%BE%DB%8C",
  },
      {
    id: 15,
    icon: "/visit/mental-health.svg",
    title: "روان پزشکی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B1%D9%88%D8%A7%D9%86%D9%BE%D8%B2%D8%B4%DA%A9%DB%8C",
  },
        {
    id: 16,
    icon: "/visit/back-pain.svg",
    title: "روماتولوژی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B1%D9%88%D9%85%D8%A7%D8%AA%D9%88%D9%84%D9%88%DA%98%DB%8C",
  },
          {
    id: 17,
    icon: "/visit/lungs.svg",
    title: "ریه",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B1%DB%8C%D9%87",
  },
          {
    id: 18,
    icon: "/visit/cervical-cancer.svg",
    title: "زنان و زایمان",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B2%D9%86%D8%A7%D9%86-%D9%88-%D8%B2%D8%A7%DB%8C%D9%85%D8%A7%D9%86",
  },
          {
    id: 19,
    icon: "/visit/ribbon.svg",
    title: "سرطان شناسی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B3%D8%B1%D8%B7%D8%A7%D9%86-%D8%B4%D9%86%D8%A7%D8%B3%DB%8C",
  },
          {
    id: 20,
    icon: "/visit/gonorrhea.svg",
    title: "بیماری های عفونی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%DB%8C-%D9%87%D8%A7%DB%8C-%D8%B9%D9%81%D9%88%D9%86%DB%8C",
  },
          {
    id: 21,
    icon: "/visit/pancreas.svg",
    title: "داخلی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C",
  },
            {
    id: 22,
    icon: "/visit/thyroid.svg",
    title: "غدد",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%BA%D8%AF%D8%AF-%D9%88-%D9%85%D8%AA%D8%A7%D8%A8%D9%88%D9%84%DB%8C%D8%B3%D9%85",
  },
            {
    id: 23,
    icon: "/visit/heart-cardiogram.svg",
    title: "قلب و عروق",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA%20%D9%82%D9%84%D8%A8-%D9%88-%D8%B9%D8%B1%D9%88%D9%82",
  },
            {
    id: 24,
    icon: "/visit/baby-0203m.svg",
    title: "اطفال",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%DA%A9%D9%88%D8%AF%DA%A9%D8%A7%D9%86-%D9%88-%D9%86%D9%88%D8%B2%D8%A7%D8%AF%D8%A7%D9%86",
  },
            {
    id: 25,
    icon: "/visit/mouth.svg",
    title: "گفتار درمانی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%DA%AF%D9%81%D8%AA%D8%A7%D8%B1-%D8%AF%D8%B1%D9%85%D8%A7%D9%86%DB%8C",
  },
              {
    id: 26,
    icon: "/visit/intestine.svg",
    title: "گوارش",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%DA%AF%D9%88%D8%A7%D8%B1%D8%B4-%D9%88-%DA%A9%D8%A8%D8%AF",
  },
              {
    id: 27,
    icon: "/visit/nose.svg",
    title: "گوش حلق و بینی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%DA%AF%D9%88%D8%B4-%D9%88-%D8%AD%D9%84%D9%82-%D9%88-%D8%A8%DB%8C%D9%86%DB%8C",
  },
              {
    id: 28,
    icon: "/visit/headache.svg",
    title: "نورولوژی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA%20%D9%85%D8%BA%D8%B2%20%D9%88%20%D8%A7%D8%B9%D8%B5%D8%A7%D8%A8",
  },
              {
    id: 29,
    icon: "/visit/lactation.svg",
    title: "مامایی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D9%85%D8%A7%D9%85%D8%A7%DB%8C%DB%8C",
  },
              {
    id: 30,
    icon: "/visit/ear.svg",
    title: "شنوایی سنجی",
    lin: "https://www.medimedia.ir/service-package/online/%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87-%D9%88-%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86-%D8%AF%D8%B1-%D9%85%D9%86%D8%B2%D9%84-%DB%8C%D8%A7-%D9%85%D8%AD%D9%84-%D8%A8%DB%8C%D9%85%D8%A7%D8%B1/%D9%88%DB%8C%D8%B2%DB%8C%D8%AA-%D8%B4%D9%86%D9%88%D8%A7%DB%8C%DB%8C-%D8%B3%D9%86%D8%AC%DB%8C",
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

export default Mainvivist
