import { Card, CardContent } from '@/components/ui/card';

interface LoadingSkeletonProps {
  rows?: number;
  showHeader?: boolean;
}

export const LoadingSkeleton = ({ rows = 5, showHeader = true }: LoadingSkeletonProps) => {
  return (
    <Card>
      {showHeader && (
        <div className="p-4 border-b border-border">
          <div className="h-10 bg-muted rounded animate-pulse w-64" />
        </div>
      )}
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                </div>
                <div className="h-8 w-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const TableSkeleton = () => {
  return (
    <Card>
      <div className="p-4 border-b border-border">
        <div className="h-10 bg-muted rounded animate-pulse w-64" />
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex gap-4 pb-3 border-b border-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse flex-1" />
            ))}
          </div>
          {/* Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4 py-3">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-4 bg-muted rounded animate-pulse flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export const CardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
          <div className="h-8 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
        </div>
      </CardContent>
    </Card>
  );
};
