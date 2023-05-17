import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import global from 'styles/global';
import theme from 'styles/theme';
import Layout from '@src/components/Layout/Layout';
import BottomNav from '@src/components/BottomNav/BottomNav';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Layout>
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
