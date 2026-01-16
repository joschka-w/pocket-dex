import { PropsWithChildren } from 'react';

function LegalLayout({ children }: PropsWithChildren) {
  return (
    <main className="prose prose-code:after:content-[''] prose-code:before:content-[''] prose-invert prose-neutral mt-15 block w-full max-w-[75ch]">
      {children}
    </main>
  );
}

export default LegalLayout;
