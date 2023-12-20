"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import {NextUIProvider} from "@nextui-org/system";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children, ...props }: ThemeProviderProps) {

  const queryClient  = new QueryClient()
  
  return <NextThemesProvider {...props}
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryClientProvider client={queryClient}>

    <NextUIProvider>
      {children}
    </NextUIProvider>
    </QueryClientProvider>
  </NextThemesProvider>
}