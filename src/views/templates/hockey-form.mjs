export default function HockeyFormTemplate({ html, state = {} }) {
  const { action = '' } = state.attrs
  return html`
    <div class="p-6">
      <form class="flex flex-col gap-1" action="${action}" method="post">
        <slot></slot>
        <div class="text-right">
          <button class="bg-blue color-white pt-1 pb-1 pr0 pl0 radius0">
            Save
          </button>
        </div>
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
