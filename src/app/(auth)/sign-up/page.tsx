import { Card } from "@nextui-org/card";
import AuthForm from "../auth-form";
import { getUserSession } from "@/supabase/session";
import { redirect } from "next/navigation";
import GoogleSigninButton from "../GoogleSigninButton";

export default async function Home() {
  const session = await getUserSession()
  if (session?.user) redirect("/dashboard")
  return (
    <section className="w-full h-full min-h-screen"
      style={{
        backgroundImage: "url('/images/signup-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="flex mx-auto justify-center items-center min-h-screen w-full p-4 backdrop:fill-transparent backdrop-filter transition-all"
      >
        <Card className="p-8 flex flex-col gap-6 bg-white">
          <h1 className="text-2xl tracking-tight font-semibold text-primary">Welcome to naijaschools</h1>
          <p className="text-muted-foreground font-inherit tracking-tight">
            Experience a whole new world of learning... <br />
            Now let us quickly sign you in with our magic link to get started.
          </p>
          <div className="col-6 auth-widget">
            <AuthForm />
          </div>
        </Card>
      </div>
    </section>
  )
}