import React from 'react';
import ToolBar from './_components/toolbar';
import ShadcnUIToggle from './_components/shadcn-btn';




export default function Visualizer() {
  return (
  <section className='flex-1 relative'>
    <ShadcnUIToggle/>
    <ToolBar/>
  </section>);
}
