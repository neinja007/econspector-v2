import { DatabaseTable } from '@/data/supabase';
import { supabase } from '@/supabase/client';
import { NextResponse } from 'next/server';

export const POST = async () => {
	const worldBankCountries = await supabase.from(DatabaseTable.COUNTRIES).select('*').eq('world_bank_data', true);

	return NextResponse.json(worldBankCountries);
};
