// Placeholder file to prevent 404 errors
import { ServiceGrid } from '@/components/home/service-grid';

export function ForetagsflyttPage() {
  return (
    <div className="min-h-screen pt-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-serif mb-8">Sidan är under uppdatering</h1>
        <p className="text-text-light mb-16">Vi arbetar med att förbättra denna sida. Återkom gärna senare.</p>
      </div>
      <ServiceGrid title="Andra tjänster" className="bg-white" isFullWidth />
    </div>
  );
}