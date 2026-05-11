import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TransPro Services | Soluciones Integrales para el Sector Transporte",
  description:
    "Adiestramiento comercial, creacion de LLC, estructura financiera, contabilidad e impuestos. Todo lo que necesitas para hacer crecer tu negocio de transporte.",
  keywords: [
    "transporte",
    "LLC",
    "contabilidad",
    "impuestos",
    "adiestramiento comercial",
    "estructura financiera",
    "logistica",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
