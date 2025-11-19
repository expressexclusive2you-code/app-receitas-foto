import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createClientComponentClient()
}

// Cliente singleton para uso direto
export const supabase = createClient()
