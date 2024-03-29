export default function HockeyPageTemplate({ html }) {
  return html`
    <hockey-header></hockey-header>
    <div class="pt2 pb2 pr0 pl0 flex flex-col gap-2 max-width0 m-auto">
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
