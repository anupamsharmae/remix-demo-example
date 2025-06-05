import { destoryUserSession } from "~/data/auth.server"

export function action({ request }) {
   if (request.method !== 'POST') {
      throw new Response(JSON.stringify({ message: 'Invalid request method' }), {
         status: 400, statusText: 'No session found',
         headers: {
            'Content-Type': 'application/json'
         }
      })
   }

   return destoryUserSession(request);
}