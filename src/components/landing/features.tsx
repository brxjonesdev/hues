import { Badge } from '@/components/ui/badge';

export const Features = () => (
  <div className="w-full py-20 font-syne">
    <div className="container mx-auto">
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Features</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Empowering Your Creativity with Hues
            </h2>
            <p className="font-inter text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
              Explore, create, and share stunning color palettes with powerful
              tools designed for designers and developers.
            </p>
          </div>
        </div>

        
      </div>
    </div>
  </div>
);
