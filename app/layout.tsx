import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// OCR-A style font - easily swappable by changing this one import
// Other options: Orbitron, VT323, Press_Start_2P, Major_Mono_Display
const primaryFont = Share_Tech_Mono({
  weight: "400",
  variable: "--font-primary",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustMBR | Business Verification Hub",
  description:
    "Verify businesses before you trust. Check verification status, financial health, and trustworthiness of local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${primaryFont.variable} font-primary antialiased`}>
        <AuthProvider>
          <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
