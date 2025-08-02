import Banner from "./components/Banner";
import HowItWorks from "./components/HowItWorks";
import PopularSkills from "./components/PopularSkills";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import WhySkillSwap from "./components/WhySkillSwap";

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col gap-8 md:gap-14 sm:p-20">
      <Banner />
      <HowItWorks />
      <PopularSkills />
      <WhySkillSwap />
      <TestimonialsCarousel />
    </div>
  );
}
