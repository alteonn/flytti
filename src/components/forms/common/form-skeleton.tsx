import { Skeleton } from '@/components/ui/skeleton';

export function FormSkeleton() {
  return (
    <div className="space-y-8">
      {/* Input Fields */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-5 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>
        ))}
      </div>

      {/* Radio Group */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" /> {/* Label */}
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Radio */}
              <Skeleton className="h-4 w-24" /> {/* Label */}
            </div>
          ))}
        </div>
      </div>

      {/* Select */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-28" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Select */}
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" /> {/* Label */}
        <Skeleton className="h-32 w-full" /> {/* Textarea */}
      </div>
    </div>
  );
}