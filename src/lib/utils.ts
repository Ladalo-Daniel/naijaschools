import { type ClassValue, clsx } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"
import { LayoutDashboardIcon } from 'lucide-react'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
