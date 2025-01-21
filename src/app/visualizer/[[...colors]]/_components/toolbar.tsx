import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { ArrowRight, MoveUp, SunIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ToolBar() {
  // convert visualizer colors to work from searchparams
  const generationMethods = [
    { name: 'Monochromatic', value: 'monochromatic' },
    { name: 'Analogous', value: 'analogous' },
    { name: 'Complementary', value: 'complementary' },
    { name: 'Split Complementary', value: 'split-complementary' },
    { name: 'Triadic', value: 'triadic' },
    { name: 'Tetradic', value: 'tetradic' },
  ];
  return (
    <div className="absolute bottom-10 left-0 right-0 flex flex-col items-end px-10 gap-4 ">
      <div>
        <Card className="w-fit">
          <CardHeader className="p-4 pb-0 font-syne">
            <CardTitle>Colors from Palette</CardTitle>
          </CardHeader>
          <Separator className="my-3" />
          <CardContent className="p-4 pt-0 flex flex-row gap-2">
            <div className="h-6 w-6 rounded-lg bg-red-400" />
            <div className="h-6 w-6 rounded-lg bg-red-400" />
            <div className="h-6 w-6 rounded-lg bg-red-400" />
            <div className="h-6 w-6 rounded-lg bg-red-400" />
            <div className="h-6 w-6 rounded-lg bg-red-400" />
            <div className="h-6 w-6 rounded-lg bg-red-400" />
          </CardContent>
        </Card>
      </div>
      <div className="h-fit flex flex-row gap-2 border-2 items-center p-2 w-fit rounded-xl font-inter">
        <div className="flex flex-row gap-2">
          <Button>Text</Button>
          <Button>Background</Button>
          <Button>Primary</Button>
          <Button>Secondary</Button>
          <Button>
            <ArrowRight />
          </Button>
          {/* <div className='flex gap-2'>
          <Button>Accent</Button>
          <Button>Surface</Button>
          <Button>Success</Button>
          <Button>Error</Button></div> */}
        </div>
        <div className="flex flex-row gap-2">
          <Button>
            <SunIcon />
          </Button>
          <div className="flex items-center">
            <Button className="rounded-r-none">Generate</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-fit p-0 px-2 rounded-l-none">
                  <MoveUp />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-inter">
                <DropdownMenuLabel>Generation Methods</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {generationMethods.map((method) => (
                  <DropdownMenuItem key={method.value} value={method.value}>
                    {method.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Export to Code</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
