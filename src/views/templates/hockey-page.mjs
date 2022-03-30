export default function HockeyPageTemplate({ html }) {
  return html`
    <hockey-header></hockey-header>
    <div class="p0 flex flex-col gap-2">
      <slot></slot>
    </div>

    <script type="module">
      class HockeyPage extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-page', HockeyPage)
    </script>
  `
}
