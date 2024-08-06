import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ProjectShowcaseSlider from './components/ProjectShowcaseSlider';

const Header = dynamic(() => import('./components/Header'), { ssr: false });
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });
const Services = dynamic(() => import('./components/Services'), { ssr: false });
const Projects = dynamic(() => import('./components/Projects'), { ssr: false });
const About = dynamic(() => import('./components/About'), { ssr: false });
const Contact = dynamic(() => import('./components/Contact'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Hero />
        <Services />
        <ProjectShowcaseSlider />
        <Projects />
        <About />
        <Contact />
      </Suspense>
    </main>
  );
}