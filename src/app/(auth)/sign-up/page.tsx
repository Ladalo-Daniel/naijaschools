import { Card } from "@nextui-org/card";
import AuthForm from "../auth-form";

export default function Home() {
  return (
    <div className="flex mx-auto justify-center items-center min-h-screen w-full">
      <Card className="p-8 flex flex-col gap-6">
        <h1 className="text-2xl tracking-tight text-foreground">Welcome to naijaschools</h1>
        <p className="text-muted-foreground font-inherit">
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