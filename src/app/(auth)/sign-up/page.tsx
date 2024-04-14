import { Card } from "@nextui-org/card";
import AuthForm from "../auth-form";
import { getUserSession } from "@/supabase/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sigin up | Login into Naijaschools",
  description: "Sign up or login to Naijaschools to get started."
}

export default async function Home() {
  const session = await getUserSession()
  if (session?.user) redirect("/dashboard")
  return (
    <section className="w-full h-full min-h-screen flex "
    >
      <div className="flex-1 hidden md:block"
        >
          <Image
            src={'/images/home-pic3.jpg'}
            height={1000}
            width={1000}
            alt="Sign Up BG"
            className="min-h-screen w-full object-cover"
          />
        </div>
      <div className="flex flex-1 mx-auto bg-gradient justify-center items-center min-h-screen w-full p-4 backdrop:fill-transparent backdrop-filter transition-all"
      >
        <Card className="p-8 flex flex-col gap-6 bg-background shadow-none">
          <h1 className="text-3xl tracking-tight font-semibold text-primary">Sign Into Naijaschools</h1>
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