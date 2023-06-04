import { RefObject, useEffect, useState } from 'react';

const useInfiniteScroll = (initialData: any, ref: RefObject<HTMLDivElement>) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(initialData.slice(0, 10));
  }, [initialData]);

  const loadMoreData = () => {
    setisLoading(true);

    setTimeout(() => {
      const updatedData = initialData.slice(0, data.length + 15);
      setData(updatedData);
      setisLoading(false);
    }, 500);
  };

  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    const options = {
      rootMargin: '0px',
      threshold: 1,
    };

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];

      if (target.isIntersecting && data.length < initialData.length) {
        setisLoading(true);
        loadMoreData();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [data]);

  return { data, isLoading };
};

export default useInfiniteScroll;
