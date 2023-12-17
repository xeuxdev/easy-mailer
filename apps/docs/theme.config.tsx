import React from "react"
import { DocsThemeConfig, useConfig } from "nextra-theme-docs"
import { useRouter } from "next/router"

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-4">
      <p className="text-lg font-bold text-primary md:text-xl ">EasyMailer</p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#BA1B1B]"
      >
        <path d="m22 2-7 20-4-9-9-4Z"></path>
        <path d="M22 2 11 13"></path>
      </svg>
    </div>
  ),
  project: {
    link: "https://github.com/xeuxdev/easy-mailer",
  },
  head: () => {
    const { asPath, defaultLocale, locale, pathname } = useRouter()
    const { frontMatter } = useConfig()
    const url =
      "https://easymailer.vercel.app" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <title className="font-bold">{`${
          pathname == "/"
            ? "Easymailer"
            : pathname.replaceAll("/", "").charAt(0).toUpperCase() +
              pathname.replaceAll("/", "").slice(1) +
              " - Easymailer"
        }`}</title>
        <meta
          name="description"
          content="Easymailer Docs - Documentation for Easymailer"
        />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "Easymailer"} />
        <meta
          property="og:description"
          content={frontMatter.description || "Easymailer docs"}
        />
      </>
    )
  },
  docsRepositoryBase: "https://github.com/xeuxdev/easymailer",
  footer: {
    text: "EasyMailer docs",
    component: () => {
      return <></>
    },
  },
}

export default config
