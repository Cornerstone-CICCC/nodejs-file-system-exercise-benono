import http from "http"
import fs from "fs"
import path from "path"
import url from "url"

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    // Allow all clients to access server
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    // Pre-flight check
    if (req.method === "OPTIONS") {
      res.writeHead(200)
      res.end()
      return
    }

    // Parse url
    const parsedUrl = url.parse(req.url || "", true)
    const fileName = parsedUrl.query.filename as string | undefined
    const parsedPath = parsedUrl.pathname

    // Home route
    if (parsedPath === "/") {
      res.writeHead(200, { "content-type": "text/plain" })
      res.end("Welcome to my server!")
      return
    }

    // View image
    if (parsedPath === "/view-image") {
      const imagePath = path.join(__dirname, "images/veryhappydog.jpg")
      try {
        ;(async () => {
          const data = await fs.promises.readFile(imagePath)
          res.writeHead(200, { "content-type": "image/jpeg" })
          res.end(data)
        })()
      } catch (err) {
        console.error(err)
      }
      return
    }

    // 404 Fallback if route isn't available
    res.writeHead(404, { "content-type": "text/html" })
    res.end("<h1>Page not found! :(</h1>")
  }
)

const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
