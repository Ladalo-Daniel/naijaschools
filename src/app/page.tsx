import AuthTopNav from "@/components/AuthTopNav";
import MaxWrapper from "@/components/MaxWrapper";
import BlogSection from "@/components/home/BlogSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/FooterSection";
import IntroSection from "@/components/home/IntroSection"
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { getUserSession } from "@/supabase/session";
import { Session } from "@supabase/supabase-js";
import { Suspense } from "react";
import ArticleSkeleton from "@/components/skeletons/ArticleSkeleton";

export default async function Home() {

  const session = await getUserSession()
  return (
    <div className="mx-auto flex flex-col gap-4 border bg-gradient-to-tr ">
    <AuthTopNav isHome />
    <MaxWrapper className="flex-1 gap-9 min-h-screen py-24 px-4 md:px-20 max-w-7xl"
    >
      <IntroSection session={session as Session} />
      <FeaturesSection />
      <TestimonialsSection />
      <Suspense fallback={<ArticleSkeleton />}>
        <BlogSection />
      </Suspense>
      <FooterSection />
    </MaxWrapper>
    </div>
  )
}
