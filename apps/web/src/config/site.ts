export const siteConfig = {
  name: "EasyMailer",
  description:
    "Easy Mailer is your Zero Config package for helping you send emails using nodejs",
  url: "https://easymailer.vercel.app",
  navigations: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    {
      name: "Docs",
      href:
        process.env.NODE_ENV == "production"
          ? "https://easymailer-docs.vercel.app/"
          : "http://localhost:3001",
    },
    { name: "Pricing", href: "/pricing" },
  ],
}
