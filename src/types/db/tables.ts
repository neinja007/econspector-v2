import { Database } from './db';

export type DbDataTables<T extends keyof Database['data']['Tables']> = Database['data']['Tables'][T]['Row'];
export type DbUsersTables<T extends keyof Database['users']['Tables']> = Database['users']['Tables'][T]['Row'];

export type DbDataEnums<T extends keyof Database['data']['Enums']> = Database['data']['Enums'][T];
