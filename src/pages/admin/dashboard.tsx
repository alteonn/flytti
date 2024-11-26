import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Building2, MessageSquare, Truck, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  activeCompanies: number;
  newLeads: number;
  totalArticles: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    activeCompanies: 0,
    newLeads: 0,
    totalArticles: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Get active companies count
      const { count: companiesCount } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true);

      // Get new leads from last 24h
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());

      // Get total articles count
      const { count: articlesCount } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });

      setStats({
        activeCompanies: companiesCount || 0,
        newLeads: leadsCount || 0,
        totalArticles: articlesCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Aktiva företag',
      value: stats.activeCompanies,
      icon: Building2,
      color: 'text-primary',
      bgColor: 'from-primary-light/30 to-primary-light/10',
      iconBg: 'from-primary/20 to-primary/10',
      href: '/admin/companies'
    },
    {
      title: 'Nya leads',
      value: stats.newLeads,
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'from-primary-light/30 to-primary-light/10',
      iconBg: 'from-primary/20 to-primary/10',
      href: '/admin/leads'
    },
    {
      title: 'Antal artiklar',
      value: stats.totalArticles,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'from-primary-light/30 to-primary-light/10',
      iconBg: 'from-primary/20 to-primary/10',
      href: '/admin/articles'
    },
  ];

  const actionCards = [
    {
      title: 'Hantera artiklar',
      description: 'Skapa och redigera artiklar för webbplatsen',
      icon: FileText,
      href: '/admin/articles',
      color: 'from-primary to-primary-dark',
      bgColor: 'from-primary-light/20 to-primary-light/10',
    },
    {
      title: 'Hantera företag',
      description: 'Lägg till och redigera företag i databasen',
      icon: Building2,
      href: '/admin/companies',
      color: 'from-primary to-primary-dark',
      bgColor: 'from-primary-light/20 to-primary-light/10',
    },
    {
      title: 'Hantera leads',
      description: 'Se och hantera inkomna leads',
      icon: MessageSquare,
      href: '/admin/leads',
      color: 'from-primary to-primary-dark',
      bgColor: 'from-primary-light/20 to-primary-light/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl blur-lg opacity-20" />
            <div className="relative w-12 h-12 bg-gradient-to-br from-primary-light/90 to-white rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-6 h-6 text-primary" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent rounded-xl" />
            </div>
          </div>
          <div className="text-2xl font-serif font-bold">
            <span className="text-text">Flytti</span>
            <span className="text-primary">.se</span>
          </div>
        </div>
        <p className="text-lg text-text-light">
          Översikt över plattformens aktivitet
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <Link key={stat.title} to={stat.href}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl border bg-gradient-to-br shadow-sm group hover:shadow-md transition-shadow"
            >
              <div className="relative z-10 p-6 bg-white bg-opacity-90 backdrop-blur-sm">
                <div className="flex justify-between">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center transform -rotate-6 transition-transform group-hover:rotate-0`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-text-light">{stat.title}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br opacity-10">
                <div className={`w-full h-full bg-gradient-to-br ${stat.bgColor}`} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionCards.map((card, index) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <Link to={card.href} className="block h-full">
              <div className="relative h-full group">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl blur-xl">
                  <div className={`w-full h-full bg-gradient-to-br ${card.bgColor}`} />
                </div>
                <div className="relative h-full bg-white rounded-xl p-6 shadow-sm border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  <div className="mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-primary-light/30 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                        <card.icon className={`w-6 h-6 bg-gradient-to-br ${card.color} text-transparent bg-clip-text`} />
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-primary/5 transform group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-text-light text-sm">{card.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}