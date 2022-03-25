export default function HockeyLogoutButtonTemplate({ html }) {
  return html`
    <form method="post" action="/logout">
      <button type="submit">Logout</button>
    </form>

    <script type="module">
      class HockeyLogoutButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-login-button', HockeyLogoutButton)
    </script>
  `
}
