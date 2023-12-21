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
<<<<<<< HEAD
    defaultTheme="light"
=======
    defaultTheme="system"
>>>>>>> 0662fdc3a59c2f32d55952b23011ef323d8e3923
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