import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أهلاً وسهلاً",
  description: "تجربة ترحيبية تفاعلية باللغة العربية."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
