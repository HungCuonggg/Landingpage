import React from 'react';
import Hero from '../components/Hero';
import Courses from '../components/Courses';
import RoadmapPreview from '../components/RoadmapPreview';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import DigitalLoomBackground from '../components/ui/digital-loom-background';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <DigitalLoomBackground 
        backgroundColor="#ffffff" 
        threadCount={60} 
        className="min-h-screen"
      >
        <Hero />
        <Courses />
        <RoadmapPreview />
        <Testimonials />
        <ContactForm />
      </DigitalLoomBackground>
    </main>
  );
}
