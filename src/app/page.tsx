import AuthTopNav from "@/components/AuthTopNav";
import Section1 from "@/components/home/section1";
import Section2 from "@/components/home/section2";
import Section3 from "@/components/home/section3";

export default function Home() {
  return (
    <>
    <AuthTopNav isHome />
    <main className="flex gap-9 min-h-screen flex-col py-24 px-0 md:px-0 bg-slate-100 dark:bg-zinc-900">
      <Section1 />
      <Section2 />
      <Section3 />
    </main>
    </>
  )
}
