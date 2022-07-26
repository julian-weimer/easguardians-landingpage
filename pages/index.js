import AboutSection from "../components/about-section.js";
import ContactSection from "../components/contact-section.js";
import ExpertiseSection from "../components/expertise-section.js";
import Footer from "../components/footer.js";
import Hero from "../components/hero.js";
import Navigation from "../components/navigation.js";
import TestimonialsSection from "../components/testimonials-section.js";

const Home = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <AboutSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;
