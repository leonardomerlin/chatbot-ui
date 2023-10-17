import { withAuth } from "next-auth/middleware"

const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS?.split(",").map(email => email.trim()) || []).filter(email => email.length > 0)

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const userEmail = token?.email
      if (ALLOWED_EMAILS.length > 0 && userEmail) {
        if (ALLOWED_EMAILS.includes(userEmail)) {
          return true;
        }

        console.warn(`Unauthorized access attempt by ${userEmail}`)
      }

      return false
    },
  },
})

// You can enable config to only allow access to certain pages:
// export const config = { matcher: ["/admin", "/me"] }