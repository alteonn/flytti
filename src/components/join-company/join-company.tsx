import { motion } from 'framer-motion';
import { HeroSection } from './hero-section';
import { ProcessSteps } from './process-steps';
import { Benefits } from './benefits';
import { Requirements } from './requirements';
import { Flexibility } from './flexibility';
import { Quality } from './quality';
import { ContactForm } from './contact-form';

export function JoinCompany() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProcessSteps />
      <Benefits />
      <Requirements />
      <Flexibility />
      <Quality />
      <ContactForm />
    </div>
  );
}