export interface INavItem {
  name: string;
  slug: string;
  subItems?: INavItem[];
}

export const navMenuItems: INavItem[] = [
  {
    name: 'Ana Sayfa',
    slug: '',
  },
  {
    name: 'İcmaller',
    slug: 'icmaller',
  },
  {
    name: 'Stok Yönetimi',
    slug: 'stok-yonetimi',
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
    subItems: [
      {
        name: 'X Raporlari',
        slug: 'x',
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
  },
];
