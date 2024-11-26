import { motion } from 'framer-motion';
import { Shield, CheckCircle, Users } from 'lucide-react';

const cities = [
  { name: 'Kiruna', x: '60%', y: '2%' },
  { name: 'Luleå', x: '65%', y: '8%' },
  { name: 'Umeå', x: '62%', y: '15%' },
  { name: 'Östersund', x: '48%', y: '22%' },
  { name: 'Sundsvall', x: '58%', y: '30%' },
  { name: 'Gävle', x: '55%', y: '38%' },
  { name: 'Uppsala', x: '58%', y: '44%' },
  { name: 'Stockholm', x: '62%', y: '48%' },
  { name: 'Örebro', x: '45%', y: '52%' },
  { name: 'Linköping', x: '52%', y: '58%' },
  { name: 'Göteborg', x: '35%', y: '62%' },
  { name: 'Jönköping', x: '45%', y: '66%' },
  { name: 'Växjö', x: '42%', y: '72%' },
  { name: 'Kalmar', x: '48%', y: '78%' },
  { name: 'Halmstad', x: '35%', y: '84%' },
  { name: 'Malmö', x: '38%', y: '92%' },
];

const features = [
  {
    icon: Shield,
    title: 'Kvalitetssäkrade partners',
    description: 'Alla våra partners genomgår noggrann granskning',
  },
  {
    icon: CheckCircle,
    title: 'Verifierade flyttfirmor',
    description: 'Vi samarbetar endast med licensierade och försäkrade företag',
  },
  {
    icon: Users,
    title: 'Personlig service',
    description: 'Vi matchar dig med flyttfirmor som passar dina specifika behov',
  },
];

export function TrustSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Hitta en flyttfirma du kan lita på
            </h2>
            <p className="text-lg text-text-light mb-12 leading-relaxed">
              Oavsett var i Sverige du befinner dig, hjälper Flytti.se dig att hitta pålitliga 
              flyttfirmor nära dig. Vi samarbetar enbart med seriösa och noggrant granskade 
              flyttfirmor som hanterar dina ägodelar med största omsorg. Din trygghet är vår 
              högsta prioritet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="mt-1">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-light">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative md:aspect-[3/4] aspect-[2/5] bg-primary-light/20 rounded-3xl overflow-hidden"
            >
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary-light/30 to-transparent" />
              
              {/* City Markers */}
              {cities.map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="absolute"
                  style={{ left: city.x, top: city.y }}
                >
                  <div className="relative -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="w-2.5 h-2.5 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-sm font-medium text-text-light">
                        {city.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}