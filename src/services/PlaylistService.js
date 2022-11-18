import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = 'https://qvwzujnkkqehrmczmepy.supabase.co'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const supabase = createClient(PROJECT_URL, API_KEY)

export function PlaylistService () {
  return {
    async getAll () {
      try {
        const response = await supabase.from('playlist').select()
        if (response.status == 200) {
          return response.data
        }
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}