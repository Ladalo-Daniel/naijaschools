import MaxWrapper from "@/components/MaxWrapper"
import { Metadata } from "next";
import { Suspense } from "react";
import DashboardComponent from "./DashboardComponent";
import DashboardSkeleton from "./components/skeletons/DashboardSkeleton";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default function Dashboard() {
  return (
      <MaxWrapper className="bg-background max-w-max">
        <div className="md:py-5 py-2">
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardComponent />
          </Suspense>
        </div>
      </MaxWrapper>
  )
}
