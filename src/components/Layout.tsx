import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const navMenuItems = [
    {
      name: 'Ana Sayfa',
      slug: '',
    },
    {
      name: 'Tanımlar',
      slug: '',
    },
  ];

  return (
    <>
      <main>{children}</main>
    </>
  );
}
