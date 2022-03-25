export default function HockeyLoginButtonTemplate({ html }) {
  return html`
    <a
      href="/login"
      class="
              pt-4
              pr-1
              pb-4
              pl-1
              mt-3
              mt-none-lg
              mr0
              mb-2
              mb-none-lg
              ml-3
              ml-none-lg
              font-medium
              text-center
              text-p5
              text-h0
              uppercase
              radius-pill
              no-underline
              bg-p10
              hidden-lg
            ">
      Login
    </a>

    <script type="module">
      class HockeyLoginButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-login-button', HockeyLoginButton)
    </script>
  `
}
