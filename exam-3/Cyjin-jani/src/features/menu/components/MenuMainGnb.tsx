import { PageHeader } from '@/shared/components/PageHeader';

interface MenuMainGnbProps {
  title?: string;
}

export function MenuMainGnb({ title = 'Fundamental Cafe' }: MenuMainGnbProps) {
  return (
    <PageHeader
      className="static px-4 py-4"
      leftSide={
        <a
          href="https://sipe.team/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-lg font-bold tracking-tight text-orange-500"
        >
          SIPE
        </a>
      }
      title={title}
    />
  );
}
