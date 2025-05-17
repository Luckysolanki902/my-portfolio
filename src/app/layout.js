import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Lucky Solanki | Full-Stack Web Developer",
  description: "Full-Stack Web Developer with expertise in Node.js, React, MongoDB, MySQL, AWS, and more. Building scalable and innovative web solutions.",
  keywords: "Lucky Solanki, Web Developer, Full-Stack Developer, JavaScript, React, Next.js, Node.js, MongoDB, MySQL, Express.js, MERN Stack, Portfolio",
  authors: [{ name: "Lucky Solanki" }],
  creator: "Lucky Solanki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luckysolanki.vercel.app",
    title: "Lucky Solanki | Full-Stack Web Developer",
    description: "Full-Stack Web Developer with expertise in Node.js, React, MongoDB, and more",
    siteName: "Lucky Solanki Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Lucky Solanki - Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucky Solanki | Full-Stack Web Developer",
    description: "Full-Stack Web Developer with expertise in Node.js, React, MongoDB, and more",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
