import { ChevronLeftIcon } from 'lucide-react';

import { PageHeader } from '@/shared/components/PageHeader';

interface MenuDetailGnbProps {
  onReturnToMenu: () => void;
  title?: string;
}

export function MenuDetailGnb({ onReturnToMenu, title = '메뉴 상세' }: MenuDetailGnbProps) {
  return (
    <PageHeader
      leftSide={
        <button
          type="button"
          onClick={onReturnToMenu}
          className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          aria-label="메뉴 화면으로 돌아가기"
        >
          <ChevronLeftIcon className="size-5" />
        </button>
      }
      title={title}
    />
  );
}
