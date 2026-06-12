import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dunolit | Majstorstvo u kamenu",
  description:
    "Dunolit oblikuje prirodni kamen za arhitekturu i interijere, od odabira materijala do precizne obrade i montaže.",
  keywords: ["Dunolit", "prirodni kamen", "mramor", "granit", "CNC obrada"],
  openGraph: {
    title: "Dunolit | Majstorstvo u kamenu",
    description: "Prirodni kamen. Precizna izvedba. Trajna vrijednost.",
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr">
      <body>{children}</body>
    </html>
  );
}
