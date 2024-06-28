import arc from '@architect/functions'
import render from '@architect/views/render.mjs'

export const handler = arc.http.async(login)

async function login(req) {
  return {
    html: render(
      `
<site-layout>
  <main class="flex flex-col align-items-center justify-content-center">
    <form method="post" action="/login" class="font-body">
      <label>
        <span class='font-bold'>Please enter your password:</span>
        <input type="password" name="password" placeholder="Your password"></input>
      </label>
      <button>Login</button>
    </form>
  </main>
</site-layout>`,
      {}
    )
  }
}
