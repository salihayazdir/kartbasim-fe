import {
  ChartBarIcon,
  CreditCardIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  Square3Stack3DIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
export interface INavItem {
  name: string;
  slug: string;
  icon?: (size: number) => React.ReactNode;
  subItems?: INavItem[];
}

export const navMenuItems: INavItem[] = [
  {
    name: 'Ana Sayfa',
    slug: '',
    icon: (size: number) => {
      return <ChartBarIcon className={`h-${size} w-${size}`} />;
    },
  },
  {
    name: 'İcmaller',
    slug: 'icmaller',
    icon: (size: number) => {
      return <ListBulletIcon className={`h-${size} w-${size}`} />;
    },
  },
  {
    name: 'Stok Yönetimi',
    slug: 'stok-yonetimi',
    icon: (size: number) => {
      return <Square3Stack3DIcon className={`h-${size} w-${size}`} />;
    },
    subItems: [
      {
        name: 'Kasalar',
        slug: 'kasalar',
      },
      {
        name: 'Sarf Stokları',
        slug: 'sarf-stoklari',
      },
    ],
  },
  {
    name: 'Raporlar',
    slug: 'raporlar',
    icon: (size: number) => {
      return <PresentationChartLineIcon className={`h-${size} w-${size}`} />;
    },
    subItems: [
      {
        name: 'Stok Hareketleri',
        slug: 'stok-hareketleri',
      },
    ],
  },
  {
    name: 'Tanımlar',
    slug: 'tanimlar',
    icon: (size: number) => {
      return <CreditCardIcon className={`h-${size} w-${size}`} />;
    },
    subItems: [
      {
        name: 'Bankalar',
        slug: 'bankalar',
      },
      {
        name: 'Ürünler',
        slug: 'urunler',
      },
      {
        name: 'Ürün Grupları',
        slug: 'urun-gruplari',
      },
      {
        name: 'Ürün Tipleri',
        slug: 'urun-tipleri',
      },
      {
        name: 'Sarflar',
        slug: 'sarflar',
      },
      {
        name: 'Sarf Türleri',
        slug: 'sarf-turleri',
      },
      {
        name: 'Kart Basım Makineleri',
        slug: 'makineler',
      },
      {
        name: 'Vardiyalar',
        slug: 'vardiyalar',
      },
    ],
  },
  {
    name: 'Kullanıcılar',
    slug: 'kullanicilar',
    icon: (size: number) => {
      return <UserIcon className={`h-${size} w-${size}`} />;
    },
  },
];
