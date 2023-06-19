import {
  ChartBarIcon,
  CreditCardIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
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
        name: 'Matbuat Stokları',
        slug: 'matbuat-stoklari',
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
        name: 'Üretim Raporları',
        slug: 'uretim-raporlari',
      },
      {
        name: 'Vardiya Raporlari',
        slug: 'vardiya-raporlari',
      },
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
        name: 'Matbuat',
        slug: 'matbuat',
      },
      {
        name: 'Matbuat Türleri',
        slug: 'matbuat-turleri',
      },
      {
        name: 'Kart Basım Makineleri',
        slug: 'makineler',
      },
    ],
  },
  {
    name: 'Kullanıcılar',
    slug: 'kullanicilar',
    icon: (size: number) => {
      return <UserGroupIcon className={`h-${size} w-${size}`} />;
    },
  },
];
