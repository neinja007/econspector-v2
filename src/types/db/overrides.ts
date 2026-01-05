import { DbDataTables } from './alias';
import { Indicator } from './types/indicators';
import { RankedItem } from './types/ranked-item';

/**
 * Type overrides for database views, tables, and functions.
 *
 * This allows you to specify custom types for specific columns in database views/tables
 * and return types for functions that differ from the auto-generated types from Supabase.
 *
 * These overrides are automatically applied to:
 * - The Supabase client (when using supabase.from('table_name') or supabase.rpc('function_name'))
 * - The DbDataViews, DbDataTables, and DbDataFunctions type aliases
 *
 * Example usage:
 * When you use `supabase.from('countries_with_currencies').select('*')`, the `currencies` column
 * will have the type `Currency[] | null` instead of `Json | null`.
 *
 * When you use `supabase.rpc('get_ranked_countries', ...)`, the return type will be
 * `RankedItem[]` instead of `Json`.
 *
 * Similarly, when you use `DbDataViews["countries_with_currencies"]` or
 * `DbDataFunctions["get_ranked_countries"]`, they will have the overridden types.
 *
 * To add more overrides:
 * 1. Add the view/table/function name to the appropriate schema section (data or users)
 * 2. For views/tables: Add the column name and its override type
 * 3. For functions: Add the function name and its return type
 * 4. The override will automatically be applied everywhere
 *
 * Example:
 * ```typescript
 * data: {
 *   Views: {
 *     my_view: {
 *       my_column: MyCustomType | null;
 *     }
 *   },
 *   Functions: {
 *     my_function: MyReturnType;
 *   }
 * }
 * ```
 */
export interface DbTypeOverrides {
	data: {
		Views: {
			countries_with_currencies: {
				currencies: DbDataTables<'currencies'>[] | null;
			};
		};
		Tables: {};
		Functions: {
			get_ranked_countries: RankedItem[] | null;
			get_indicators: Indicator[] | null;
		};
	};
	users: {
		Views: {};
		Tables: {};
		Functions: {};
	};
}

// Runtime object for type extraction (values are not used)
export const dbTypeOverrides: DbTypeOverrides = {
	data: {
		Views: {
			countries_with_currencies: {
				currencies: null as DbDataTables<'currencies'>[] | null
			}
		},
		Tables: {},
		Functions: {
			get_ranked_countries: null as RankedItem[] | null,
			get_indicators: null as Indicator[] | null
		}
	},
	users: {
		Views: {},
		Tables: {},
		Functions: {}
	}
};
