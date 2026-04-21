import Link from "next/link";

type Props = {
  right?: React.ReactNode;
};

export default function SiteHeader({ right }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-3 text-foreground">
          <span className="font-serif text-[1.25rem] tracking-[-0.01em]">
            Wellbeinginus<span className="text-brand">.</span>
          </span>
          <span className="hidden text-[10px] font-medium tracking-[0.22em] text-subtle md:inline">
            Editor
          </span>
        </Link>
        <div className="flex items-center gap-6 text-[13px] font-medium text-muted sm:gap-8 sm:text-sm">
          {right ?? (
            <>
              <Link href="/generate" className="link-underline hover:text-foreground transition-colors">
                Write
              </Link>
              <Link href="/pricing" className="link-underline hover:text-foreground transition-colors">
                Pricing
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
