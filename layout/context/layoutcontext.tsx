import React, { useState, createContext } from "react"
import {
  LayoutState,
  ChildContainerProps,
  LayoutConfig,
  LayoutContextProps,
} from "../../types/types"
export const LayoutContext = createContext({} as LayoutContextProps)

export const LayoutProvider = ({ children }: ChildContainerProps) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    ripple: false,
    inputStyle: "outlined",
    menuMode: "overlay",
    colorScheme: "light",
    theme: "lara-light-indigo",
    scale: 14,
  })

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  })

  const onMenuToggle = () => {
    if (!isDesktop()) {
      if (isOverlay()) {
        setLayoutState((prevLayoutState) => ({
          ...prevLayoutState,
          staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
        }))
      }
    }

    //     if (isDesktop()) {
    //       setLayoutState((prevLayoutState) => ({
    //         ...prevLayoutState,
    //         staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
    //       }))
    //     } else {
    //       setLayoutState((prevLayoutState) => ({
    //         ...prevLayoutState,
    //         staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
    //       }))
    //     }
  }

  const showProfileSidebar = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: !prevLayoutState.profileSidebarVisible,
    }))
  }

  const isOverlay = () => {
    return layoutConfig.menuMode === "overlay"
  }

  const isDesktop = () => {
    return window.innerWidth > 991
  }

  const value: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar,
  }

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  )
}
