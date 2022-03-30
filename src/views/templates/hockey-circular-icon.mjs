export default function HockeyCircularIconTemplate({ html, state = {} }) {
  const { icon = 'hockey' } = state.attrs
  return html`
    <div>
      <div
        class="mr0 whitespace-nowrap justify-center items-center inline-flex radius2 bg-lightblue icon color-white">
        <svg style="width: 2.5rem;">
          <use xlink:href="#${icon}"></use>
        </svg>
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
