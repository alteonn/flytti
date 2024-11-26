import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Remove markdown headers from title
      if (data) {
        data.title = data.title.replace(/^#+\s+/, '');
      }

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse max-w-3xl mx-auto">
            <div className="h-8 bg-white/50 rounded-lg w-1/3 mb-8" />
            <div className="h-64 bg-white/50 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-serif text-text-light">
              Artikeln kunde inte hittas
            </h1>
            <Link 
              to="/artiklar"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mt-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Tillbaka till artiklar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light/30 to-bg-light pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <Link 
            to="/artiklar"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till artiklar
          </Link>
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <span className="inline-block px-3 py-1 bg-primary-light/20 text-primary rounded-full text-sm">
            {article.category}
          </span>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-4">
            {article.title}
          </h1>
          <div className="text-text-light">
            Publicerad {format(new Date(article.created_at), 'PPP', { locale: sv })}
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-primary/10">
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text prose-p:text-text-light prose-strong:text-text prose-strong:font-semibold">
              <ReactMarkdown
                components={{
                  // Headers
                  h1: ({ children }) => <h1 className="text-3xl font-serif mb-6">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-serif mt-8 mb-4">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-serif mt-6 mb-3">{children}</h3>,
                  
                  // Lists
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-2 my-4 text-text-light">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-2 my-4 text-text-light">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-text-light">{children}</li>
                  ),
                  
                  // Paragraphs and text
                  p: ({ children }) => (
                    <p className="text-text-light leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-text">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-text-light">
                      {children}
                    </em>
                  ),
                  
                  // Links
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      className="text-primary hover:text-primary-dark underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  
                  // Blockquotes
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/20 pl-4 my-4 italic text-text-light">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  );
}