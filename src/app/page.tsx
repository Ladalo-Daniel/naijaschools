import AuthTopNav from "@/components/AuthTopNav";
import Section1 from "@/components/home/section1";
import { getUserSession } from "@/supabase/session";

export default function Home() {
  return (
    <>
    <AuthTopNav isHome />
    <main className="flex gap-9 min-h-screen flex-col py-24 px-4 md:px-20 bg-slate-100 dark:bg-zinc-900">
      <Section1 />
    </main>
    </>
  )
}
