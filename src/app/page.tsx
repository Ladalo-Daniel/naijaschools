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
import ImageGallery from "../components/home/ImageGallery";
import Pro_IntroSection from "@/components/home/Pro_IntroSection";
import Pro_Quiz from "@/components/home/features/Pro_Quiz";
import Pro_FeatureSection from "@/components/home/features/Pro_FeatureSection";

export default async function Home() {

  const session = await getUserSession()
  return (
    <div className="mx-auto flex flex-col gap-4 border bg-gradient-to-br ">
    <AuthTopNav isHome />
    <div className="py-20">
      <Pro_IntroSection />
      <Pro_FeatureSection />
      <TestimonialsSection />
      <Suspense fallback={<ArticleSkeleton />}>
        <BlogSection/>
      </Suspense>
      <FooterSection />
    </div>
    </div>
  )
}
