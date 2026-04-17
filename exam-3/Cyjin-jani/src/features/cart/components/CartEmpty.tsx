import { Link } from 'wouter';

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-20 text-center">
      <p className="text-sm text-muted-foreground">장바구니가 비어 있어요.</p>
      <Link
        href="/"
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        메뉴로 돌아가기
      </Link>
    </div>
  );
}
