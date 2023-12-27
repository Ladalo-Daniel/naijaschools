import MaxWrapper from "@/components/MaxWrapper"
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import DashboardComponent from "./DashboardComponent";
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default async function Dashboard({ children }: { children: ReactNode}) {
  return (
      <MaxWrapper className="bg-background max-w-7xl">
        <div className="md:py-5 py-2">
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardComponent />
          </Suspense>
        </div>
      </MaxWrapper>
  )
}
