export default function HockeyActionButtonsTemplate({ html, state = {} }) {
  const { direction = 'row' } = state.attrs
  return html`
    <div class="flex flex-${direction}">
      <slot></slot>
    </div>

    <script type="module">
      class HockeyActionButtons extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-action-buttons', HockeyActionButtons)
    </script>
  `
}
