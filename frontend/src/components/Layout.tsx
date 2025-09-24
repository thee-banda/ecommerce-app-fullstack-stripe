import { type ComponentPropsWithoutRef } from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"

type LayoutProps = {
  navbarProps?: ComponentPropsWithoutRef<typeof Navbar>
  footerProps?: ComponentPropsWithoutRef<typeof Footer>
  contentClassName?: string
  disableFooter?: boolean
}

export const Layout = ({
  navbarProps,
  footerProps,
  contentClassName,
  disableFooter = false,
}: LayoutProps) => {
  const mainClassName = ["flex-1", contentClassName].filter(Boolean).join(" ")

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <Navbar {...navbarProps} />
      <main id="main-content" className={mainClassName}>
        <Outlet />
      </main>
      {!disableFooter && <Footer {...footerProps} />}
    </div>
  )
}

export default Layout