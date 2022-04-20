export default function HockeyLogoutButtonTemplate({ html }) {
  return html`
    <form method="POST" action="/logout">
      <button
        type="submit"
        class="pt-1 pb-1 pl-1 pr-1 inline-flex justify-center bg-lighter radius2 shadow-1-hover">
        Logout
      </button>
    </form>

    <script type="module">
      class HockeyLogoutButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-logout-button', HockeyLogoutButton)
    </script>
  `
}
