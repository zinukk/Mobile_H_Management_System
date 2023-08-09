import Router from 'next/router';
import { useEffect, useState } from 'react';

export const useLoading = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);

  const start = () => {
    setisLoading(true);
  };

  const end = () => {
    setisLoading(false);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', start);

    Router.events.on('routeChangeComplete', end);

    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);

      Router.events.off('routeChangeComplete', end);

      Router.events.off('routeChangeError', end);
    };
  }, []);

  return isLoading;
};
