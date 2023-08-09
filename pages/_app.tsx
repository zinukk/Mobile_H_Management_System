import { useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { useLoading } from '@src/hooks/useLoading';
import global from 'styles/global';
import theme from 'styles/theme';
import Layout from '@src/components/Common/Layout';
import TopNav from '@src/components/Common/TopNav';
import BottomNav from '@src/components/Common/BottomNav';
import Spinner from '@src/components/Common/Spinner';

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const [queryClient] = useState(() => new QueryClient());

  const pageDepth = pathname.split('/').length;

  const isLoading: boolean = useLoading();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Layout>
            {isLoading && <Spinner />}
            {pageDepth === 2 ? <TopNav /> : null}
            <Global styles={global} />
            <Component {...pageProps} />
            <BottomNav />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
