import arc from '@architect/functions'
export const handler = arc.http.async(index)

async function index() {
  return {
    html: `
    <html>
      <head>
      </head>
      <body>
      <p>${JSON.stringify(process.env)}</p>
      </body>
    </html>
    `
  }
}