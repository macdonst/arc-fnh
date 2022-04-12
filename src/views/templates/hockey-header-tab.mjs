export default function HockeyHeaderTabTemplate({ html, state = {} }) {
  const { label = '', href = '', icon = '' } = state.attrs

  return html`
    <a
      class="
  flex
  uppercase
  items-center
  font-medium
  leading5
  text-p8
  radius-pill
  text-h0
  mb-2
  mb-none-lg
  mr-0-lg
  pr1
  pl0
  bg-a3
  no-underline
  color-dark
  color-hover-darkest
  "
      alt="${label}"
      href="${href}">
      <div class="mr-2">
        <hockey-icon
          style="width: 1rem; height: 1rem;"
          class="color-fill-dark"
          icon="${icon}"></hockey-icon>
      </div>
      <span>${label}</span>
    </a>

    <script type="module">
      class HockeyHeaderTab extends HTMLElement {
        constructor() {
            super()
        }
        connectedCallback() {}
        customElements.define('hockey-header-tab', HockeyHeader)
    </script>
  `
}
