export default function HockeyCircularIconTemplate({ html, state = {} }) {
  const { icon = 'hockey' } = state.attrs
  return html`
    <div>
      <div
        class="mr0 whitespace-nowrap justify-center items-center inline-flex radius2 bg-dark icon">
        <hockey-icon
          style="width: 2.5rem;"
          class="color-fill-dark"
          icon="${icon}"></hockey-icon>
      </div>
    </div>

    <script type="module">
      class HockeyCircularIcon extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-circular-icon', HockeyCircularIcon)
    </script>
  `
}
