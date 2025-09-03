"use client";

import BackToTop from "@/app/components/back-to-top";
import Spinner from "@/app/components/spinner";
import { useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
  allTicketsCount?: number;
}

export default function InfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  children,
  allTicketsCount,
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const element = loadingRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div className="w-full">
      {children}

      {hasMore && (
        <div ref={loadingRef} className="flex justify-center items-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner className="size-5" />
              <span className="text-sm text-base-content">Carregando...</span>
            </div>
          ) : (
            <div className="h-8" />
          )}
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-8 text-sm text-base-content/70">
          Todos os ingressos foram carregados
        </div>
      )}

      {allTicketsCount && allTicketsCount > 15 && hasMore && (
        <div className="text-center py-4 text-sm text-base-content/60">
          Use o botão &quot;Voltar ao topo&quot; para navegar rapidamente
        </div>
      )}

      <BackToTop
        show={!hasMore || (allTicketsCount ? allTicketsCount > 15 : false)}
      />
    </div>
  );
}
