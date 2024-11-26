import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleForm } from '@/components/admin/articles/article-form';
import type { Article } from '@/types/admin';
import { supabase } from '@/lib/supabase';

export function ArticleEdit() {
  const [article, setArticle] = useState<Article | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
      navigate('/admin/articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Article>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('articles')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      navigate('/admin/articles');
    } catch (error) {
      console.error('Error updating article:', error);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Redigera artikel</h1>
      <ArticleForm 
        initialData={article} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}