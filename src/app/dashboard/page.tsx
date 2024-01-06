import MaxWrapper from "@/components/MaxWrapper"
import { Metadata } from "next";
import DashboardComponent from "./DashboardComponent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard | Welcome"
}

export default function Dashboard() {
  return (
      <MaxWrapper className="bg-background max-w-max">
        <div className="md:py-5 py-2">
            <DashboardComponent />
        </div>
      </MaxWrapper>
  )
}
