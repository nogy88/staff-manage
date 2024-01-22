export interface Table {
  [key: string]: string;
}

export type TableRow = Table[];

export interface TableData {
  [key: string]: TableRow;
}

export interface Column {
  name: string;
  uid: string;
}

export interface TableProps {
  users: User[];
  columns: Column[];
}

export interface TableKeys {
  userId: string[];
}

export interface ExternalTable {
  data: TableData;
  keys: TableKeys;
  id: string;
}

export enum ApplicationStatus {
  Idle,
  Loading,
  Error,
}

export interface FileWithSize {
  file: string;
  size: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
}

export type UserRow = { id: string; email: string; name: string; role: string };
