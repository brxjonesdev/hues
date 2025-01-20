import Footer from '@/components/landing/footer';
import { Features } from '../components/landing/features';
import Hero from '../components/landing/hero';

export default function LandingPage() {
  // Fix the color picker
  // add feature pictures
  // fix style loss if it becomes a problem
  return (
    <>
      <section className="mx-auto max-w-7xl flex flex-col py-16">
        <Hero />
        <Features />
      </section>
      <Footer />
    </>
  );
}
