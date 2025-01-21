import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-foreground text-background font-inter rainbow-bg">
      <div className="px-8">
        <div className="">
          {/* Brand and Description */}
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-2xl md:text-3xl tracking-tighter font-bold text-left font-syne">
              Hues
            </h2>
            <div className='flex justify-between w-full flex-col md:flex-row gap-4'>
            <p className="text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
              Discover, create, and share stunning color palettes effortlessly.
              Hues empowers designers and creatives to bring their vision to
              life.
            </p>
            <p className="font-syne text-sm text-background/75">
              Built with purpose, passion, and love by{' '}
              <Link href="https://portfolio.braxtonjones.dev/">
                brxjonesdev
              </Link>
              .
            </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
