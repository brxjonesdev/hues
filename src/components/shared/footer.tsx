export default function Footer() {
    return (
      <footer className="w-full py-10 bg-foreground text-background font-raleway ">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Brand and Description */}
            <div className="flex flex-col gap-6 items-start">
              <h2 className="text-3xl md:text-4xl tracking-tighter font-bold text-left">
                Palettr
              </h2>
              <p className="text-md max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                Discover, create, and share stunning color palettes effortlessly. 
                Palettr empowers designers and creatives to bring their vision to life.
              </p>
            </div>          
          </div>
        </div>
      </footer>
    );
  }
  