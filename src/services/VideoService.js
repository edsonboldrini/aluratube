import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = 'https://qvwzujnkkqehrmczmepy.supabase.co'
const API_KEY = process.env.API_KEY
const supabase = createClient(PROJECT_URL, API_KEY)

export function VideoService () {
  return {
    async getAll () {
      try {
        const response = await supabase.from('video').select()

        if (response.status == 200) {
          return response.data
        }
      } catch (e) {
        console.log(e)
        return null
      }
    },
    async insertOne (object) {
      try {
        const response = await supabase.from('video').insert(object)

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