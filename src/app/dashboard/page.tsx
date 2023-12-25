import MaxWrapper from "@/components/MaxWrapper"
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import DashboardComponent from "./DashboardComponent";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default async function Dashboard({ children }: { children: ReactNode}) {
  return (
      <MaxWrapper className="bg-background max-w-7xl">
        <div className="md:py-5 py-2">
          <DashboardComponent />
        </div>
      </MaxWrapper>
  )
}
