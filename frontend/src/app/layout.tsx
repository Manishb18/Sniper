import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import "./globals.css";

const sora = Sora({ 
  subsets: ["latin"],
  variable: '--font-sora', 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk', 
});

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Simplify your links with our easy-to-use URL shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${spaceGrotesk.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
