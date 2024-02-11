import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./my.css"
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My auth app",
  description: "Youtube Efe Görkem Ümit",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <SessionProvider session={session}>


    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster />

</body>
    </html>

    </SessionProvider>
  );
}
