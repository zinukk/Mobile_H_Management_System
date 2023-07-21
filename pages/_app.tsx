import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import global from 'styles/global';
import theme from 'styles/theme';
import Layout from '@src/components/Common/Layout';
import BottomNav from '@src/components/Common/BottomNav';
import TopNav from '@src/components/Common/TopNav';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  const [queryClient] = useState(() => new QueryClient());

  const pageDepth = pathname.split('/').length;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Layout>
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
