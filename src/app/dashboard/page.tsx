import MaxWrapper from "@/components/MaxWrapper";
import { getUserSession } from "@/supabase/session";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default async function Dashboard({ children }: { children: ReactNode}) {
  const session = await getUserSession()
  return (
      <>
      <MaxWrapper className="bg-background">
        <div className="leading-relaxed">
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quia cupiditate accusamus ipsum consectetur incidunt saepe nam, ipsam libero molestiae corrupti perspiciatis reprehenderit magni maxime, laboriosam ullam dolores vero corporis?</h2>
        <p>...</p>
        </div>
      </MaxWrapper>
      </>
  )
}
