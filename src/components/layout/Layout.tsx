import { PropsWithChildren, useContext } from 'react';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import useCurrentPageProps from '@/utils/useCurrentPageProps';
import { AppContext } from '@/context/AppContext';
import useSetUserContext from '@/utils/useSetUserContext';

export default function Layout({ children }: PropsWithChildren) {
  const currentPageProps = useCurrentPageProps();

  const { userContext } = useContext(AppContext);

  useSetUserContext();
  console.log(userContext);

  return (
    <div className='flex min-h-screen'>
      <Sidebar currentPageProps={currentPageProps} />
      <ContentWrapper pageTitle={currentPageProps.name}>
        {children}
      </ContentWrapper>
    </div>
  );
}
