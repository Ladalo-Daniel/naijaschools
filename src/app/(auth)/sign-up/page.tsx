import { Card } from "@nextui-org/card";
import AuthForm from "../auth-form";
import { getUserSession } from "@/supabase/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getUserSession()
  if (session?.user) redirect("/dashboard")
  return (
    <div className="flex mx-auto justify-center items-center min-h-screen w-full max-w-[500px] p-4">
      <Card className="p-8 flex flex-col gap-6">
        <h1 className="text-2xl tracking-tight font-semibold text-primary">Welcome to naijaschools</h1>
        <p className="text-muted-foreground font-inherit tracking-tight text-xs">
          Experience a whole new world of learning... <br />
          Now let us quickly sign you in with our magic link to get started.
        </p>
        <div className="col-6 auth-widget">
          <AuthForm />
        </div>
      </Card>
    </div>
  )
}