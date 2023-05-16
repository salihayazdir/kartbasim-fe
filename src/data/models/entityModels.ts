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
