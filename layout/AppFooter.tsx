/* eslint-disable @next/next/no-img-element */
import getConfig from "next/config"
import React, { useContext } from "react"
import { LayoutContext } from "./context/layoutcontext"

const AppFooter = () => {
  const { layoutConfig } = useContext(LayoutContext)
  const contextPath = getConfig().publicRuntimeConfig.contextPath

  return (
    <div className="layout-footer">
      Made with ❤️ by
      <span className="font-medium ml-2">Khemraj Fekar</span>
    </div>
  )
}

export default AppFooter
