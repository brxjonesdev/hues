import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function InvalidColors({ error }: { error: string }) {
  const randomErrorMessages = [
    'Oops! Something went wrong.',
    "Something's amis...",
    'Uh oh! Looks like there was an error.',
    'Error! Error! Error!',
    'Whoops! An error occurred.',
  ];
  return (
    <section className="flex-1 flex w-full justify-center items-center">
      <Card className="w-full h-full max-w-2xl max-h-36 font-inter flex flex-col">
        <CardHeader>
          <CardTitle className="lg:text-2xl">
            {
              randomErrorMessages[
                Math.floor(Math.random() * randomErrorMessages.length)
              ]
            }
          </CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-1 rainbow-bg rounded-b-xl"></CardFooter>
      </Card>
    </section>
  );
}
