import Footer from '@/components/landing/footer';
import { Features } from '../components/landing/features';
import Hero from '../components/landing/hero';

export default function LandingPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl">
        <Hero />
        <Features />
      </section>
      <Footer />
    </>
  );
}
