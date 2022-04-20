export default function HockeyContentCardTemplate({ html }) {
  return html`
    <div class="flex flex-row p2 radius3 bg-lighter shadow0 max-width-1 m-auto">
      <hockey-circular-icon icon="hockey"></hockey-circular-icon>
      <div>
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>

    <script type="module">
      class HockeyContentCard extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-content-card', HockeyContentCard)
    </script>
  `
}
