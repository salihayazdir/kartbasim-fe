import '@/styles/globals.css';
import AppContextProvider from '@/context/AppContext';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { Inter } from 'next/font/google';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const client = new QueryClient();

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const routesWithoutLayout = ['/giris'];
  const getContent = () => {
    if (routesWithoutLayout.includes(appProps.router.pathname))
      return <Component {...pageProps} />;

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <AppContextProvider>
      <QueryClientProvider client={client}>
        <div className={`${inter.className}`}>{getContent()}</div>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </AppContextProvider>
  );
}
