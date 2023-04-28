import { INavItem } from './navMenuItems';
import Link from 'next/link';

export interface NavItemProps {
  navItemProps: INavItem;
  navItemStyles: string;
  isActive: boolean;
}

export default function NavItem({
  navItemProps,
  navItemStyles,
  isActive,
}: NavItemProps) {
  const { name, slug } = navItemProps;
  return (
    <Link
      href={`/${slug}`}
      className={`${navItemStyles} ${isActive && 'text-red-500'}`}
    >
      {name}
    </Link>
  );
}
