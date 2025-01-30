import Footer from '@/components/landing/footer';

import Hero from '../components/landing/hero';

export default function LandingPage() {
  // Fix the color picker
  // add feature pictures
  // fix style loss if it becomes a problem
  return (
    <>
      <section className="mx-auto flex flex-col flex-1 w-full p-8">
        <Hero />
      </section>
      <Footer />
    </>
  );
}
