"use client";
import { useEffect, useState } from "react";
import { useBale } from "@/hooks/useBale";

interface UserData {
  national_number: string;
  name: string;
  family: string;
  birth_date: string;
  gender: string;
}

interface InsuranceData {
  title: string;
  sepas_system_code: string;
  type: string;
}

interface InquiryResponse {
  status: boolean;
  message: string;
  data: {
    user: UserData | null;
    insurance: InsuranceData | null;
  };
}

const getBirthYear = (birthDate?: string) => {
  if (!birthDate) return "";
  // If masked like 1349**** → take first 4
  // If full like 13491234 → take first 4
  return birthDate.slice(0, 4);
};

export default function RegisterPage() {
  const { user, ready, requestPhoneNumber } = useBale();

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [nationalId, setNationalId] = useState("");

  const [inquiry, setInquiry] = useState<InquiryResponse["data"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

  // ── Manual fill when user is null ───────────────────────────────
  const [manualUser, setManualUser] = useState<Partial<UserData>>({
    name: "",
    family: "",
    gender: "",
    birth_date: "",
  });

  // Request phone number on mount
  useEffect(() => {
    if (!ready) return;

    window.Bale?.WebApp.requestContact((granted, phone) => {
      if (granted && phone) {
        setPhoneNumber(phone);
        setPermissionError(null);
      } else {
        setPermissionError("برای ادامه لطفاً دسترسی به شماره تلفن خود را بدهید.");
      }
    });
  }, [ready]);

  const handleRetry = () => {
    requestPhoneNumber();
    window.Bale?.WebApp.requestContact((granted, phone) => {
      if (granted && phone) {
        setPhoneNumber(phone);
        setPermissionError(null);
      } else {
        setPermissionError("شما دسترسی به شماره تلفن خود را ندادید.");
      }
    });
  };

  const handleNextStep = () => setStep(2);

  const handleCheck = async () => {
    if (!nationalId.trim() || nationalId.length !== 10) {
      alert("لطفاً یک کد ملی معتبر ۱۰ رقمی وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://www.medimedia.ir/api/v1/insurance/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ national_code: nationalId.trim() }),
      });

      const data: InquiryResponse = await res.json();

      if (data.status && data.data) {
        setInquiry(data.data);

        // If user came back → prefill manual fields
        if (data.data.user) {
          setManualUser({
            name: data.data.user.name || "",
            family: data.data.user.family || "",
            gender: data.data.user.gender || "",
            birth_date: data.data.user.birth_date || "",
          });
        }
      } else {
        alert(data.message || "خطا در دریافت اطلاعات.");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user?.id) {
      setRegisterError("شناسه بله دریافت نشده است.");
      return;
    }

    if (!phoneNumber || !nationalId) {
      setRegisterError("اطلاعات ناقص است.");
      return;
    }

    // Decide final user data
    let finalUser: UserData;

    if (inquiry?.user) {
      finalUser = inquiry.user;
    } else {
      // Manual mode — check required fields
      if (!manualUser.name || !manualUser.family || !manualUser.gender || !manualUser.birth_date) {
        setRegisterError("لطفاً تمام اطلاعات خواسته شده را وارد کنید.");
        return;
      }

      finalUser = {
        national_number: nationalId,
        name: manualUser.name,
        family: manualUser.family,
        gender: manualUser.gender,
        birth_date: manualUser.birth_date,
      };
    }

    setLoading(true);
    setRegisterError(null);

    try {
      const res = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baleId: String(user.id),
          phone: String(phoneNumber),
          nationalId: String(nationalId),
          firstName: finalUser.name,
          lastName: finalUser.family,
          gender: finalUser.gender,
          birthYear: getBirthYear(finalUser.birth_date),
          insurance: inquiry?.insurance?.title ?? "",
        }),
      });

      const data = await res.json();

      if (data.ok) {
        setRegisterSuccess(true);
        setTimeout(() => {
          window.location.href = "/main";
        }, 800);
      } else {
        setRegisterError(data.error || "ثبت نام انجام نشد، دوباره تلاش کنید.");
      }
    } catch (err) {
      console.error(err);
      setRegisterError("خطا در ارتباط با سرور.");
    } finally {
      setLoading(false);
    }
  };

  const hasUserData = !!inquiry?.user;
  const showManualForm = inquiry && !hasUserData;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-8 w-full max-w-md space-y-6">

        {/* Step 1: Phone */}
        {step === 1 && (
          <div className="space-y-4">
            <label className="block text-center text-2xl font-bold text-gray-700">
              شماره تماس شما
            </label>
            <span className="text-center block font-light text-xs">
              با تایید دسترسی شماره شما نمایش داده میشود
            </span>

            <input
              type="text"
              value={phoneNumber ?? ""}
              readOnly
              placeholder="شماره تلفن دریافت نشد"
              disabled
              className="w-full p-3 border border-gray-300 text-center rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            {permissionError && (
              <div className="space-y-2">
                <p className="text-red-500 block text-center text-sm">{permissionError}</p>
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  درخواست دوباره
                </button>
              </div>
            )}

            {phoneNumber && (
              <button
                onClick={handleNextStep}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
              >
                مرحله بعد
              </button>
            )}
          </div>
        )}

        {/* Step 2: National ID input */}
        {step === 2 && !inquiry && (
          <div className="space-y-4 -mt-10">
            <label className="block text-center text-2xl font-bold text-gray-700">
              کد ملی شما
            </label>
            <span className="text-center block font-light text-xs">
              کد ملی شما برای ثبت نسخ و احراز هویت بیمه استفاده خواهد شد
            </span>

            <input
              type="text"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="کد ملی خود را وارد کنید"
              maxLength={10}
              className="w-full p-3 text-center border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />

            <button
              onClick={handleCheck}
              disabled={loading || !nationalId.trim()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "...در حال بررسی" : "بررسی"}
            </button>
          </div>
        )}

        {/* Step 3: Show result / manual fill */}
        {inquiry && (
          <div className="space-y-5 text-right">
            <h2 className="text-2xl font-semibold text-center">اطلاعات شما</h2>

            {/* Insurance – always show if present */}
            {inquiry.insurance && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-right">بیمه: {inquiry.insurance.title}</p>
              </div>
            )}

            {hasUserData ? (
              /* ── Auto-filled case ── */
<div className="space-y-2 text-right" >
    <p className="text-right">نام: {inquiry.user?.name ?? "—"}</p>
    <p className="text-right">نام خانوادگی: {inquiry.user?.family ?? "—"}</p>
    <p className="text-right">جنسیت: {inquiry.user?.gender ?? "—"}</p>
    <p className="text-right">سال تولد: {getBirthYear(inquiry.user?.birth_date) || "—"}</p>
  </div>
            ) : (
              /* ── Manual fill case ── */
              <div className="space-y-4">
                <p className="text-amber-700 text-sm text-center font-medium">
                  اطلاعات هویتی شما از سامانه قابل دریافت نبود.<br />
                  لطفاً اطلاعات زیر را به‌درستی وارد کنید:
                </p>

                <input
                  type="text"
                  placeholder="نام"
                  value={manualUser.name ?? ""}
                  onChange={(e) => setManualUser({ ...manualUser, name: e.target.value })}
                  className="w-full p-3 border text-right border-gray-300 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  value={manualUser.family ?? ""}
                  onChange={(e) => setManualUser({ ...manualUser, family: e.target.value })}
                  className="w-full p-3 border text-right border-gray-300 rounded-lg"
                />

                <select
                  value={manualUser.gender ?? ""}
                  onChange={(e) => setManualUser({ ...manualUser, gender: e.target.value })}
                  className="w-full p-3 border text-right border-gray-300 rounded-lg"
                >
                  <option className="text-right" value="" disabled>جنسیت</option>
                  <option className="text-right" value="مرد">مرد</option>
                  <option className="text-right" value="زن">زن</option>
                </select>

                <input
                  type="text"
                  placeholder="سال تولد (مثال: ۱۳۷۰)"
                  value={manualUser.birth_date ?? ""}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (val.length > 4) val = val.slice(0, 4);
                    setManualUser({ ...manualUser, birth_date: val });
                  }}
                  maxLength={4}
                  className="w-full text-right p-3 border border-gray-300 rounded-lg"
                />
              </div>
            )}

            {registerError && <p className="text-red-600 text-center">{registerError}</p>}
            {registerSuccess && (
              <p className="text-green-600 text-center font-medium">ثبت نام با موفقیت انجام شد!</p>
            )}

            <button
              onClick={handleRegister}
              disabled={loading || registerSuccess}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
            </button>

            <p className="text-center text-xs text-gray-500">
              با ثبت نام در مدی‌مدیا شما با قوانین و ضوابط سامانه موافق هستید
            </p>
          </div>
        )}
      </div>
    </div>
  );
}