import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import LoveLetterSection from "@/components/LoveLetterSection";
import LoveGallery from "@/components/LoveGallery";
import HeartCatchGame from "@/components/HeartCatchGame";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <FloatingHearts />
      <HeroSection />
      <LoveLetterSection />
      <LoveGallery />
      <HeartCatchGame />
      <FooterSection />
    </div>
  );
};

export default Index;
