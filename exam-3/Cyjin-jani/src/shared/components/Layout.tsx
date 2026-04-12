import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-dvh bg-gray-200">
      <div className="mx-auto flex h-full w-full max-w-md flex-col bg-background">
        <main className="flex-1 overflow-y-auto pb-24">{children}</main>
      </div>
    </div>
  );
}
