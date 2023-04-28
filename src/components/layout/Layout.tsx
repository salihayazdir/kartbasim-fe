import { PropsWithChildren } from 'react';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import useCurrentPageProps from '@/utils/useCurrentPageProps';

export default function Layout({ children }: PropsWithChildren) {
  const currentPageProps = useCurrentPageProps();

  return (
    <div className='flex min-h-screen'>
      <Sidebar currentPageProps={currentPageProps} />
      <ContentWrapper pageTitle={currentPageProps.name}>
        {children}
      </ContentWrapper>
    </div>
  );
}
