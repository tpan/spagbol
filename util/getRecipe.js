import { createClient } from "@supabase/supabase-js"

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env

const supaBase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

export async function getRecipe() {
    const rows = await supaBase.from('recipes').select('*')
    const length = rows.data.length;
    const maxIndex = length -1;
    const randomIndex = Math.round(Math.random() * maxIndex);
    const row = rows.data[randomIndex];

    return row
}