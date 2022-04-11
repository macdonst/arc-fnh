export default function HockeyFormTemplate({ html, state = {} }) {
  const { action = '', name = '' } = state.attrs
  return html`
    <div class="p-6">
      <form
        class="flex flex-col gap-1"
        action="${action}"
        method="post"
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
