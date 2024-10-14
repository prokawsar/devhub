import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL || '',
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '',
)

export const checkExistingLinks = async (userId: string) => {
  return await supabase.from('links').select('*').eq('user', userId)
}

export const updateProfileData = async (userId: string, payload: any) => {
  return await supabase.from('links').update(payload).eq('user', userId)
}

export const insertProfileData = async (userId: string, payload: any) => {
  return await supabase.from('links').insert({
    ...payload,
    user: userId,
  })
}
