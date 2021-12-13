import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface IAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

function AnchorLink({ href, children, ...props }: IAnchorProps): JSX.Element {
  return (
    <Link href={href}>
      <a href={href} {...props}>
        {children}
      </a>
    </Link>
  );
}

export default AnchorLink;
