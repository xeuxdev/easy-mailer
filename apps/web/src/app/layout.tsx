import { siteConfig } from "@/config/site"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme/theme-provider"
import QueryProvider from "@/components/query-provider"
import Toast from "@/components/toast"
import SiteHeader from "@/components/layout/site-header"
import SessionProviderWrapper from "@/components/session-provider"
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: siteConfig.description,
  openGraph: {
    type: "website",
    description: siteConfig.name,
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    images: "/logo.png",
  },
  classification: "Email sending package",
  creator: "xeuxdev",
  generator: "Next.js",
  metadataBase: siteConfig.url as unknown as URL,
  publisher: "Vercel",
  keywords: ["emails", "nodemailer", "easymailer", "nodejs"],
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@xeuxdev",
    card: "summary_large_image",
    site: siteConfig.url,
    images: {
      url: "/logo.png",
      alt: siteConfig.name,
    },
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderWrapper>
            <QueryProvider>
              <SiteHeader />
              {children}
            </QueryProvider>
          </SessionProviderWrapper>
          <Toast />
        </ThemeProvider>
          <Analytics />
      </body>
    </html>
  )
}
