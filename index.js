// ✅ Cloudflare Workers + MongoDB (fixed version)
import { Hono } from 'hono'
import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import allRoutes from './routes/index.js'

// ✅ Initialize app (Hono = Express alternative)
const app = new Hono()

// ✅ Manual CORS (to replace express + cors)
app.use('*', async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*")
  c.res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  c.res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (c.req.method === "OPTIONS") return c.text("OK", 200)
  await next()
})

// ✅ Simple root route
app.get('/', (c) => c.text('✅ Server running on Cloudflare Workers!'))

app.use("/api", allRoutes)


// ✅ Export the app (Cloudflare entry point)
export default app
