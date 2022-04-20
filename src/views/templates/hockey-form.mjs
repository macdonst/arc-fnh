export default function HockeyFormTemplate({ html, state = {} }) {
  const { action = '', name = '' } = state.attrs
  return html`
    <div
      class="flex flex-row p2 radius3 bg-lighter shadow-1 max-width-2 m-auto">
      <form
        class="flex flex-col gap-1 w-full"
        action="${action}"
        method="POST"
        ${name !== '' ? `name="${name}" id="${name}"` : ''}>
        <slot></slot>
        <hockey-save-button></hockey-save-button>
      </form>
    </div>

    <script type="module">
      class HockeyForm extends HTMLElement {
        constructor() {
          super()
        }
        connectedCallback() {}
      }
      customElements.define('hockey-form', HockeyForm)
    </script>
  `
}
