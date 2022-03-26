export default function HockeyActionButtonsTemplate({ html }) {
  return html`
    <div class="flex">
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
