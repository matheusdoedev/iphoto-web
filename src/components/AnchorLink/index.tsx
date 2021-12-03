import {
  AnchorHTMLAttributes,
  forwardRef,
  useRef,
  useImperativeHandle,
  ForwardedRef,
} from 'react';

interface IAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const AnchorLink = forwardRef<HTMLAnchorElement>(
  (
    { children, href, onClick, ...props }: IAnchorProps,
    innerRef?: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const anchorRef = useRef<HTMLAnchorElement>(null);

    useImperativeHandle<HTMLAnchorElement | null, HTMLAnchorElement | null>(
      innerRef,
      () => anchorRef.current,
      [],
    );

    return (
      <a href={href} onClick={onClick} ref={anchorRef} {...props}>
        {children}
      </a>
    );
  },
);

export default AnchorLink;
