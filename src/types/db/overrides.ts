import { Currency } from '../currency';

/**
 * Type overrides for database views and tables.
 *
 * This allows you to specify custom types for specific columns in database views/tables
 * that differ from the auto-generated types from Supabase.
 *
 * These overrides are automatically applied to:
 * - The Supabase client (when using supabase.from('table_name'))
 * - The DbDataViews and DbDataTables type aliases
 *
 * Example usage:
 * When you use `supabase.from('countries_with_currencies').select('*')`, the `currencies` column
 * will have the type `Currency[] | null` instead of `Json | null`.
 *
 * Similarly, when you use `DbDataViews["countries_with_currencies"]`, the `currencies` column
 * will have the overridden type.
 *
 * To add more overrides:
 * 1. Add the view/table name to the appropriate schema section (data or users)
 * 2. Add the column name and its override type
 * 3. The override will automatically be applied everywhere
 *
 * Example:
 * ```typescript
 * data: {
 *   Views: {
 *     my_view: {
 *       my_column: MyCustomType | null;
 *     }
 *   }
 * }
 * ```
 */
export interface DbTypeOverrides {
	data: {
		Views: {
			countries_with_currencies: {
				currencies: Currency[] | null;
			};
		};
		Tables: Record<string, Record<string, any>>;
	};
	users: {
		Views: Record<string, Record<string, any>>;
		Tables: Record<string, Record<string, any>>;
	};
}

// Runtime object for type extraction (values are not used)
export const dbTypeOverrides: DbTypeOverrides = {
	data: {
		Views: {
			countries_with_currencies: {
				currencies: null as Currency[] | null
			}
		},
		Tables: {}
	},
	users: {
		Views: {},
		Tables: {}
	}
};
