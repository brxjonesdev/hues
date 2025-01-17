import { Badge } from '@/components/ui/badge';

export const Features = () => (
  <div className="w-full py-20 font-syne">
    <div className="container mx-auto px-8">
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Custom Color Palettes */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Custom Color Palettes</h3>
            <p className="text-muted-foreground text-base">
              Use an intuitive color picker to create personalized palettes
              tailored to your needs.
            </p>
          </div>

          {/* Color Theory Rules */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Color Theory Integration</h3>
            <p className="text-muted-foreground text-base">
              Generate palettes based on color theory rules like complementary,
              triadic, and analogous.
            </p>
          </div>

          {/* Image-to-Palette */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Image-to-Palette</h3>
            <p className="text-muted-foreground text-base">
              Upload images to extract dominant colors and create matching
              palettes automatically.
            </p>
          </div>

          {/* Gradient Maker */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Gradient Maker</h3>
            <p className="text-muted-foreground text-base">
              Design and customize gradients to bring depth and vibrancy to your
              projects.
            </p>
          </div>

          {/* Contrast Checker */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Contrast Checker</h3>
            <p className="text-muted-foreground text-base">
              Ensure accessibility with built-in tools for verifying contrast
              and readability.
            </p>
          </div>

          {/* Shadcn Themes */}
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">Shadcn Themes</h3>
            <p className="text-muted-foreground text-base">
              Export your palettes as Shadcn themes for seamless integration
              into your projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
