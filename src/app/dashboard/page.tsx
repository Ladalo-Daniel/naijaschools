import MaxWrapper from "@/components/MaxWrapper";
import { getUserSession } from "@/supabase/session";
import { getProfile } from "@/supabase/user";
import { Metadata } from "next";
import { ReactNode } from "react";
import DashboardComponent from "./DashboardComponent";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default async function Dashboard({ children }: { children: ReactNode}) {
  // const session = await getUserSession()
  // const profile = await getProfile()
  return (
      <>
      <MaxWrapper className="bg-background">
        <div className="md:py-5 py-2">
          {/* <DashboardComponent /> */}
        </div>
      </MaxWrapper>
      </>
  )
}
