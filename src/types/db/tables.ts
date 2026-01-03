import { Database } from './db';

export type DbDataTables<T extends keyof Database['data']['Tables']> = Database['data']['Tables'][T]['Row'];
export type DbUsersTables<T extends keyof Database['users']['Tables']> = Database['users']['Tables'][T]['Row'];

export type DbDataEnums<T extends keyof Database['data']['Enums']> = Database['data']['Enums'][T];
export type DbUsersEnums<T extends keyof Database['users']['Enums']> = Database['users']['Enums'][T];

export type DbDataViews<T extends keyof Database['data']['Views']> = Database['data']['Views'][T]['Row'];

export type DbDataFunctions<T extends keyof Database['data']['Functions']> =
	Database['data']['Functions'][T]['Returns'];
