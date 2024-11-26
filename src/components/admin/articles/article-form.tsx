import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Article } from '@/types/admin';
import { ARTICLE_CATEGORIES } from '@/types/admin';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ArticleFormProps {
  initialData?: Article;
  onSubmit: (data: Partial<Article>) => void;
  isSubmitting: boolean;
}

export function ArticleForm({ initialData, onSubmit, isSubmitting }: ArticleFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<Partial<Article>>({
    defaultValues: initialData || {
      category: ARTICLE_CATEGORIES[0],
    },
  });

  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const content = watch('content') || '';
  const title = watch('title') || '';
  const category = watch('category');

  // Generate slug from title automatically
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/å/g, 'a')
        .replace(/ä/g, 'a')
        .replace(/ö/g, 'o')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setValue('slug', slug);
    }
  }, [title, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Titel</Label>
            <Input
              {...register('title', { required: true })}
              placeholder="Artikelns titel"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Titel krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>URL-slug (genereras automatiskt)</Label>
            <Input
              {...register('slug')}
              readOnly
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select
              value={category}
              onValueChange={(value) => setValue('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj kategori" />
              </SelectTrigger>
              <SelectContent>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Innehåll</Label>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'write' | 'preview')}>
              <TabsList className="mb-2">
                <TabsTrigger value="write">Skriv</TabsTrigger>
                <TabsTrigger value="preview">Förhandsgranska</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <textarea
                  {...register('content', { required: true })}
                  placeholder="Artikelns innehåll i Markdown-format..."
                  className={`w-full min-h-[400px] p-4 rounded-lg border ${
                    errors.content ? 'border-red-500' : 'border-input'
                  } bg-background`}
                />
              </TabsContent>
              <TabsContent value="preview" className="min-h-[400px] p-4 border rounded-lg">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
            {errors.content && (
              <p className="text-red-500 text-sm">Innehåll krävs</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/admin/articles">
          <Button type="button" variant="outline">
            Avbryt
          </Button>
        </Link>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sparar...' : 'Spara'}
        </Button>
      </div>
    </form>
  );
}