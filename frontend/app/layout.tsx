import type { Metadata } from "next";
import "./globals.css";
import { yekanBakh } from "@/lib/font";

export const metadata: Metadata = {
  title: "My App",
  description: "Main Layout with local fonts",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={yekanBakh.variable}  >
      <body className=" antialiased">
        {children}
      </body>
    </html>
  );
}
