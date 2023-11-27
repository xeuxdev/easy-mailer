import React from "react"
import { DocsThemeConfig, useConfig } from "nextra-theme-docs"
import { useRouter } from "next/router"

const config: DocsThemeConfig = {
  logo: (
    <span className="text-sm font-bold text-primary md:text-xl ">
      Easy Mailer
    </span>
  ),
  project: {
    link: "https://github.com/xeuxdev/easymailer",
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
          pathname.replaceAll("/", "").charAt(0).toUpperCase() +
          pathname.replaceAll("/", "").slice(1)
        } - Easymailer`}</title>
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
