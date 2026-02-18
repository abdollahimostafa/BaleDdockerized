import type { Metadata } from "next";
import "../globals.css";
import { yekanBakh } from "@/lib/font";



export const metadata: Metadata = {
  title: "Medimedia Bot",
  description: "Main Layout with local fonts",
};

// ----- Main Layout -----
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={yekanBakh.variable}>
          <head>
        {/* Inject Bale MiniApp JS */}
        <script src="https://tapi.bale.ai/miniapp.js?3"></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
