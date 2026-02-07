import { useEffect } from "react";

type Options = {
  selector: string;
  threshold?: number;
  rootMargin?: string;
  onVisible?: (el: HTMLElement) => void;
  onHidden?: (el: HTMLElement) => void;
};

export function useInViewOnceContainer(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: any[] = [],
  options: Options
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll(options.selector)) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) options.onVisible?.(el);
          else options.onHidden?.(el);
        }
      },
      { threshold: options.threshold, rootMargin: options.rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
}
