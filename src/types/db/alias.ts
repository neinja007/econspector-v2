import { Database } from './db';
import type { DbTypeOverrides } from './overrides';

/**
 * Utility type to apply column type overrides to a base type.
 * Merges the base type with any overrides defined in DbTypeOverrides.
 */
type ApplyOverrides<
	Schema extends 'data' | 'users',
	Type extends 'Views' | 'Tables',
	T extends keyof Database[Schema][Type]
> = Database[Schema][Type][T] extends { Row: infer R }
	? R &
			(T extends keyof DbTypeOverrides[Schema][Type]
				? DbTypeOverrides[Schema][Type][T] extends Record<string, any>
					? DbTypeOverrides[Schema][Type][T]
					: {}
				: {})
	: never;

/**
 * Utility type to apply overrides to a table/view definition.
 * Preserves Insert, Update, and Relationships while overriding Row.
 */
type ApplyTableOverrides<
	Schema extends 'data' | 'users',
	Type extends 'Views' | 'Tables',
	T extends keyof Database[Schema][Type]
> = Database[Schema][Type][T] extends infer Original
	? Original extends { Row: any }
		? Omit<Original, 'Row'> & {
				Row: ApplyOverrides<Schema, Type, T>;
		  }
		: Original
	: never;

/**
 * Database type with overrides applied.
 * Use this type when creating Supabase clients to get automatic type overrides.
 */
export type DatabaseWithOverrides = Omit<Database, 'data' | 'users'> & {
	data: Omit<Database['data'], 'Tables' | 'Views'> & {
		Tables: {
			[K in keyof Database['data']['Tables']]: ApplyTableOverrides<'data', 'Tables', K>;
		};
		Views: {
			[K in keyof Database['data']['Views']]: ApplyTableOverrides<'data', 'Views', K>;
		};
	};
	users: Omit<Database['users'], 'Tables' | 'Views'> & {
		Tables: {
			[K in keyof Database['users']['Tables']]: ApplyTableOverrides<'users', 'Tables', K>;
		};
		Views: {
			[K in keyof Database['users']['Views']]: ApplyTableOverrides<'users', 'Views', K>;
		};
	};
};

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
