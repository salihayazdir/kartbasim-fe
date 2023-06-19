export type Bank = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  edited_at?: string;
  created_by?: string;
  edited_by?: string;
};

export type Printer = {
  id: number;
  name: string;
  model: string;
  serial_no: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  edited_at?: string;
  created_by?: string;
  edited_by?: string;
};

export type ProductType = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  created_by?: string;
  edited_at?: string;
  edited_by?: string;
};

export type ProductGroup = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  bank_id: number;
  bank_name?: string;
  client_id?: string; // Zorunlu olmayan alan
  description: string;
  created_at?: string;
  created_by?: string;
  edited_at?: string;
  edited_by?: string;
};

export type Product = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  product_type_id: number;
  product_type_name?: string;
  product_group_id: number;
  product_group_name?: string;
  client_id?: string; // Zorunlu olmayan alan
  description: string;
  main_safe_quantity?: number; // 	Edit'te zorunlu değil, Zorunlu değil - Add'de 0
  daily_safe_quantity?: number; // Edit'te zorunlu değil, Zorunlu değil - Add'de 0
  created_at?: string;
  created_by?: string;
  edited_at?: string;
  edited_by?: string;
};

export type Consumable = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  consumable_type_id: number;
  consumable_type_name?: string;
  stock_quantity: number;
  description?: string;
  created_at?: string;
  created_by?: string;
  edited_at?: string;
  edited_by?: string;
};

export type ConsumableType = {
  id: number;
  name: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at?: string;
  created_by?: string;
  edited_at?: string;
  edited_by?: string;
};

export type User = {
  username: string;
  mail: string;
  user_role_id: number;
  name: string;
  sicil: string;
  dn: string;
  title: string;
  team: string;
  service: string;
  department: string;
  created_at: string;
  edited_at: string;
  is_active: boolean;
  manager_name: string;
  manager_username: string;
};

export type ProductInventoryRecords = {
  id: number;
  product_id: number;
  product_name: string;
  product_group_name: string;
  product_type_name: string;
  bank_name: string;
  product_inventory_record_type_id: number;
  product_inventory_record_type_name: string;
  batch_id?: number;
  quantity: number;
  is_main_safe: boolean;
  created_at: string;
  created_by_name?: string;
};
