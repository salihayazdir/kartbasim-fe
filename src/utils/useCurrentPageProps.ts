import { useRouter } from 'next/router';
import { navMenuItems } from '@/components/layout/navigation/navMenuItems';

export type PageProps = {
  name: string;
  slug: string;
  pathName: string;
  parentSlug?: string;
  isParent: boolean;
  isChild: boolean;
};

export default function useCurrentPageProps() {
  const pathName = useRouter().pathname;

  const parentPagePathNames = navMenuItems.map((page) => {
    return {
      name: page.name,
      slug: page.slug,
      pathName: `/${page.slug}`,
      isParent: Boolean(page.subItems),
      isChild: false,
    };
  });

  const subPagePathNames = navMenuItems.map((page) => {
    if (page.subItems)
      return page.subItems.map((subItem) => ({
        name: subItem.name,
        slug: subItem.slug,
        pathName: `/${page.slug}/${subItem.slug}`,
        parentSlug: page.slug,
        isParent: false,
        isChild: true,
      }));
    return;
  });

  const pagePathNames = [...parentPagePathNames, ...subPagePathNames]
    .flat()
    .filter(Boolean);

  const currentPageProps = pagePathNames.find(
    (page) => page?.pathName === pathName
  ) || {
    name: 'Sayfa İsmi',
    slug: 'Sayfa Slug',
    pathName: 'Sayfa Url',
    isParent: false,
    isChild: false,
  };

  return currentPageProps;
}
