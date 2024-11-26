import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Shield } from 'lucide-react';
import type { Company } from '@/types/admin';
import { SERVICES, CERTIFICATIONS } from '@/types/admin';

interface CompanyFormProps {
  initialData?: Company;
  onSubmit: (data: Partial<Company>) => void;
  isSubmitting: boolean;
}

export function CompanyForm({ initialData, onSubmit, isSubmitting }: CompanyFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<Company>>({
    defaultValues: initialData || {
      services: [],
      certifications: [],
      is_verified: false,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Företagsnamn</Label>
            <Input
              id="name"
              {...register('name', { required: true })}
              placeholder="Företagsnamn"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Företagsnamn krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Stad</Label>
            <Input
              id="city"
              {...register('city', { required: true })}
              placeholder="Stad"
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">Stad krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              {...register('phone', { required: true })}
              placeholder="Telefonnummer"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Telefonnummer krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="E-post"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Giltig e-postadress krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Hemsida</Label>
            <Input
              id="website"
              {...register('website')}
              placeholder="https://"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              {...register('description', { required: true })}
              placeholder="Företagsbeskrivning..."
              className={`min-h-[150px] ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Beskrivning krävs</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Tjänster</Label>
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service}`}
                    checked={watch('services')?.includes(service)}
                    onCheckedChange={(checked) => {
                      const currentServices = watch('services') || [];
                      setValue(
                        'services',
                        checked
                          ? [...currentServices, service]
                          : currentServices.filter((s) => s !== service)
                      );
                    }}
                  />
                  <Label htmlFor={`service-${service}`}>{service}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Certifieringar</Label>
            <div className="grid grid-cols-2 gap-4">
              {CERTIFICATIONS.map((certification) => (
                <div key={certification} className="flex items-center space-x-2">
                  <Checkbox
                    id={`certification-${certification}`}
                    checked={watch('certifications')?.includes(certification)}
                    onCheckedChange={(checked) => {
                      const currentCertifications = watch('certifications') || [];
                      setValue(
                        'certifications',
                        checked
                          ? [...currentCertifications, certification]
                          : currentCertifications.filter((c) => c !== certification)
                      );
                    }}
                  />
                  <Label htmlFor={`certification-${certification}`}>{certification}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Anteckningar</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Interna anteckningar..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={watch('is_verified')}
              onCheckedChange={(checked) => setValue('is_verified', checked as boolean)}
            />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <Label htmlFor="verified">Verifiera företaget</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/admin/companies">
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