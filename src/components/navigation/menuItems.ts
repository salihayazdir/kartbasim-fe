export interface MenuItem {
  name: string;
  slug: string;
  subItems?: MenuItem[];
}

export const navMenuItems: MenuItem[] = [
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
        name: 'Sarflar',
        slug: 'sarflar',
      },
      {
        name: 'Sarf Türleri',
        slug: 'sarf-turleri',
      },
      {
        name: 'Kart Basım Makineleri',
        slug: 'kart-basim-makineleri',
      },
      {
        name: 'Vardiyalar',
        slug: 'vardiyalar',
      },
    ],
  },
  {
    name: 'Kullanıcılar',
    slug: 'tanimlar',
  },
];
