import { createClient } from '@supabase/supabase-js'

// Service role key: sadece sunucu tarafında kullanılır (API route'lar)
// Tarayıcıya asla gönderilmez
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
