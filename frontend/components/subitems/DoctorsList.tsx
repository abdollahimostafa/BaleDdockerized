"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Calendar, User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBale } from "@/hooks/useBale"

interface Medic {
  id: string;
  full_name: string;
  profile_image: string;
  day: string;
  cost: number;
  first_available_hour: {
    time: string;
    id: string;
    status: number;
  };
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    service_package: {
      id: string;
      title: string;
      description: string;
      image: string;
    };
    medics: Medic[];
  };
}
const normalizeIranianPhone = (phone: string | null): string | null => {
  if (!phone) return null;
  
  // Remove any spaces, dashes, etc. (just in case)
  let cleaned = phone.replace(/[\s-]/g, "");
  
  // If starts with +98 → replace with 0
  if (cleaned.startsWith("+98")) {
    return "0" + cleaned.slice(3);
  }
  
  // If already starts with 0 (09xx...) → keep as is
  if (cleaned.startsWith("09")) {
    return cleaned;
  }
  
  // If starts with 98 without + (rare, but possible)
  if (cleaned.startsWith("98")) {
    return "0" + cleaned.slice(2);
  }
  
  // Fallback: return original (or you can throw/log error)
  return cleaned;
};

function Avatar({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={80}
      height={80}
      className="object-cover w-full h-full"
      onError={() => setImgSrc("/demoavatar.png")}
    />
  );
}

export default function DoctorsList({ apiUrl }: { apiUrl: string }) {
  const [doctors, setDoctors] = useState<Medic[]>([]);
  const [servicePackageId, setServicePackageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Medic | null>(null);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const { user, ready, requestPhoneNumber } = useBale();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
const [nationalId, setNationalId] = useState<string | null>(null);

useEffect(() => {
  if (!ready) return;

  const webApp = window.Bale?.WebApp;
  const user = webApp?.initDataUnsafe?.user;

  if (!user?.id) return;
  console.log(user.id)
  fetch("/api/user/national-id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      baleId: String(user.id),
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        setNationalId(data.nationalId);
        setPhoneNumber(data.phone);
      }
    })
    .catch(console.error);
  console.log(nationalId)
  console.log(phoneNumber)
  console.log(phoneNumber)

}, [ready]);
    
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Network response was not ok");
        const data: ApiResponse = await res.json();
        setDoctors(data.data.medics);
        setServicePackageId(data.data.service_package.id);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [apiUrl]);

  const handleReservation = async (doctor: Medic) => {
    if (!servicePackageId) {
      console.error("Service package ID not available");
      return;
    }
  console.log(nationalId)
  console.log(normalizeIranianPhone(phoneNumber))

    const normalizedPhone = normalizeIranianPhone(phoneNumber);
  
  if (!normalizedPhone) {
    // Optional: show UI error / toast
    console.error("No valid phone number available");
    setPermissionError("شماره تلفن معتبر دریافت نشد.");
    return;
  }
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
    setReservationLoading(true);
    setReservationSuccess(false);
    setPaymentUrl(null);
if (!nationalId) {
    console.warn("National ID is missing – cannot proceed with reservation");
    // Option A: block the act
    alert("کد ملی شما یافت نشد. لطفاً از بخش ثبت‌نام اقدام کنید.");
    return;

  }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append("X-National-Code", nationalId);
      myHeaders.append("X-Mobile", normalizedPhone);

      const raw = JSON.stringify({
        medic_id: doctor.id,
        turn_id: doctor.first_available_hour.id,
        type: "online",
        redirect_url: "http://127.0.0.1:8000",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch(
        `https://www.medimedia.ir/api/v1/service-packages/${servicePackageId}/take-turn`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Assuming JSON response
      console.log(result)
      setPaymentUrl(result.data.payment_url); // Replace with actual path, e.g., result.payment_url

      setReservationSuccess(true);
    } catch (error) {
      console.error("Reservation error:", error);
      // Optionally, set an error state and show error in drawer
      setReservationSuccess(false); // Or handle failure UI
    } finally {
      setReservationLoading(false);
    }
  };

  // Loading State - Modern
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-22 h-22  border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute top-6 animate-ping left-6 w-10 h-10 border-4 border-t-blue-500 border-blue-500 rounded-full "></div>

          <div className="absolute top-1 left-1 w-20 h-20 border-4 border-t-blue-500 border-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-gray-700" dir="rtl">در حال بارگذاری پزشکان</p>
                <p className="mt-1 text-xs font-medium text-gray-400" dir="rtl">لطفا شکیبا باشید</p>

      </div>
    );
  }

  if (error) return <p className="text-center py-16 text-red-500 font-medium">خطا: {error}</p>;

  if (!doctors.length) return <p className="text-center py-16 text-gray-500 text-lg">هیچ پزشکی یافت نشد.</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="wait">
            {doctors.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden -mb-10  shadow-none transition-all  duration-300 border-0  hover:-translate-y-2 bg-white">
                  <div className="p-6">
                    <div className="flex items-start gap-5">
                      {/* Doctor Avatar */}
                      <div className="relative flex-shrink-0">
                 <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-blue-100">
  <Avatar
    src={
      doc.profile_image.startsWith("http")
        ? doc.profile_image
        : `/demoavatar.png`
    }
    alt={doc.full_name}
  />
</div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                      </div>
                      {/* Doctor Info */}
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-gray-900 mb-2">{doc.full_name}</h3>
                        
                        <div className="space-y-3 mt-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm">
                              نزدیک‌ترین نوبت: <span className="font-semibold text-gray-900">{doc.first_available_hour.time}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-500" />
                            <Badge variant="secondary" className="text-xs font-medium">
                              امروز
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center gap-2 -mr-22">
                              <span className="text-2xl font-bold text-gray-900">
                                {doc.cost.toLocaleString()}
                              </span>
                              <span className="text-sm text-gray-500">تومان</span>
                            </div>
                            <Button
                              onClick={() => handleReservation(doc)}
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-md h-12 w-30"
                            >
                              رزرو نوبت
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* Modern Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-w-md mx-auto rounded-t-3xl">
          <div className="flex justify-center pt-3">
            <div className="w-16 h-1.5 bg-gray-300 rounded-full"></div>
          </div>
          <DrawerHeader className="text-center pb-2">
            <DrawerTitle className="text-2xl font-bold">تأیید رزرو نوبت</DrawerTitle>
            <DrawerDescription className="text-base mt-2">
             دکتر {selectedDoctor?.full_name}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 py-8">
            <AnimatePresence mode="wait">
              {reservationLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-6 text-lg font-medium text-gray-700" dir="rtl">در حال ثبت رزرو...</p>
                </motion.div>
              )}
              {reservationSuccess && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="w-14 h-14 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" dir="rtl">رزرو با موفقیت انجام شد!</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
بزودی برای شما پیامکی حاوی لینک پرداخت هزینه سرویس ارسال می گردد.                  </p>
             {paymentUrl && (
  <Button
    size="lg"
    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
    onClick={() => {
      if (window.Bale?.WebApp) {
        // ✅ type assertion برای رفع خطای TS
        (window.Bale.WebApp as any).openLink(paymentUrl, {
          try_instant_view: true, // optional: اگر پشتیبانی شود، صفحه سریع در مینی‌اپ باز می‌شود
        });
      } else {
        // fallback اگر کاربر خارج از بله باشد
        window.open(paymentUrl, "_blank");
      }
    }}
  >
    رفتن به صفحه پرداخت
  </Button>
)}

                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <DrawerFooter className="px-6 pb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDrawerOpen(false)}
              className="w-full h-12 text-base font-medium"
            >
              <ArrowLeft className="ml-2 w-5 h-5" />
              انصراف
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}