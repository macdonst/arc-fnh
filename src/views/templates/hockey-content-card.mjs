export default function HockeyContentCardTemplate({ html }) {
  return html`
    <div class="flex flex-row p2 radius1 border2 border-dark bg-lighter">
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
