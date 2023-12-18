import MainLayout from "@/components/MainLayout";
import DashboardCards from "@/components/dashboard/DashboardCards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default function Dashboard() {
  return (
    <>
      <MainLayout>
         <>
          <DashboardCards />
         </>
      </MainLayout>
    </>
  )
}
