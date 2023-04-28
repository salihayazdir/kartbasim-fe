import { PropsWithChildren } from 'react';
import Head from 'next/head';

type ContentWrapperProps = {
  pageTitle: string;
};

export default function ContentWrapper({
  children,
  pageTitle,
}: PropsWithChildren<ContentWrapperProps>) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className='w-full p-10'>
        <h1 className='mb-6 text-2xl font-bold'>{pageTitle}</h1>
        {children}
      </main>
    </>
  );
}
