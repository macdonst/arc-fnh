export default function HockeyActionButtonTemplate({ html, state = {} }) {
  const { action, label } = state.attrs
  return html`
    <form method="post" action="${action}" class="mr-1">
      <button class="ss-icon ss-${label}"></button>
    </form>

    <script type="module">
      class HockeyActionButton extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-action-button', HockeyActionButton)
    </script>
  `
}
