import { ChevronLeftIcon } from 'lucide-react';

import { PageHeader } from '@/shared/components/PageHeader';

interface CartGnbProps {
  onReturnToMenu: () => void;
  title?: string;
}

export function CartGnb({ onReturnToMenu, title = '장바구니' }: CartGnbProps) {
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
