import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

export interface PageHeaderProps {
  leftSide?: ReactNode;
  title?: ReactNode;
  rightSide?: ReactNode;
  className?: string;
}

function renderPageHeaderTitle(title: ReactNode) {
  if (!title) return null;
  if (typeof title === 'string') {
    return <h1 className="truncate text-lg font-bold text-foreground">{title}</h1>;
  }
  return title;
}

export function PageHeader({ leftSide, title, rightSide, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-background px-2 py-3',
        className,
      )}
    >
      {leftSide && <div className="flex shrink-0 items-center gap-2">{leftSide}</div>}
      <div className="min-w-0 flex-1">{renderPageHeaderTitle(title)}</div>
      {rightSide && <div className="flex shrink-0 items-center gap-2">{rightSide}</div>}
    </header>
  );
}
