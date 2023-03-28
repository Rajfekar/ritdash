/* eslint-disable @next/next/no-img-element */
import getConfig from "next/config"
import React, { useContext } from "react"
import AppMenuitem from "./AppMenuitem"
import { LayoutContext } from "./context/layoutcontext"
import { MenuProvider } from "./context/menucontext"
import Link from "next/link"
import { AppMenuItem } from "../types/types"

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext)
  const contextPath = getConfig().publicRuntimeConfig.contextPath
  const model: AppMenuItem[] = [
    {
      label: "Home",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "Tools",
      items: [
        {
          label: "Members",
          icon: "pi pi-fw pi-users",
          to: "/pages/members",
        },
        {
          label: "Books",
          icon: "pi pi-fw pi-book",
          to: "/pages/books",
        },
        {
          label: "Issue Book",
          icon: "pi pi-fw pi-id-card",
          to: "/pages/issuebook",
        },
        {
          label: "Attendance",
          icon: "pi pi-fw pi-check-square",
          to: "/pages/attendance",
        },
        {
          label: "Scanner",
          icon: "pi pi-fw pi-camera",
          to: "/pages/scanner",
        },
      ],
    },
  ]

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          )
        })}
      </ul>
    </MenuProvider>
  )
}

export default AppMenu
