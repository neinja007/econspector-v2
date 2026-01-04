import { Database } from './db';
import { ApplyOverrides } from './override-types';

export type DbDataTables<T extends keyof Database['data']['Tables']> = ApplyOverrides<'data', 'Tables', T>;
export type DbUsersTables<T extends keyof Database['users']['Tables']> = ApplyOverrides<'users', 'Tables', T>;

export type DbDataEnums<T extends keyof Database['data']['Enums']> = Database['data']['Enums'][T];
export type DbUsersEnums<T extends keyof Database['users']['Enums']> = Database['users']['Enums'][T];

export type DbDataViews<T extends keyof Database['data']['Views']> = ApplyOverrides<'data', 'Views', T>;
export type DbUsersViews<T extends keyof Database['users']['Views']> = ApplyOverrides<'users', 'Views', T>;

export type DbDataFunctions<T extends keyof Database['data']['Functions']> =
	Database['data']['Functions'][T]['Returns'];
export type DbUsersFunctions<T extends keyof Database['users']['Functions']> =
	Database['users']['Functions'][T]['Returns'];
