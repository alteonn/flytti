import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleForm } from '@/components/admin/articles/article-form';
import type { Article } from '@/types/admin';
import { supabase } from '@/lib/supabase';

export function ArticleCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: Partial<Article>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('articles')
        .insert([data]);

      if (error) throw error;

      navigate('/admin/articles');
    } catch (error) {
      console.error('Error creating article:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Skapa artikel</h1>
      <ArticleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}