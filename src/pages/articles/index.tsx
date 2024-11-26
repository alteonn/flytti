import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Search, Book, Home, Box, Building2, Sparkles, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { ARTICLE_CATEGORIES } from '@/types/admin';
import { MetaTags } from '@/components/seo/meta-tags';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  created_at: string;
}

// Helper function to get category icon
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Flytthjälp':
      return Box;
    case 'Företagsflytt':
      return Building2;
    case 'Utlandsflytt':
      return Globe;
    case 'Flyttstädning':
      return Sparkles;
    case 'Magasinering':
      return Box;
    case 'Dödsbo':
      return Home;
    default:
      return Book;
  }
};

// Helper function to get preview text
const getPreviewText = (content: string) => {
  // Remove markdown headers
  const withoutHeaders = content.replace(/^#+\s+.*$/gm, '');
  // Remove markdown formatting
  const plainText = withoutHeaders.replace(/[#*_`~]/g, '');
  // Get first few sentences
  return plainText.trim().split(/[.!?]/).slice(0, 2).join('. ') + '.';
};

const ARTICLES_PER_PAGE = 9;

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchArticles = async (pageNumber: number = 0, isInitial: boolean = false) => {
    try {
      setIsLoadingMore(!isInitial);
      const start = pageNumber * ARTICLES_PER_PAGE;
      const end = start + ARTICLES_PER_PAGE - 1;

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) throw error;

      // Remove markdown headers from titles
      const processedArticles = data?.map(article => ({
        ...article,
        title: article.title.replace(/^#+\s+/, '')
      })) || [];

      if (isInitial) {
        setArticles(processedArticles);
      } else {
        setArticles(prev => [...prev, ...processedArticles]);
      }

      setHasMore(processedArticles.length === ARTICLES_PER_PAGE);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchArticles(0, true);
  }, []);

  useEffect(() => {
    if (page > 0) {
      fetchArticles(page);
    }
  }, [page]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Generate structured data for articles
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredArticles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": article.title,
        "datePublished": article.created_at,
        "articleSection": article.category,
        "url": `https://flytti.se/artiklar/${article.slug}`
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <MetaTags 
        title="Flyttguider & Tips - Artiklar om flytt | Flytti.se"
        description="Praktiska guider och expertråd för en smidig flytt. Läs våra artiklar om allt från packning och flyttstädning till internationella flyttar."
        canonicalUrl="https://flytti.se/artiklar"
        structuredData={structuredData}
      />

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-6">
            Kunskap & Inspiration
          </h1>
          <p className="text-lg text-text-light">
            Upptäck våra guider och artiklar för en smidigare flytt
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Sök bland våra artiklar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Sök artiklar"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Alla kategorier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kategorier</SelectItem>
                  {ARTICLE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-primary/10 h-[300px]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-light/20 rounded-xl" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => {
              const Icon = getCategoryIcon(article.category);
              const previewText = getPreviewText(article.content);
              const isLastArticle = index === filteredArticles.length - 1;
              
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  ref={isLastArticle ? lastArticleRef : null}
                >
                  <Link
                    to={`/artiklar/${article.slug}`}
                    className="block h-full"
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10 h-full hover:shadow-xl transition-all duration-300 relative group">
                      {/* Category and Date */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary-light/20 flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {article.category}
                          </span>
                        </div>
                        <span className="text-sm text-text-light">
                          {format(new Date(article.created_at), 'PPP', { locale: sv })}
                        </span>
                      </div>

                      {/* Title and Preview */}
                      <div className="space-y-4">
                        <h2 className="text-xl font-serif group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h2>
                        <p className="text-text-light text-sm line-clamp-3">
                          {previewText}
                        </p>
                      </div>

                      {/* Read More Link */}
                      <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                        <span>Läs mer</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="text-center mt-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm border border-primary/10"
          >
            <FileText className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <h3 className="text-2xl font-serif mb-2">Inga artiklar hittades</h3>
            <p className="text-text-light">
              Försök med andra söktermer eller välj en annan kategori
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}