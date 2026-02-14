import AmbientParticles from "./components/AmbientParticles";
import HeroSection from "./components/HeroSection";
import QuoteSection from "./components/QuoteSection";
import StoryCards from "./components/StoryCards";
import LoveGallery from "./components/LoveGallery";
import MemoryMatchGame from "./components/MemoryMatchGame";
import FooterSection from "./components/FooterSection";

const Index = () => {
  return (
    <div
      className="relative min-h-screen bg-background overflow-x-hidden"
      style={{ perspective: "1200px" }}
    >
      <AmbientParticles />
      <HeroSection />
      <QuoteSection />
      <StoryCards />
      <LoveGallery />
      <MemoryMatchGame />
      <FooterSection />
    </div>
  );
};

export default Index;
