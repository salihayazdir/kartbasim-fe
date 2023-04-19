import { PropsWithChildren } from 'react';
import Sidebar from './navigation/Sidebar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
