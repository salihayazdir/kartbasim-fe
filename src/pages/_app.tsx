import '@/styles/globals.css';
import AppContextProvider from '@/context/AppContext';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { Inter } from 'next/font/google';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Cookies from 'js-cookie';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const client = new QueryClient();
export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const accessToken = Cookies.get('Authorization');
  const refreshToken = Cookies.get('x-refresh');

  axios.defaults.headers.common['Authorization'] = accessToken;
  axios.defaults.headers.common['x-refresh'] = refreshToken;
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000'
      : undefined;

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
