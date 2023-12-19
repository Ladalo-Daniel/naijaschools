"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import {NextUIProvider} from "@nextui-org/system";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <NextUIProvider>
      {children}
    </NextUIProvider>
  </NextThemesProvider>
}