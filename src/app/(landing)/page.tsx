import Footer from '@/components/shared/footer';
import { Features } from './components/features';
import Hero from './components/hero';

export default function LandingPage() {
  return (
    <>
    <section>
      <Hero />
      <Features/>
    </section>
    <Footer/></>
  );
}
