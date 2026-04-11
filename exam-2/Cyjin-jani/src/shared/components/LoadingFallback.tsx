import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

export function LoadingFallback({ message = '불러오는 중', className }: LoadingFallbackProps) {
  return (
    <div
      role="status"
      aria-label={message}
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground',
        className,
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
